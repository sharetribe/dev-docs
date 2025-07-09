function CustomCard({ title, description, href, className = '' }) {
  const CardComponent = href ? 'a' : 'article';
  
  return (
    <CardComponent
      href={href}
      className={`
        flex flex-col justify-start overflow-hidden rounded-lg border border-gray-200 
        text-current no-underline dark:shadow-none hover:shadow-gray-100 dark:hover:shadow-none 
        shadow-gray-100 active:shadow-sm active:shadow-gray-200 transition-all duration-200 
        hover:border-gray-300 bg-transparent shadow-sm dark:border-neutral-800 
        hover:bg-slate-50 hover:shadow-md dark:hover:border-neutral-700 dark:hover:bg-neutral-900
        p-4 text-gray-700 hover:text-gray-900
        dark:text-neutral-200 dark:hover:text-neutral-50
        gap-2 ${className}
      `.trim().replace(/\s+/g, ' ')}
      style={{ cursor: href ? 'pointer' : 'default' }}
    >
      <h3 className="font-semibold text-lg mb-0 flex items-center gap-2">
        {title}
        {href && <span className="text-sm">→</span>}
      </h3>
      <p className="text-m text-gray-900 dark:text-neutral-400">
        {description}
      </p>
    </CardComponent>
  );
}

export function CustomCards({ children, className = '' }) {
  return (
    <div
      className={`mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export default CustomCard;