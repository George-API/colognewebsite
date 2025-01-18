import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { siteConfig } from '@/lib/metadata'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all products
  const products = await prisma.product.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  })

  // Static routes
  const routes = [
    '',
    '/products',
    '/about',
    '/contact',
    '/faq',
    '/shipping',
    '/returns',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic product routes
  const productRoutes = products.map((product) => ({
    url: `${siteConfig.url}/products/${product.id}`,
    lastModified: product.updatedAt.toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...routes, ...productRoutes]
} 