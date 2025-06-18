import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import localFont from 'next/font/local'

// Components
import Logo from './components/Logo.js'
import SlackIcon from './components/SlackIcon.js'

// Styles
import 'nextra-theme-docs/style.css'
import './global.css'

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
})

 
export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}
 
// const banner = <Banner storageKey="some-key">Add banners here! 🎉</Banner>
const navbar = (
  <Navbar
    logo={<Logo />}
    chatLink="https://www.sharetribe.com/dev-slack"
    chatIcon={<SlackIcon/>}
    projectLink="https://www.github.com/sharetribe/web-template"
    // ... Your additional navbar options
  />
)
const footer = <Footer>MIT {new Date().getFullYear()} © Nextra.</Footer>
 
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
          light: "rgb(250,250,250)",
          dark: "rgb(12,10,9)",
        }
        }
        color={{
          hue: 13,
          saturation: 86,
            lightness: {
              light: 43,
              dark: 63
            }
        }}
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <Layout
          // banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/sharetribe/dev-docs/blob/main"
          footer={footer}
          // ... Your additional layout options
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}