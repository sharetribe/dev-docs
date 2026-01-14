/**
 * A wrapper component that centers its children horizontally.
 * Merges custom styles with center text alignment.
 *
 * @param {React.ReactNode} children - The content to be centered
 * @param {React.CSSProperties} [style] - Optional inline styles to merge with center alignment
 * @param {string} [className] - Optional CSS classes to apply to the container
 */
const Center = ({ children, style, className }) => {
  const mergedStyle = {
    textAlign: 'center',
    ...style,
  };

  return (
    <div style={mergedStyle} className={className}>
      {children}
    </div>
  );
};

export default Center;
