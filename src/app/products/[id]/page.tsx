import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Minus, Plus, Heart } from 'lucide-react'
import Navbar from '../../../components/Navbar'

// Mock product data - in a real app, this would come from an API or database
const product = {
  id: 1,
  name: 'Modern Chair',
  price: 299,
  description: 'A sleek and comfortable modern chair perfect for any contemporary space. Features durable construction and ergonomic design.',
  category: 'Furniture',
  images: [
    '/products/chair.jpg',
    '/products/chair-2.jpg',
    '/products/chair-3.jpg',
  ],
  features: [
    'Ergonomic design',
    'High-quality materials',
    'Easy assembly',
    'Durable construction',
  ],
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-24">
        <Link href="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
              <p className="text-2xl">${product.price}</p>
            </div>

            <p className="text-gray-600">{product.description}</p>

            <div>
              <h3 className="font-medium mb-4">Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-lg font-medium">1</span>
                <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="flex gap-4">
                <button className="btn-primary flex-1">Add to Cart</button>
                <button className="btn-secondary p-4">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 