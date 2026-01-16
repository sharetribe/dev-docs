import Link from 'next/link';

/**
 * A styled button component that renders as a Next.js Link.
 * Displays as a rounded button with customizable background color.
 *
 * @param {string} text - The button label text
 * @param {string} color - The background color of the button (CSS color value)
 * @param {string} href - The URL to navigate to when the button is clicked
 */
const RoundedLinkButton = ({ text, color, href }) => {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-block',
        padding: '18px 30px',
        borderRadius: '30px',
        background: color,
        color: 'white',
        textDecoration: 'none',
        lineHeight: 1.2,
        fontWeight: 500,
      }}
    >
      {text}
    </Link>
  );
};

export default RoundedLinkButton;
