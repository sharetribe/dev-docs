import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { Banner, Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import localFont from 'next/font/local';

// Components
import Logo from './components/Logo.js';
import SlackIcon from './components/SlackIcon.js';

// Styles
import 'nextra-theme-docs/style.css';
import './global.css';

// Plausible
import PlausibleProvider from 'next-plausible';

const isPreviewEnv = process.env.PLAUSIBLE_ENV === `preview`;
const enablePlausible = process.env.NODE_ENV === `production`;

const circular = localFont({
  src: [
    {
      path: './fonts/CircularXXWeb-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/CircularXXWeb-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/CircularXXWeb-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const metadata = {
  robots: {
    index: false,
  },
  title: {
    template: '%s - Sharetribe Developer Documentation',
    default: 'Sharetribe Developer Documentation',
  },
};

const banner = (
  <Banner storageKey="new-docs">We've released a new docs site! 🎉</Banner>
);
const navbar = (
  <Navbar
    logo={<Logo />}
    chatLink="https://www.sharetribe.com/dev-slack"
    chatIcon={<SlackIcon />}
    projectLink="https://www.github.com/sharetribe/web-template"
    // ... Your additional navbar options
  />
);
const footer = <Footer>{new Date().getFullYear()} © Sharetribe</Footer>;

export default async function RootLayout({ children }) {
  return (
    <html
      className={circular.className}
      // Not required, but good for SEO
      lang="en"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
        faviconGlyph="none"
        backgroundColor={{
          light: 'rgb(250,250,250)',
          dark: 'rgb(12,10,9)',
        }}
        color={{
          hue: 13,
          saturation: 86,
          lightness: {
            light: 43,
            dark: 63,
          },
        }}
      >
        <PlausibleProvider
          scriptProps={{
            src: '/docs/stats/js/script/',
            'data-api': '/docs/stats/api/event/',
          }}
          enabled={enablePlausible}
          domain={isPreviewEnv ? 'flex-docs.vercel.app' : 'sharetribe.com/docs'}
        />
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/sharetribe/dev-docs/blob/main"
          footer={footer}
          sidebar={{ autoCollapse: true }}
          editLink="Suggest an improvement"
          // ... Your additional layout options
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
