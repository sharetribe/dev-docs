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
const CustomCard = ({ title, description, href, className = '' }) => {
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

/**
 * A container component that displays multiple CustomCard components in a responsive grid layout.
 *
 * @param {React.ReactNode} children - The card components to display
 * @param {string} [className] - Additional CSS classes to apply to the container
 */
export const CustomCards = ({ children, className = '' }) => {
  return (
    <div
      className={`mt-4 grid gap-4 ${className}`.trim()}
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
    >
      {children}
    </div>
  );
};

export default CustomCard;
