'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Minus, Plus, Heart } from 'lucide-react'
import { IconButton, Snackbar, Alert } from '@mui/material'
import Navbar from '../../../components/Navbar'
import { useCart } from '@/context/CartContext'

// Mock product data - in a real app, this would come from an API or database
const product = {
  id: 1,
  name: 'Modern Chair',
  brand: 'Designer Brand',
  price: 299,
  description: 'A sleek and comfortable modern chair perfect for any contemporary space. Features durable construction and ergonomic design.',
  category: 'Furniture',
  size: 'One Size',
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
  const [quantity, setQuantity] = React.useState(1)
  const [isWishlisted, setIsWishlisted] = React.useState(false)
  const [showSnackbar, setShowSnackbar] = React.useState(false)
  const [snackbarMessage, setSnackbarMessage] = React.useState('')
  const { dispatch } = useCart()

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => {
      const newQuantity = prev + delta
      return newQuantity >= 1 && newQuantity <= 10 ? newQuantity : prev
    })
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        size: product.size,
        quantity: quantity,
        image: product.images[0]
      }
    })
    setSnackbarMessage('Added to cart successfully')
    setShowSnackbar(true)
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    setSnackbarMessage(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
    setShowSnackbar(true)
  }

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
                <IconButton 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                >
                  <Minus className="h-4 w-4" />
                </IconButton>
                <span className="text-lg font-medium">{quantity}</span>
                <IconButton
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                </IconButton>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-black text-white px-8 py-3 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={handleWishlist}
                  className={`p-4 rounded-lg border ${
                    isWishlisted 
                      ? 'border-red-200 bg-red-50 text-red-500 hover:bg-red-100' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSnackbar(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </main>
  )
} 