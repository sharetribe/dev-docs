export default {
  index: {
    title: "Developer documentation",
    theme: {
      toc: false,
      layout: "full",
      timestamp: false,
      breadcrumb: false,
    },
  },
  introduction: { theme: {} },
  tutorial: {
    theme: {
      collapsed: true,
    },
  },

  template: {
    theme: {
      collapsed: true,
    },
  },
  concepts: {
    theme: {
      collapsed: true,
    },
  },
  "how-to": {
    title: "How-tos",
    theme: {
      collapsed: true,
    },
  },
  references: {
    title: "References",
    theme: {
      collapsed: true,
    },
  },

  github_link: {
    title: "API Reference",
    type: "page",
    href: "https://www.sharetribe.com/api-reference",
  },
  developer_blog: {
    title: "Developer Blog",
    type: "page",
    href: "https://www.sharetribe.com/developer-blog",
  },
  console_link: {
    title: "Console",
    type: "page",
    href: "https://console.sharetribe.com",
  },
  company: {
    title: "Resources",
    type: "menu",
    items: {
      about: {
        title: "JavaScript SDK",
        href: "https://sharetribe.github.io/flex-sdk-js/",
      },
      example_repo: {
        title: "Example processes",
        href: "https://github.com/sharetribe/example-processes/?tab=readme-ov-file#sharetribe-example-transaction-processes",
      },
      example_repo2: {
        title: "Integration API examples",
        href: "https://github.com/sharetribe/integration-api-examples/tree/master?tab=readme-ov-file",
      },
    },
  },
};
