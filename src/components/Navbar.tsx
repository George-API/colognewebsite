'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const { state: cartState } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  return (
    <nav className="bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-8">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/images/decant-logo-final.png"
                  alt="Decant Labs"
                  width={35}
                  height={12}
                  priority
                  className="opacity-90"
                />
                <span className="text-white text-base sm:text-lg">Decant Labs</span>
              </Link>

              <div className="hidden md:flex items-center gap-4 lg:gap-6">
                <Link href="/fragrances" className="text-sm text-zinc-300 hover:text-white transition-colors">
                  Fragrances
                </Link>
                <Link href="/brands" className="text-sm text-zinc-300 hover:text-white transition-colors">
                  Brands
                </Link>
                <Link href="/about" className="text-sm text-zinc-300 hover:text-white transition-colors">
                  About
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/cart" className="relative text-white">
                <ShoppingCart className="h-5 w-5" />
                {cartState.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-zinc-900 text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center">
                    {cartState.items.length}
                  </span>
                )}
              </Link>

              <button
                className="md:hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-900 border-t border-zinc-800 py-4 px-4 sm:px-6">
              <div className="flex flex-col space-y-4">
                <Link 
                  href="/fragrances" 
                  className="text-sm text-zinc-300 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Fragrances
                </Link>
                <Link 
                  href="/brands" 
                  className="text-sm text-zinc-300 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Brands
                </Link>
                <Link 
                  href="/about" 
                  className="text-sm text-zinc-300 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
} 