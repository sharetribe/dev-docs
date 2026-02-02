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
const isProduction = process.env.NODE_ENV === `production`;

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
      path: './fonts/CircularXXWeb-Book.woff2',
      weight: '450',
      style: 'normal',
    },
    {
      path: './fonts/CircularXXWeb-Medium.woff2',
      weight: '500',
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
    index: isProduction,
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

const kapaScript = (
  <script
    async
    src="https://widget.kapa.ai/kapa-widget.bundle.js"
    data-website-id="adc8b7cb-4e4a-4f1d-aef2-274477f095da"
    data-project-name="Sharetribe"
    data-project-color="#181616"
    data-project-logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqqHt-LCCSvT41C827y-LrXf1etlv8uqUV_g&s"
    data-bot-protection-mechanism="hcaptcha"
    data-modal-override-open-id="ask-ai-input"
    data-modal-override-open-class="search-input"
    data-user-analytics-fingerprint-enabled="true"
    data-modal-title="Sharetribe AI Assistant"
    data-modal-example-questions-title="Try asking me..."
    data-modal-disclaimer="This **AI assistant answers Sharetribe questions** using our [documentation](https://www.sharetribe.com/docs/), [API reference](https://www.sharetribe.com/api-reference/), [help center](https://www.sharetribe.com/help/en/), [blogs](https://www.sharetribe.com/developer-blog/), [SDK reference](https://sharetribe.github.io/flex-sdk-js/) and [github files](https://github.com/sharetribe/web-template/)."
    data-modal-example-questions="How do I customize transaction flow?,How do I change commission logic?,How to extend the web template?,How do I migrate data to Flex?"
    data-button-text-color="#FFFFFF"
    data-modal-header-bg-color="#181616"
    data-modal-title-color="#FFFFFF"
  ></script>
);

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
        {kapaScript}
      </Head>
      <body>
        <PlausibleProvider
          scriptProps={{
            src: '/docs/stats/js/script/',
            'data-api': '/docs/stats/api/event/',
          }}
          enabled={isProduction}
          domain={isPreviewEnv ? 'flex-docs.vercel.app' : 'sharetribe.com/docs'}
        >
          <Layout
            // banner={banner}
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
        </PlausibleProvider>
      </body>
    </html>
  );
}
