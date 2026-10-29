/** @type {import('next-sitemap').IConfig} */
// https://github.com/iamvishnusankar/next-sitemap
module.exports = {
  siteUrl: 'https://www.sharetribe.com/docs',
  trailingSlash: true,
  autoLastmod: true,
  changefreq: undefined,
  exclude: ['/icon.png', '/404'],
  priority: undefined,
  outDir: process.env.VERCEL_ENV == 'production' ? './out/docs/' : 'public',
  output: 'export',
};
