import type { MetadataRoute } from 'next'
import { getProjects } from '@/lib/projects'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://portfolio-six-mu-c3zpt9l3gd.vercel.app'

    // Static routes
    const routes = ['', '/about', '/experience', '/projects', '/contact', '/booking'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic project routes
    const projects = getProjects('en') // Default to EN for sitemap or we could merge but usually one is enough for crawler
    const projectRoutes = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [...routes, ...projectRoutes]
}
