import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: 'https://portfolio-six-mu-c3zpt9l3gd.vercel.app/sitemap.xml',
    }
}
