/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.sharetribe.com/docs",
  generateRobotsTxt: true,
  autoLastmod: false,
  changefreq: undefined,
  exclude: ["/icon.png"],
  priority: undefined,
};
