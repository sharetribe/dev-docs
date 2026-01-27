/**
 * A styled header component for main page titles.
 * Displays as a large, centered, bold heading with top padding.
 *
 * @param {React.ReactNode} children - The header text content
 */
const MainHeader = ({ children }) => {
  return (
    <h1
      className="text-[44px] font-medium text-center dark:text-slate-100"
      style={{
        paddingTop: '20px',
        color: 'var(--text-primary)',
        letterSpacing: '-1.4px',
      }}
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
      className="text-3xl font-medium text-start"
      style={{
        paddingTop: '60px',
        color: 'var(--text-primary)',
        letterSpacing: '-1px',
      }}
    >
      {children}
    </h1>
  );
};

export { MainHeader, SectionHeader };
