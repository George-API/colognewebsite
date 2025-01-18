'use client'

import Link from 'next/link'
import { ShoppingCart, Search, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const luxuryBrands = [
  { name: 'Creed', href: '/collections/creed' },
  { name: 'Tom Ford', href: '/collections/tom-ford' },
  { name: 'Maison Francis Kurkdjian', href: '/collections/mfk' },
  { name: 'Roja Parfums', href: '/collections/roja' },
  { name: 'Amouage', href: '/collections/amouage' },
  { name: 'Parfums de Marly', href: '/collections/pdm' },
  { name: 'Initio', href: '/collections/initio' },
  { name: 'Xerjoff', href: '/collections/xerjoff' },
  { name: 'Kilian', href: '/collections/kilian' },
  { name: 'Frederic Malle', href: '/collections/frederic-malle' },
]

export default function Navbar() {
  const [showCollections, setShowCollections] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-zinc-900 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-light tracking-widest text-white">
            DECANT LABS
          </Link>
          
          <div className="flex-1 max-w-lg mx-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search fragrances..."
                className="w-full py-2.5 pl-10 pr-4 text-sm bg-white/5 text-white placeholder:text-zinc-400 border-none focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="relative">
              <button 
                className="flex items-center gap-1 text-sm text-zinc-300 hover:text-white transition-colors"
                onMouseEnter={() => setShowCollections(true)}
                onMouseLeave={() => setShowCollections(false)}
              >
                Collections
                <ChevronDown className="h-4 w-4" />
              </button>

              {showCollections && (
                <div 
                  className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg py-2 rounded-sm"
                  onMouseEnter={() => setShowCollections(true)}
                  onMouseLeave={() => setShowCollections(false)}
                >
                  {luxuryBrands.map((brand) => (
                    <Link
                      key={brand.name}
                      href={brand.href}
                      className="block px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                    >
                      {brand.name}
                    </Link>
                  ))}
                  <div className="border-t border-zinc-100 mt-2 pt-2 px-4">
                    <Link
                      href="/collections"
                      className="block text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                      View All Brands →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/new-arrivals" className="text-sm text-zinc-300 hover:text-white transition-colors">
              New Arrivals
            </Link>
            <Link href="/cart" className="relative text-white">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-white text-zinc-900 text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 