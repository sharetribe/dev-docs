/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://localhost:3000",
  generateRobotsTxt: true,
  autoLastmod: false,
  changefreq: undefined,
  exclude: ["/icon.png"],
  priority: undefined,
};
