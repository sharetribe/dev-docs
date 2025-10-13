/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.VERCEL_ENV != "production"
      ? process.env.VERCEL_URL
      : "https://www.sharetribe.com/docs",
  generateRobotsTxt: true,
  autoLastmod: false,
  changefreq: undefined,
  exclude: ["/icon.png"],
  priority: undefined,
};
