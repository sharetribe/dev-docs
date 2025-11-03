import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { storableError } from '../../util/errors';
import { createImageVariantConfig } from '../../util/sdkLoader';
import { parse } from '../../util/urlHelpers';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';

// Pagination page size might need to be dynamic on responsive page layouts
// Current design has max 3 columns 42 is divisible by 2 and 3
// So, there's enough cards to fill all columns on full pagination pages
const RESULT_PAGE_SIZE = 42;

const initialState = {
  pagination: null,
  queryParams: null,
  queryInProgress: false,
  queryFavoritesError: null,
  currentPageResultIds: [],
};

const resultIds = data => data.data.map(l => l.id);

export const queryFavoriteListingsPayloadCreater = (
  queryParams,
  { extra: sdk, dispatch, rejectWithValue, getState }
) => {
  const { currentUser } = getState().user;
  const { favorites } = currentUser?.attributes.profile.privateData || {};

  const favoritesMaybe = favorites ? { ids: favorites } : {};
  const { perPage, ...rest } = queryParams;
  const params = { ...favoritesMaybe, ...rest, perPage };

  return sdk.listings
    .query(params)
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      return response;
    })
    .catch(e => {
      return rejectWithValue(storableError(e));
    });
};

export const queryFavoriteListingsThunk = createAsyncThunk(
  'app/FavoriteListingsPage/queryFavoriteListings',
  queryFavoriteListingsPayloadCreater
);

const favoriteListingsSlice = createSlice({
  name: 'FavoriteListingsPage',
  initialState: initialState,
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(queryFavoriteListingsThunk.pending, (state, action) => {
        state.queryParams = action.meta.arg;
        state.queryInProgress = true;
        state.queryFavoritesError = null;
        state.currentPageResultIds = [];
      })
      .addCase(queryFavoriteListingsThunk.fulfilled, (state, action) => {
        state.currentPageResultIds = resultIds(action.payload.data);
        state.pagination = action.payload.meta;
        state.queryInProgress = false;
      })
      .addCase(queryFavoriteListingsThunk.rejected, (state, action) => {
        console.error(action.payload || action.error);
        state.queryInProgress = false;
        state.queryFavoritesError = action.payload;
      });
  },
});

export default favoriteListingsSlice.reducer;

export const loadData = (params, search, config) => {
  const queryParams = parse(search);
  const page = queryParams.page || 1;

  const {
    aspectWidth = 1,
    aspectHeight = 1,
    variantPrefix = 'listing-card',
  } = config.layout.listingImage;
  const aspectRatio = aspectHeight / aspectWidth;

  return queryFavoriteListingsThunk({
    ...queryParams,
    page,
    perPage: RESULT_PAGE_SIZE,
    include: ['images'],
    'fields.image': [`variants.${variantPrefix}`, `variants.${variantPrefix}-2x`],
    ...createImageVariantConfig(`${variantPrefix}`, 400, aspectRatio),
    ...createImageVariantConfig(`${variantPrefix}-2x`, 800, aspectRatio),
    'limit.images': 1,
  });
};
