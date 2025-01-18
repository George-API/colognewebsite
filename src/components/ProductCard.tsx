'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@mui/material'

interface Product {
  id: string
  name: string
  brand: string
  description: string
  price: number
  size: string
  stock: number
  images: string[]
  category: string
  featured: boolean
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="aspect-square bg-zinc-50 relative mb-3 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(min-width: 1280px) 384px, (min-width: 1024px) 288px, (min-width: 768px) 342px, (min-width: 640px) 284px, calc(50vw - 24px)"
          priority
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-xs sm:text-sm font-medium text-zinc-900">Out of Stock</span>
          </div>
        )}
        {product.featured && (
          <Badge
            color="primary"
            badgeContent="Featured"
            sx={{
              position: 'absolute',
              top: { xs: 8, sm: 16 },
              right: { xs: 8, sm: 16 },
              '& .MuiBadge-badge': {
                backgroundColor: 'black',
                color: 'white',
                fontSize: { xs: '0.65rem', sm: '0.75rem' },
                height: { xs: '20px', sm: '24px' },
                minWidth: { xs: '20px', sm: '24px' },
                padding: { xs: '0 6px', sm: '0 8px' },
              },
            }}
          />
        )}
      </div>
      <div className="space-y-1">
        <p className="text-xs sm:text-sm text-zinc-500 truncate">{product.brand}</p>
        <h3 className="text-sm sm:text-base font-medium group-hover:text-zinc-600 transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="flex justify-between items-center">
          <p className="text-sm sm:text-base font-medium">${product.price.toFixed(2)}</p>
          <p className="text-xs sm:text-sm text-zinc-500">{product.size}</p>
        </div>
      </div>
    </Link>
  )
} 