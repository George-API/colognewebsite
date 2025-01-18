'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import { Filter, ChevronDown } from 'lucide-react'

const products = [
  {
    id: 1,
    name: 'Aventus',
    brand: 'Creed',
    price: 435,
    size: '100ml',
    category: 'Fruity & Rich',
    description: 'Pineapple, Birch, Ambergris, Black Currant',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Oud Wood',
    brand: 'Tom Ford',
    price: 399,
    size: '100ml',
    category: 'Woody & Spicy',
    description: 'Rare Oud Wood, Sandalwood, Chinese Pepper',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Baccarat Rouge 540',
    brand: 'Maison Francis Kurkdjian',
    price: 495,
    size: '70ml',
    category: 'Sweet & Amber',
    description: 'Saffron, Jasmine, Cedar, Ambergris',
    image: 'https://images.unsplash.com/photo-1592914610354-fd354ea45e48?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'Black Phantom',
    brand: 'Kilian',
    price: 485,
    size: '50ml',
    category: 'Gourmand',
    description: 'Rum, Coffee, Sugar Cane, Dark Chocolate',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 5,
    name: 'Layton',
    brand: 'Parfums de Marly',
    price: 335,
    size: '125ml',
    category: 'Fresh & Spicy',
    description: 'Bergamot, Lavender, Vanilla, Geranium',
    image: 'https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 6,
    name: 'Reflection Man',
    brand: 'Amouage',
    price: 445,
    size: '100ml',
    category: 'Fresh & Floral',
    description: 'Rosemary, Jasmine, Neroli, Sandalwood',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 7,
    name: 'Side Effect',
    brand: 'Initio',
    price: 395,
    size: '90ml',
    category: 'Sweet & Tobacco',
    description: 'Tobacco, Vanilla, Rum, Cinnamon',
    image: 'https://images.unsplash.com/photo-1524638067-feba7e8ed70f?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 8,
    name: '40 Knots',
    brand: 'Xerjoff',
    price: 475,
    size: '100ml',
    category: 'Fresh & Woody',
    description: 'Sea Notes, Cedar, Ambergris, Musk',
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&auto=format&fit=crop&q=80',
  }
]

export default function ProductsPage() {
  return (
    <main>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-light mb-2">All Fragrances</h1>
            <p className="text-zinc-500">Discover our curated collection of luxury fragrances</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="btn-secondary flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            
            <button className="btn-secondary flex items-center gap-2">
              Sort by
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group product-card-container">
              <div className="product-image-container">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-sm text-zinc-500">{product.brand}</p>
                <h3 className="product-title">{product.name}</h3>
                <p className="text-sm text-zinc-600">{product.description}</p>
                <div className="flex justify-between items-center pt-2">
                  <p className="product-price">${product.price}</p>
                  <p className="text-sm text-zinc-500">{product.size}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
} 