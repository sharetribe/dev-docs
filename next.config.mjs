import nextra from "nextra";

const withNextra = nextra({
  // Possible options listed below, from https://nextra.site/api/nextraconfig
  defaultShowCopyCode: true, // Show copy button for code blocks by default (default: undefined)
  // search: { codeblocks: false }, // Enable search functionality (default: { "codeblocks": false })
  // staticImage: true, // Optimize static image imports in Markdown (default: true)
  // readingTime: true, // Add estimated reading time to .md and .mdx files (default: undefined)
  // latex: true, // Enable LaTeX rendering via KaTeX or MathJax (default: undefined)
  // codeHighlight: true, // Enable or disable syntax highlighting (default: true)
  // mdxOptions: { format: "detect", rehypePrettyCodeOptions: {} }, // Specific options for MDX compilation (default: { "format": "detect", "rehypePrettyCodeOptions": {} })
  // whiteListTagsStyling: [], // Allow replacing HTML elements with custom components (default: undefined)
  // unstable_shouldAddLocaleToLinks: false // Prefix locale to page map links (default: false)
});

export default withNextra({
  output: "export",
  images: { unoptimized: true },
  basePath: "/docs",
  // assetPrefix: "/docs/",
  // trailingSlash: true,
});
