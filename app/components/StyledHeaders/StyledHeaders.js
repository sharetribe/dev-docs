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
        margin: '16px auto',
        color: 'var(--text-primary)',
        letterSpacing: '-1.4px',
        lineHeight: '60px',
        maxWidth: '600px',
        alignSelf: 'stretch',
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
        marginTop: '96px',
        marginBottom: '32px',
        color: 'var(--text-primary)',
        letterSpacing: '-1px',
      }}
    >
      {children}
    </h1>
  );
};

export { MainHeader, SectionHeader };
