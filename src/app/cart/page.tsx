'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X } from 'lucide-react'
import Navbar from '../../components/Navbar'
import { useCart } from '../../context/CartContext'
import { Button, IconButton, Tooltip } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { state: cartState, dispatch } = useCart()
  const router = useRouter()

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    if (newQuantity > 10) return // Optional: set maximum quantity
    
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity: newQuantity }
    })
  }

  const handleRemoveItem = (id: number) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: id
    })
  }

  const handleCheckout = () => {
    if (cartState.items.length === 0) return
    router.push('/checkout')
  }

  return (
    <main>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-24">
        <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            {cartState.items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-zinc-600 mb-4">Your cart is empty</p>
                <Link 
                  href="/products" 
                  className="inline-block bg-zinc-900 text-white px-8 py-3 hover:bg-black transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                {cartState.items.map((item) => (
                  <div key={item.id} className="flex gap-6 py-6 border-b">
                    <Link href={`/fragrances/${item.id}`} className="relative aspect-square w-24 bg-zinc-50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <Link 
                            href={`/fragrances/${item.id}`} 
                            className="font-medium hover:text-zinc-600 transition-colors"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-zinc-500 mt-1">{item.brand}</p>
                          <p className="text-sm text-zinc-500">{item.size}</p>
                        </div>
                        <Tooltip title="Remove item">
                          <IconButton 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-zinc-400 hover:text-zinc-600"
                          >
                            <X className="h-5 w-5" />
                          </IconButton>
                        </Tooltip>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <IconButton
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-1 border border-zinc-200 hover:bg-zinc-50 disabled:opacity-50"
                          >
                            <Minus className="h-4 w-4" />
                          </IconButton>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <IconButton
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= 10}
                            className="p-1 border border-zinc-200 hover:bg-zinc-50 disabled:opacity-50"
                          >
                            <Plus className="h-4 w-4" />
                          </IconButton>
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-zinc-50 p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartState.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${cartState.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${cartState.tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-medium text-base">
                  <span>Total</span>
                  <span>${cartState.total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                variant="contained"
                fullWidth
                onClick={handleCheckout}
                disabled={cartState.items.length === 0}
                sx={{ 
                  mt: 4,
                  py: 1.5,
                  backgroundColor: 'black',
                  '&:hover': {
                    backgroundColor: '#333',
                  },
                  '&:disabled': {
                    backgroundColor: '#ccc',
                  }
                }}
              >
                Proceed to Checkout
              </Button>

              <Link 
                href="/fragrances" 
                className="block text-center text-sm text-zinc-600 hover:text-zinc-900 mt-4 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 