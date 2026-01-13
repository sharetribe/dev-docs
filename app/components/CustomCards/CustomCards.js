/**
 * A reusable card component that displays a title and description.
 * Can be rendered as either a link (when href is provided) or an article element.
 * Used on the landing page to display information cards with descriptions below titles.
 *
 * @param {string} title - The main heading text for the card
 * @param {string} description - The descriptive text displayed below the title
 * @param {string} [href] - Optional URL to make the card clickable as a link
 * @param {string} [className] - Additional CSS classes to apply to the card
 */
const LandingPageCard = ({ title, description, href, className = '' }) => {
  // Use 'a' element for links, 'article' for static cards
  const CardComponent = href ? 'a' : 'article';

  return (
    <CardComponent
      href={href}
      className={`
        group flex flex-col justify-start overflow-hidden rounded-lg border border-gray-200 
        text-current no-underline dark:shadow-none hover:shadow-gray-100 dark:hover:shadow-none 
        shadow-gray-100 active:shadow-sm active:shadow-gray-200 transition-all duration-200 
        hover:border-gray-300 bg-transparent shadow-sm dark:border-neutral-800 
        hover:bg-slate-50 hover:shadow-md dark:hover:border-neutral-700 dark:hover:bg-neutral-900
        p-4 text-gray-700 hover:text-gray-900
        dark:text-neutral-200 dark:hover:text-neutral-50
        gap-2 ${className}
      `
        .trim()
        .replace(/\s+/g, ' ')}
      style={{ cursor: href ? 'pointer' : 'default' }}
    >
      {/* Card title with optional arrow indicator for links */}
      <h3
        className={`font-semibold text-lg mb-0 flex items-center gap-2 ${href ? 'after:content-["→"] after:transition-transform after:duration-75 group-hover:after:translate-x-0.5 group-focus:after:translate-x-0.5' : ''}`}
      >
        {title}
      </h3>
      {/* Card description text */}
      <p className="text-m text-gray-900 dark:text-neutral-400">
        {description}
      </p>
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
    'transition-all duration-200',
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
 * A container component that displays multiple CustomCard components in a responsive grid layout.
 *
 * @param {React.ReactNode} children - The card components to display
 * @param {number} [columns] - Number of columns for the grid layout. If not provided, uses auto-fit with minmax(280px, 1fr)
 * @param {string} [className] - Additional CSS classes to apply to the container
 */
export const CustomCards = ({ children, columns, className = '' }) => {
  // If columns is specified, use repeat(columns, 1fr), otherwise use auto-fit
  const gridTemplateColumns = columns
    ? `repeat(${columns}, 1fr)`
    : 'repeat(auto-fit, minmax(280px, 1fr))';

  return (
    <div
      className={`mt-4 grid gap-4 ${className}`.trim()}
      style={{ gridTemplateColumns }}
    >
      {children}
    </div>
  );
};

export { ContributionCard };
export default LandingPageCard;
