# Dev Docs

The dev docs are built with Nextra and the project deploys to Vercel. 

## Project Overview

## Tech Stack

- **Framework**: Next.js with Nextra
- **Language**: JavaScript 
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- Yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```

### Development

Start the development server:
```bash
yarn dev
```

The site will be available at `http://localhost:3000`

### Building

Build the project for production:
```bash
yarn build
```

Start the production server:
```bash
yarn start
```

## Syntax higlighting

The project uses MDX files so you'll likely need to install a plugin that supports MDX syntax highlighting. MDX is markdown that also supports JSX.

## Project Structure

```
├── app/
│   ├── [[...mdxPath]]/     # Dynamic route handler for MDX files
│   │   └── page.jsx        # Nextra page component with dynamic routing
│   ├── components/          # Reusable React components
│   │   └── Card/           # Card components for landing page
│   └── global.css          # Global styles
├── content/                # Documentation content (MDX files)
├── theme.config.jsx        # Nextra theme configuration
├── next.config.mjs         # Next.js configuration with Nextra setup
└── mdx-components.js       # Custom MDX component mappings
```

## How MDX Routing Works

The `[[...mdxPath]]` directory uses Next.js dynamic routing to handle all documentation pages:

- **Dynamic Catch-All Routes**: The `[[...mdxPath]]` folder name creates a catch-all route that matches any path depth (e.g., `/concepts/users`, `/tutorial/getting-started`)
- **Nextra Integration**: The `page.jsx` file uses Nextra's `importPage` function to dynamically load MDX files from the `content/` directory based on the URL path
- **Static Generation**: `generateStaticParams` pre-builds all possible routes at build time 
- **Metadata Handling**: Each MDX file can include frontmatter metadata that gets extracted and used for SEO and page information

This structure allows you to simply add new `.mdx` files to the `content/` directory and they automatically become accessible via their file path as URLs.


## Deployment

The site automatically deploys to Vercel when changes are pushed to the main branch.
