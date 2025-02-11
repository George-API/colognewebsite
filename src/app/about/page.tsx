import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function AboutPage() {
  return (
    <main className="bg-[#fafafa]">
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-light mb-6 text-white">About Decant Labs</h1>
          <p className="text-xl text-zinc-300 max-w-2xl">
            Making luxury fragrances more accessible through thoughtfully crafted decants
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-light">Our Mission</h2>
              <p className="text-lg text-zinc-600 leading-relaxed">
                At Decant Labs, we believe that everyone should have the opportunity to experience luxury fragrances. 
                Our decanting service makes this possible by offering smaller portions of high-end colognes at more 
                accessible price points.
              </p>
              <p className="text-lg text-zinc-600 leading-relaxed">
                Whether you&apos;re looking to try something new, need a travel-sized option, or want to build a diverse 
                collection without the full-bottle commitment, our carefully measured decants provide the perfect solution.
              </p>
            </div>
            <div className="relative aspect-square bg-zinc-100">
              <Image
                src="/about-mission.jpg"
                alt="Luxury fragrance decanting"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center mx-auto mb-6">1</div>
              <h3 className="text-xl mb-4">Authentic Sourcing</h3>
              <p className="text-zinc-600">
                We source our fragrances directly from authorized retailers and luxury boutiques, ensuring 100% authenticity.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center mx-auto mb-6">2</div>
              <h3 className="text-xl mb-4">Precise Decanting</h3>
              <p className="text-zinc-600">
                Each fragrance is carefully measured and transferred into high-quality glass vials using professional equipment.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center mx-auto mb-6">3</div>
              <h3 className="text-xl mb-4">Quality Delivery</h3>
              <p className="text-zinc-600">
                Your decants are securely packaged and shipped to ensure they arrive in perfect condition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-16">Why Choose Decants?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8">
              <h3 className="text-xl mb-4">Accessibility</h3>
              <p className="text-zinc-600">
                Experience luxury fragrances without the full-bottle investment
              </p>
            </div>
            <div className="bg-white p-8">
              <h3 className="text-xl mb-4">Variety</h3>
              <p className="text-zinc-600">
                Build a diverse collection and discover new signature scents
              </p>
            </div>
            <div className="bg-white p-8">
              <h3 className="text-xl mb-4">Convenience</h3>
              <p className="text-zinc-600">
                Perfect sizes for travel, special occasions, or everyday use
              </p>
            </div>
            <div className="bg-white p-8">
              <h3 className="text-xl mb-4">Value</h3>
              <p className="text-zinc-600">
                Try before committing to a full bottle purchase
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light mb-6">Ready to Explore?</h2>
          <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
            Browse our collection of premium fragrance decants and find your perfect scent.
          </p>
          <Link 
            href="/fragrances" 
            className="inline-flex items-center gap-2 bg-white text-zinc-900 px-8 py-3 hover:bg-zinc-100 transition-colors"
          >
            View Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
} 