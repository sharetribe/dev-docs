const StyledHeader = ({ children }) => {
  return (
    <h1
      className="text-5xl font-bold text-slate-900 dark:text-slate-100"
      style={{ paddingTop: "30px" }}
    >
      {children}
    </h1>
  );
};

export default StyledHeader;
