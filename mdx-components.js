import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';

// Get the default MDX components from Nextra theme
// This includes components like headings, links, code blocks, etc.
const themeComponents = getThemeComponents();

// Custom hook to merge Nextra's default components with any custom components
// This allows us to override specific components while keeping the rest
//
// Example usage:
// export function useMDXComponents(components) {
//   return {
//     ...themeComponents,
//     h1: ({ children }) => <h1 className="custom-heading">{children}</h1>,
//     a: ({ href, children }) => <a href={href} className="custom-link">{children}</a>,
//     code: ({ children }) => <code className="custom-code">{children}</code>,
//     ...components
//   }
// }
export function useMDXComponents(components) {
  return {
    ...themeComponents, // Start with Nextra's default components
    ...components, // Override with any custom components passed in
  };
}
