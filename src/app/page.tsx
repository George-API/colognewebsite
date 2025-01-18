import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

const featuredProducts = [
  {
    id: 1,
    name: 'Midnight Oud',
    price: 189,
    description: 'Oriental & Woody',
    image: '/products/cologne1.jpg',
  },
  {
    id: 2,
    name: 'Ocean Breeze',
    price: 149,
    description: 'Fresh & Aquatic',
    image: '/products/cologne2.jpg',
  },
  {
    id: 3,
    name: 'Citrus Bloom',
    price: 129,
    description: 'Citrus & Floral',
    image: '/products/cologne3.jpg',
  },
  {
    id: 4,
    name: 'Forest Pine',
    price: 169,
    description: 'Woody & Green',
    image: '/products/cologne4.jpg',
  },
]

export default function Home() {
  return (
    <main className="bg-[#fafafa]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <Image
            src="/hero-cologne.jpg"
            alt="Luxury cologne bottle"
            fill
            className="object-cover object-center brightness-[0.95] contrast-[1.02]"
            priority
          />
          <div className="absolute inset-0 bg-[#fafafa]/80" />
        </div>
        
        <div className="relative text-center space-y-10 max-w-6xl mx-auto px-4">
          <h1 className="text-[9rem] leading-[0.9] font-bold text-zinc-900">
            <span className="block">REFINED</span>
            <span className="block">ESSENCE</span>
          </h1>
          <p className="text-2xl font-light tracking-wide max-w-2xl mx-auto text-zinc-600">
            Discover our collection of timeless fragrances
          </p>
          <div className="flex gap-6 justify-center pt-6">
            <Link
              href="/products"
              className="bg-zinc-900 text-white px-12 py-4 text-sm tracking-wider hover:bg-black transition-colors"
            >
              VIEW COLLECTION
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="paper max-w-7xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light mb-4">FEATURED FRAGRANCES</h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            Discover our most sought-after scents, each carefully composed to evoke emotion and leave a lasting impression
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group product-card-container">
              <div className="product-image-container">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="product-title">{product.name}</h3>
              <p className="text-zinc-500 text-sm mb-2">{product.description}</p>
              <p className="product-price">${product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square bg-[#f5f5f5]">
              <Image
                src="/brand-story.jpg"
                alt="Cologne craftsmanship"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-light">CRAFTED WITH PRECISION</h2>
              <p className="text-zinc-600 text-lg leading-relaxed">
                Each fragrance is meticulously crafted by master perfumers using the finest ingredients sourced from around the world. Our commitment to quality ensures that every bottle contains a unique olfactory experience that lasts.
              </p>
              <Link
                href="/about"
                className="inline-block text-zinc-900 text-sm tracking-wider hover:text-zinc-600 transition-colors"
              >
                DISCOVER OUR STORY →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
