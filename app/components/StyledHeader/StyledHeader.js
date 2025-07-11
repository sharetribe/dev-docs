const StyledHeader = ({ children }) => {
  return (
    <h1
      className="text-5xl font-bold  dark:text-neutral-100"
      style={{ paddingTop: "40px", maxWidth: "700px" }}
    >
      {children}
    </h1>
  );
};

export default StyledHeader;
