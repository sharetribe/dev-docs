/**
 * A styled header component for main page titles.
 * Displays as a large, centered, bold heading with top padding.
 *
 * @param {React.ReactNode} children - The header text content
 */
const MainHeader = ({ children }) => {
  return (
    <h1
      className="text-4xl font-bold text-center text-slate-900 dark:text-slate-100"
      style={{ paddingTop: '20px' }}
    >
      {children}
    </h1>
  );
};

/**
 * A styled header component for section titles.
 * Displays as a medium-sized, left-aligned, bold heading with top padding.
 *
 * @param {React.ReactNode} children - The header text content
 */
const SectionHeader = ({ children }) => {
  return (
    <h1
      className="text-3xl font-bold text-start text-slate-900 dark:text-slate-100"
      style={{ paddingTop: '60px' }}
    >
      {children}
    </h1>
  );
};

export { MainHeader, SectionHeader };
