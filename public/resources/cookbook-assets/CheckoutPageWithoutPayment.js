import React, { useState } from "react";

// Import contexts and util modules
import { FormattedMessage } from "../../util/reactIntl";
import { pathByRouteName } from "../../util/routes";
import { pickTransactionFieldsData } from "../../util/fieldHelpers.js";
import {
  LINE_ITEM_HOUR,
  DATE_TYPE_DATE,
  DATE_TYPE_DATETIME,
} from "../../util/types";
import { ensureTransaction } from "../../util/data";
import { createSlug } from "../../util/urlHelpers";
import { isTransactionInitiateListingNotFoundError } from "../../util/errors";
import {
  getProcess,
  isBookingProcessAlias,
} from "../../transactions/transaction";

// Import shared components
import {
  H3,
  H4,
  NamedLink,
  OrderBreakdown,
  Page,
  TopbarSimplified,
} from "../../components";

import {
  bookingDatesMaybe,
  getFormattedTotalPrice,
  getShippingDetailsMaybe,
  getTransactionTypeData,
  processCheckoutWithoutPayment,
} from "./CheckoutPageTransactionHelpers.js";
import { getErrorMessages } from "./ErrorMessages";

import SimpleOrderForm from "./StripePaymentForm/SimpleOrderForm";
import DetailsSideCard from "./DetailsSideCard";
import MobileListingImage from "./MobileListingImage";
import MobileOrderBreakdown from "./MobileOrderBreakdown";

import css from "./CheckoutPage.module.css";

const capitalizeString = (s) => `${s.charAt(0).toUpperCase()}${s.substr(1)}`;

/**
 * Prefix the properties of the chosen price variant as first level properties for the protected data of the transaction
 *
 * @example
 * const priceVariant = {
 *   name: 'something',
 * }
 *
 * will be returned as:
 * const priceVariant = {
 *   priceVariantName: 'something',
 * }
 *
 * @param {Object} priceVariant - The price variant object
 * @returns {Object} The price variant object with the properties prefixed with priceVariant*
 */
const prefixPriceVariantProperties = (priceVariant) => {
  if (!priceVariant) {
    return {};
  }

  const entries = Object.entries(priceVariant).map(([key, value]) => {
    return [`priceVariant${capitalizeString(key)}`, value];
  });
  return Object.fromEntries(entries);
};

/**
 * Construct orderParams object using pageData from session storage, shipping details, transaction fields and the customer's message.
 * Note: This is used for both speculate transition and real transition
 *       - Speculate transition is called, when the the component is mounted. It's used to test if the data can go through the API validation
 *       - Real transition is made, when the user submits the OrderForm.
 *
 * @param {Object} pageData data that's saved to session storage.
 * @param {Object} shippingDetails shipping address if applicable.
 * @param {Object} config app-wide configs. This contains hosted configs too.
 * @param {Object} [transactionFieldProtectedData] protectedData from transaction field configs
 * @param {string} [customerDefaultMessage] optional message saved to protectedData
 * @returns orderParams.
 */
const getOrderParams = (
  pageData,
  shippingDetails,
  config,
  transactionFieldProtectedData = {},
  customerDefaultMessage,
) => {
  const quantity = pageData.orderData?.quantity;
  const quantityMaybe = quantity ? { quantity } : {};
  const seats = pageData.orderData?.seats;
  const seatsMaybe = seats ? { seats } : {};
  const deliveryMethod = pageData.orderData?.deliveryMethod;
  const deliveryMethodMaybe = deliveryMethod ? { deliveryMethod } : {};
  const { listingType, unitType, priceVariants } =
    pageData?.listing?.attributes?.publicData || {};

  // price variant data for fixed duration bookings
  const priceVariantName = pageData.orderData?.priceVariantName;
  const priceVariantNameMaybe = priceVariantName ? { priceVariantName } : {};
  const priceVariant = priceVariants?.find(
    (pv) => pv.name === priceVariantName,
  );
  const priceVariantMaybe = priceVariant
    ? prefixPriceVariantProperties(priceVariant)
    : {};

  // The transaction page shows the customer's message from protected data
  const customerDefaultMessageMaybe = customerDefaultMessage
    ? { customerDefaultMessage }
    : {};

  const protectedDataMaybe = {
    protectedData: {
      ...getTransactionTypeData(listingType, unitType, config),
      ...deliveryMethodMaybe,
      ...shippingDetails,
      ...priceVariantMaybe,
      ...transactionFieldProtectedData,
      ...customerDefaultMessageMaybe,
    },
  };

  // Note: Avoid misinterpreting the following logic as allowing arbitrary mixing of `quantity` and `seats`.
  // You can only pass either quantity OR seats and units to the orderParams object
  // Quantity represents the total booked units for the line item (e.g. days, hours).
  // When quantity is not passed, we pass seats and units.
  // If `bookingDatesMaybe` is provided, it determines `units`, and `seats` defaults to 1
  // (implying quantity = units)

  // These are the order parameters for the first request transition
  // which is either request-payment or request-payment-after-inquiry
  const orderParams = {
    listingId: pageData?.listing?.id,
    ...deliveryMethodMaybe,
    ...quantityMaybe,
    ...seatsMaybe,
    ...bookingDatesMaybe(pageData.orderData?.bookingDates),
    ...priceVariantNameMaybe,
    ...protectedDataMaybe,
  };
  return orderParams;
};

const fetchSpeculatedTransactionIfNeeded = (
  orderParams,
  pageData,
  fetchSpeculatedTransaction,
) => {
  const tx = pageData ? pageData.transaction : null;
  const pageDataListing = pageData.listing;
  const processName =
    tx?.attributes?.processName ||
    pageDataListing?.attributes?.publicData?.transactionProcessAlias?.split(
      "/",
    )[0];
  const process = processName ? getProcess(processName) : null;

  // If transaction has passed payment-pending state, speculated tx is not needed.
  const shouldFetchSpeculatedTransaction =
    !!pageData?.listing?.id && !!pageData.orderData && !!process;

  if (shouldFetchSpeculatedTransaction) {
    const processAlias =
      pageData.listing.attributes.publicData?.transactionProcessAlias;
    const transactionId = tx ? tx.id : null;
    const isInquiryInPaymentProcess =
      tx?.attributes?.lastTransition === process.transitions.INQUIRE;

    const requestTransition = isInquiryInPaymentProcess
      ? process.transitions.REQUEST_PAYMENT_AFTER_INQUIRY
      : process.transitions.REQUEST_PAYMENT;
    const isPrivileged = process.isPrivileged(requestTransition);

    fetchSpeculatedTransaction(
      orderParams,
      processAlias,
      transactionId,
      requestTransition,
      isPrivileged,
    );
  }
};

/**
 * Load initial data for the page
 *
 * Since the data for the checkout is not passed in the URL (there
 * might be lots of options in the future), we must pass in the data
 * some other way. Currently the ListingPage sets the initial data
 * for the CheckoutPage's Redux store.
 *
 * For some cases (e.g. a refresh in the CheckoutPage), the Redux
 * store is empty. To handle that case, we store the received data
 * to window.sessionStorage and read it from there if no props from
 * the store exist.
 *
 * This function also sets of fetching the speculative transaction
 * based on this initial data.
 */
export const loadInitialData = ({
  pageData,
  fetchSpeculatedTransaction,
  config,
}) => {
  // Fetch speculated transaction for showing price in order breakdown
  // NOTE: if unit type is line-item/item, quantity needs to be added.
  // The way to pass it to checkout page is through pageData.orderData
  const shippingDetails = {};
  const orderParams = getOrderParams(pageData, shippingDetails, config);

  fetchSpeculatedTransactionIfNeeded(
    orderParams,
    pageData,
    fetchSpeculatedTransaction,
  );
};

const handleSubmit = (values, process, props, submitting, setSubmitting) => {
  if (submitting) {
    return;
  }
  setSubmitting(true);

  const {
    history,
    config,
    routeConfiguration,
    onInitiateOrder,
    onSubmitCallback,
    pageData,
    setPageData,
    sessionStorageKey,
    transactionFieldConfigs = [],
  } = props;
  const { message, formValues } = values;

  const transactionFieldsProtectedData = {
    ...pickTransactionFieldsData(
      formValues,
      "protected",
      true,
      transactionFieldConfigs,
    ),
  };

  const requestParams = {
    pageData,
    process,
    onInitiateOrder,
    sessionStorageKey,
    setPageData,
  };

  const shippingDetails = getShippingDetailsMaybe(formValues);

  // These are the order parameters for the first request transition
  // which is either request-payment or request-payment-after-inquiry
  const orderParams = getOrderParams(
    pageData,
    shippingDetails,
    config,
    transactionFieldsProtectedData,
    message,
  );

  processCheckoutWithoutPayment(orderParams, requestParams)
    .then((response) => {
      const { orderId } = response;
      setSubmitting(false);

      const orderDetailsPath = pathByRouteName(
        "OrderDetailsPage",
        routeConfiguration,
        {
          id: orderId.uuid,
        },
      );

      onSubmitCallback();
      history.push(orderDetailsPath);
    })
    .catch((err) => {
      console.error(err);
      setSubmitting(false);
    });
};

export const CheckoutPageWithoutPayment = (props) => {
  const [submitting, setSubmitting] = useState(false);
  // Initialized stripe library is saved to state - if it's needed at some point here too.

  const {
    scrollingDisabled,
    speculateTransactionError,
    speculatedTransaction: speculatedTransactionMaybe,
    initiateOrderError,
    intl,
    currentUser,
    pageData,
    processName,
    listingTitle,
    title,
    config,
    showListingImage,
    transactionFieldConfigs = [],
    showTransactionFields,
  } = props;

  // Since the listing data is already given from the ListingPage
  // and stored to handle refreshes, it might not have the possible
  // deleted or closed information in it. If the transaction
  // initiate or the speculative initiate fail due to the listing
  // being deleted or closed, we should dig the information from the
  // errors and not the listing data.
  const listingNotFound =
    isTransactionInitiateListingNotFoundError(speculateTransactionError) ||
    isTransactionInitiateListingNotFoundError(initiateOrderError);

  const { listing, transaction, orderData } = pageData;
  const existingTransaction = ensureTransaction(transaction);
  const speculatedTransaction = ensureTransaction(
    speculatedTransactionMaybe,
    {},
    null,
  );

  // If existing transaction has line-items, it has gone through one of the request-payment transitions.
  // Otherwise, we try to rely on speculatedTransaction for order breakdown data.
  const tx =
    existingTransaction?.attributes?.lineItems?.length > 0
      ? existingTransaction
      : speculatedTransaction;
  const timeZone = listing?.attributes?.availabilityPlan?.timezone;
  const transactionProcessAlias =
    listing?.attributes?.publicData?.transactionProcessAlias;
  const unitType = listing?.attributes?.publicData?.unitType;
  const lineItemUnitType = `line-item/${unitType}`;
  const dateType =
    lineItemUnitType === LINE_ITEM_HOUR ? DATE_TYPE_DATETIME : DATE_TYPE_DATE;
  const txBookingMaybe = tx?.booking?.id
    ? { booking: tx.booking, dateType, timeZone }
    : {};

  // Show breakdown only when (speculated?) transaction is loaded
  // (i.e. it has an id and lineItems)
  const breakdown =
    tx.id && tx.attributes.lineItems?.length > 0 ? (
      <OrderBreakdown
        className={css.orderBreakdown}
        userRole="customer"
        transaction={tx}
        {...txBookingMaybe}
        currency={config.currency}
        marketplaceName={config.marketplaceName}
      />
    ) : null;

  const totalPrice =
    tx?.attributes?.lineItems?.length > 0
      ? getFormattedTotalPrice(tx, intl)
      : null;

  const process = processName ? getProcess(processName) : null;
  const transitions = process.transitions;

  // Allow showing page when currentUser is still being downloaded,
  // but show payment form only when user info is loaded.
  const showPaymentForm = !!(
    currentUser &&
    !listingNotFound &&
    !initiateOrderError &&
    !speculateTransactionError
  );

  const firstImage = listing?.images?.length > 0 ? listing.images[0] : null;

  const listingLink = (
    <NamedLink
      name="ListingPage"
      params={{ id: listing?.id?.uuid, slug: createSlug(listingTitle) }}
    >
      <FormattedMessage id="CheckoutPage.errorlistingLinkText" />
    </NamedLink>
  );

  const errorMessages = getErrorMessages(
    listingNotFound,
    initiateOrderError,
    null,
    null,
    speculateTransactionError,
    listingLink,
  );

  const txTransitions = existingTransaction?.attributes?.transitions || [];
  const hasInquireTransition = txTransitions.find(
    (tr) => tr.transition === transitions.INQUIRE,
  );
  const showInitialMessageInput = !hasInquireTransition;

  // Get first and last name of the current user and use it in the StripePaymentForm to autofill the name field
  const userName = currentUser?.attributes?.profile
    ? `${currentUser.attributes.profile.firstName} ${currentUser.attributes.profile.lastName}`
    : null;

  // If your marketplace works mostly in one country you can use initial values to select country automatically
  // e.g. {country: 'FI'}

  const initalValuesForStripePayment = {
    name: userName,
    recipientName: userName,
  };
  const askShippingDetails = orderData?.deliveryMethod === "shipping";

  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <TopbarSimplified />
      <div className={css.contentContainer}>
        <MobileListingImage
          listingTitle={listingTitle}
          author={listing?.author}
          firstImage={firstImage}
          layoutListingImageConfig={config.layout.listingImage}
          showListingImage={showListingImage}
        />
        <div className={css.orderFormContainer}>
          <div className={css.headingContainer}>
            <H3 as="h1" className={css.heading}>
              {title}
            </H3>
            <H4 as="h2" className={css.detailsHeadingMobile}>
              <FormattedMessage
                id="CheckoutPage.listingTitle"
                values={{ listingTitle }}
              />
            </H4>
          </div>

          <MobileOrderBreakdown
            speculateTransactionErrorMessage={
              errorMessages.speculateTransactionErrorMessage
            }
            breakdown={breakdown}
          />

          <section className={css.paymentContainer}>
            {errorMessages.initiateOrderErrorMessage}
            {errorMessages.listingNotFoundErrorMessage}
            {errorMessages.speculateErrorMessage}
            {errorMessages.paymentExpiredMessage}

            {showPaymentForm ? (
              <SimpleOrderForm
                className={css.paymentForm}
                onSubmit={(values) =>
                  handleSubmit(
                    values,
                    process,
                    props,
                    submitting,
                    setSubmitting,
                  )
                }
                inProgress={submitting}
                formId="CheckoutPagePaymentForm"
                authorDisplayName={
                  listing?.author?.attributes?.profile?.displayName
                }
                showInitialMessageInput={showInitialMessageInput}
                initialValues={initalValuesForStripePayment}
                initiateOrderError={initiateOrderError}
                askShippingDetails={askShippingDetails}
                showPickUplocation={orderData?.deliveryMethod === "pickup"}
                listingLocation={listing?.attributes?.publicData?.location}
                totalPrice={totalPrice}
                locale={config.localization.locale}
                marketplaceName={config.marketplaceName}
                isBooking={isBookingProcessAlias(transactionProcessAlias)}
                isFuzzyLocation={config.maps.fuzzy.enabled}
                transactionFieldConfigs={transactionFieldConfigs}
                showTransactionFields={showTransactionFields}
              />
            ) : null}
          </section>
        </div>

        <DetailsSideCard
          listing={listing}
          listingTitle={listingTitle}
          author={listing?.author}
          firstImage={firstImage}
          layoutListingImageConfig={config.layout.listingImage}
          speculateTransactionErrorMessage={
            errorMessages.speculateTransactionErrorMessage
          }
          isInquiryProcess={false}
          processName={processName}
          breakdown={breakdown}
          showListingImage={showListingImage}
          intl={intl}
        />
      </div>
    </Page>
  );
};

export default CheckoutPageWithoutPayment;
