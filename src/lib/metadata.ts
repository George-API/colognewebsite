import { Metadata } from 'next'

export const siteConfig = {
  name: 'Decant Labs',
  description: 'Curated collection of luxury fragrances for the modern individual.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://decantlabs.com',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/decantlabs',
    instagram: 'https://instagram.com/decantlabs',
  },
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    openGraph: {
      title: {
        default: title,
        template: `%s | ${siteConfig.name}`,
      },
      description,
      images: [
        {
          url: image,
        },
      ],
      type: 'website',
      siteName: siteConfig.name,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@decantlabs',
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
} 