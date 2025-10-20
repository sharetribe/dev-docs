/** @type {import('next-sitemap').IConfig} */
// https://github.com/iamvishnusankar/next-sitemap
module.exports = {
  siteUrl: 'https://www.sharetribe.com/docs',
  autoLastmod: false,
  changefreq: undefined,
  exclude: ['/icon.png'],
  priority: undefined,
  outDir: process.env.VERCEL_ENV == 'production' ? './out/docs/' : 'public',
  output: 'export',
};
