export default {
  index: {
    title: "Developer documentation",
    display: "hidden",
    theme: {
      toc: false,
      layout: "full",
      timestamp: false,
      breadcrumb: false,
      pagination: false,
    },
  },
  introduction: {
    theme: {
      collapsed: true,
    },
  },
  tutorial: {
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

  template: {
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

  api_reference: {
    title: "API Reference",
    type: "page",
    href: "https://www.sharetribe.com/api-reference",
  },

  resources: {
    title: "Resources",
    type: "menu",
    items: {
      sdk: {
        title: "JavaScript SDK",
        href: "https://sharetribe.github.io/flex-sdk-js/",
      },
      developer_blog: {
        title: "Developer Blog",
        href: "https://www.sharetribe.com/developer-blog",
      },
      console_link: {
        title: "Console",
        href: "https://console.sharetribe.com",
      },
      example_repo: {
        title: "Example transaction processes",
        href: "https://github.com/sharetribe/example-processes/?tab=readme-ov-file#sharetribe-example-transaction-processes",
      },
      example_repo2: {
        title: "Integration API examples",
        href: "https://github.com/sharetribe/integration-api-examples/tree/master?tab=readme-ov-file",
      },
      community_contributions: {
        title: "Community contributions",
        href: "/community-contributions",
      },
    },
  },

  "community-contributions": {
    display: "hidden"
  }
};
