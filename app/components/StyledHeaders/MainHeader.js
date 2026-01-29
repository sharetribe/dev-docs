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
 * Exported main header component.
 */
export { MainHeader };
