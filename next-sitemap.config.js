/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://fire-calculator-kr.vercel.app',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.8,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [],
  },
  additionalPaths: async () => [
    { loc: '/', changefreq: 'weekly', priority: 1.0, lastmod: new Date().toISOString() },
    { loc: '/quick', changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() },
    { loc: '/faq', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
    { loc: '/salary', changefreq: 'monthly', priority: 0.9, lastmod: new Date().toISOString() },
    { loc: '/savings-rate', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
    { loc: '/blog', changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() },
    { loc: '/blog/korea-fire-number', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
    { loc: '/blog/4-percent-rule-korea', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
    { loc: '/blog/fire-education-cost', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
  ],
}
