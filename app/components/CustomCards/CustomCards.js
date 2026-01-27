import ArrowRightIcon from '../../../content/assets/ArrowRight.svg';

/**
 * A reusable card component that displays a title and description.
 * Can be rendered as either a link (when href is provided) or an article element.
 * Used on the landing page to display information cards with descriptions below titles.
 *
 * @param {string} title - The main heading text for the card
 * @param {string} description - The descriptive text displayed below the title
 * @param {string} [href] - Optional URL to make the card clickable as a link
 * @param {string|Object} [icon] - Optional icon to display. If not provided, ArrowRight icon is shown on the right. If a different icon is provided, it's shown in the top left.
 * @param {string} [className] - Additional CSS classes to apply to the card
 */
const LandingPageCard = ({
  title,
  description,
  href,
  icon,
  className = '',
}) => {
  // Use 'a' element for links, 'article' for static cards
  const CardComponent = href ? 'a' : 'article';

  // Determine if we should use the default layout (text centered, arrow on right)
  // or the icon layout (icon top left, text bottom)
  // If icon is explicitly provided, use custom icon layout
  // Otherwise, use default ArrowRight icon on the right
  const hasCustomIcon = icon !== undefined && icon !== null;
  const defaultIcon = ArrowRightIcon;
  const displayIcon = hasCustomIcon ? icon : defaultIcon;
  const iconSrc = displayIcon?.src || displayIcon;

  return (
    <CardComponent
      href={href}
      className={`
        group overflow-hidden rounded-lg
        text-current no-underline transition-all duration-150 ease-out hover:opacity-75
        bg-white dark:bg-[#181616]
        p-4
        ${hasCustomIcon ? 'flex flex-col' : 'flex items-center gap-4'}
        ${className}
      `
        .trim()
        .replace(/\s+/g, ' ')}
      style={{ cursor: href ? 'pointer' : 'default' }}
    >
      {hasCustomIcon ? (
        <>
          {/* Custom icon in top left */}
          <img
            src={iconSrc}
            alt=""
            className="flex-shrink-0 self-start mb-16"
          />
          {/* Card content - title and description at bottom */}
          <div className="flex flex-col gap-2">
            <h3
              className="font-medium mb-0"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.5px' }}
            >
              {title}
            </h3>
            <p
              className="text-m font-[450]"
              style={{
                color: 'var(--text-secondary)',
                letterSpacing: '-0.2px',
              }}
            >
              {description}
            </p>
          </div>
        </>
      ) : (
        <>
          {/* Card content - title and description */}
          <div className="flex flex-col gap-2 flex-1">
            <h3
              className="font-medium mb-0"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.5px' }}
            >
              {title}
            </h3>
            <p
              className="text-m font-[450]"
              style={{
                color: 'var(--text-secondary)',
                letterSpacing: '-0.2px',
              }}
            >
              {description}
            </p>
          </div>
          {/* Arrow indicator for links (default behavior - only show when href exists) */}
          {href && <img src={iconSrc} alt="" className="flex-shrink-0" />}
        </>
      )}
    </CardComponent>
  );
};

// Shared styles for external links in ContributionCard
const externalLinkBase =
  "inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 underline after:content-['↗'] after:translate-y-px after:transition-transform after:duration-75 hover:after:translate-x-0.5 focus:after:translate-x-0.5";

/**
 * A card component for displaying community contributions.
 * Displays title, description, contributor username, and multiple links.
 *
 * @param {string} title - The title of the contribution
 * @param {string} description - Description of the contribution
 * @param {string} username - The username of the contributor
 * @param {string} userProfileUrl - URL to the contributor's profile (e.g., GitHub profile)
 * @param {string} href - Main link to the contribution (e.g., GitHub repo, npm package)
 * @param {Array<{label: string, url: string}>} [additionalLinks] - Additional links for the contribution (e.g., npm, demo site)
 * @param {string} [className] - Additional CSS classes to apply to the card
 */
const ContributionCard = ({
  title,
  description,
  username,
  userProfileUrl,
  href,
  additionalLinks = [],
  className = '',
}) => {
  const cardClasses = [
    'group flex flex-col justify-start overflow-hidden rounded-lg',
    'border border-gray-200 dark:border-neutral-800',
    'bg-transparent shadow-sm',
    'hover:bg-slate-50 hover:shadow-md dark:hover:border-neutral-700 dark:hover:bg-neutral-900',
    'p-6 gap-4',
    'text-gray-700 hover:text-gray-900 dark:text-neutral-200 dark:hover:text-neutral-50',
    'transition-all duration-150 ease-out hover:opacity-75',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={cardClasses}>
      {/* Card title with main link */}
      <h3 className="font-semibold text-lg mb-0">
        {href ? (
          <a
            href={href}
            className={`${externalLinkBase} no-underline after:text-xs group-hover:after:translate-x-0.5 group-focus:after:translate-x-0.5`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>
        ) : (
          title
        )}
      </h3>

      {/* Card description text */}
      <p className="text-m text-gray-900 dark:text-neutral-400 flex-grow">
        {description}
      </p>

      {/* Contributor info */}
      <div className="flex items-center gap-2 text-base text-gray-600 dark:text-neutral-400">
        <span>By</span>
        {userProfileUrl ? (
          <a
            href={userProfileUrl}
            className={`${externalLinkBase} text-lg font-medium after:text-[0.7rem]`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {username}
          </a>
        ) : (
          <span className="font-medium">{username}</span>
        )}
      </div>

      {/* Additional links */}
      {additionalLinks && additionalLinks.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200 dark:border-neutral-700">
          {additionalLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className={`${externalLinkBase} text-base after:text-[0.7rem]`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
};

/**
 * A container component that displays cards in a single column layout.
 * Always displays cards in one column, regardless of screen size.
 *
 * @param {React.ReactNode} children - The card components to display
 * @param {string} [className] - Additional CSS classes to apply to the container
 */
export const CustomCardColumn = ({ children, className = '' }) => {
  return (
    <div
      className={`mt-4 grid gap-4 ${className}`.trim()}
      style={{ gridTemplateColumns: '1fr' }}
    >
      {children}
    </div>
  );
};

/**
 * A container component that displays cards in a responsive grid layout.
 * Adapts to screen size and can optionally limit the maximum number of columns.
 *
 * @param {React.ReactNode} children - The card components to display
 * @param {number} [columns] - Optional maximum number of columns (responsive grid adapts to screen size, capped at this number). If not provided, uses auto-fit.
 * @param {string} [className] - Additional CSS classes to apply to the container
 */
export const CustomCardGrid = ({ children, columns, className = '' }) => {
  let gridClasses = 'mt-4 grid gap-4';
  let gridStyle = {};

  if (columns) {
    // Responsive grid with maximum column constraint
    // Uses responsive Tailwind classes: 1 column on mobile, up to N columns on larger screens
    const responsiveClasses = ['grid-cols-1'];

    if (columns >= 2) responsiveClasses.push('md:grid-cols-2');
    if (columns >= 3) responsiveClasses.push('lg:grid-cols-3');
    if (columns >= 4) responsiveClasses.push('xl:grid-cols-4');

    gridClasses += ` ${responsiveClasses.join(' ')}`;
  } else {
    // Auto-fit responsive grid (default behavior, no column limit)
    gridStyle = { gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' };
  }

  return (
    <div
      className={`${gridClasses} ${className}`.trim()}
      style={Object.keys(gridStyle).length > 0 ? gridStyle : undefined}
    >
      {children}
    </div>
  );
};

export { LandingPageCard, ContributionCard };
