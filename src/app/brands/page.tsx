import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const brands = [
  {
    id: 1,
    name: 'Creed',
    description: 'A luxury perfume house dedicated to creating highly original fragrances of extravagant quality.',
    image: '/brands/creed.jpg',
    featured: ['Aventus', 'Green Irish Tweed', 'Silver Mountain Water']
  },
  {
    id: 2,
    name: 'Tom Ford',
    description: 'Bold, luxurious fragrances that define modern elegance and sophisticated glamour.',
    image: '/brands/tomford.jpg',
    featured: ['Oud Wood', 'Tobacco Vanille', 'Tuscan Leather']
  },
  {
    id: 3,
    name: 'Maison Francis Kurkdjian',
    description: 'Contemporary fragrances crafted with precision and artistic excellence.',
    image: '/brands/mfk.jpg',
    featured: ['Baccarat Rouge 540', 'Grand Soir', 'Oud Satin Mood']
  },
  {
    id: 4,
    name: 'Parfums de Marly',
    description: 'Luxurious fragrances inspired by the elegance of 18th century French perfumery.',
    image: '/brands/pdm.jpg',
    featured: ['Layton', 'Pegasus', 'Herod']
  },
  {
    id: 5,
    name: 'Initio',
    description: 'Innovative fragrances that combine the art of perfumery with the power of intention.',
    image: '/brands/initio.jpg',
    featured: ['Side Effect', 'Oud for Greatness', 'Rehab']
  },
  {
    id: 6,
    name: 'Xerjoff',
    description: 'Italian luxury perfumes that represent the pinnacle of artisanal craftsmanship.',
    image: '/brands/xerjoff.jpg',
    featured: ['Naxos', '40 Knots', 'Alexandria II']
  }
]

export default function BrandsPage() {
  return (
    <main className="bg-[#fafafa]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-light mb-6 text-white">Our Brands</h1>
          <p className="text-xl text-zinc-300 max-w-2xl">
            Discover our curated selection of the world&apos;s most prestigious fragrance houses
          </p>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {brands.map((brand) => (
              <div key={brand.id} className="bg-white p-8 group">
                <div className="relative aspect-square mb-8 bg-zinc-100 overflow-hidden">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h2 className="text-2xl font-light mb-4">{brand.name}</h2>
                <p className="text-zinc-600 mb-6">{brand.description}</p>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-zinc-900">Featured Fragrances:</h3>
                  <ul className="text-sm text-zinc-600">
                    {brand.featured.map((fragrance) => (
                      <li key={fragrance} className="mb-1">{fragrance}</li>
                    ))}
                  </ul>
                </div>
                <Link 
                  href={`/brands/${brand.id}`}
                  className="inline-block mt-6 text-sm text-zinc-900 hover:text-zinc-600 transition-colors"
                >
                  VIEW COLLECTION →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light mb-6">Our Quality Promise</h2>
          <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
            Every fragrance in our collection is sourced directly from authorized retailers and luxury boutiques. 
            We guarantee the authenticity of all our decants, carefully measured and packaged to preserve the 
            integrity of these exceptional fragrances.
          </p>
        </div>
      </section>
    </main>
  )
} 