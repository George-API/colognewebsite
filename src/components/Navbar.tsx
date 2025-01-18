'use client'

import React from 'react'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const { state: cartState } = useCart()

  return (
    <nav className="bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-white font-medium">
                COLOGNE
              </Link>

              <div className="hidden md:flex items-center gap-6">
                <Link href="/products" className="text-sm text-zinc-300 hover:text-white transition-colors">
                  All Products
                </Link>
                <Link href="/brands" className="text-sm text-zinc-300 hover:text-white transition-colors">
                  Brands
                </Link>
                <Link href="/categories" className="text-sm text-zinc-300 hover:text-white transition-colors">
                  Categories
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/search" className="text-sm text-zinc-300 hover:text-white transition-colors">
                Search
              </Link>
              <Link href="/account" className="text-sm text-zinc-300 hover:text-white transition-colors">
                Account
              </Link>
              <Link href="/new-arrivals" className="text-sm text-zinc-300 hover:text-white transition-colors">
                New Arrivals
              </Link>
              <Link href="/cart" className="relative text-white">
                <ShoppingCart className="h-5 w-5" />
                {cartState.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-zinc-900 text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center">
                    {cartState.items.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 