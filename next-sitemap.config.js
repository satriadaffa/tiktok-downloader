/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://tikdown.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tikdown.vercel.app'}/sitemap-0.xml`,
    ],
  },
}
