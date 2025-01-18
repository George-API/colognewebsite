'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'

interface CartItem {
  id: number
  name: string
  brand: string
  price: number
  size: string
  quantity: number
  image: string
}

interface CartState {
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }

const initialState: CartState = {
  items: [],
  subtotal: 0,
  shipping: 15,
  tax: 0,
  total: 0,
}

function calculateTotals(items: CartItem[]): Omit<CartState, 'items'> {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = items.length > 0 ? 15 : 0
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + shipping + tax

  return { subtotal, shipping, tax, total }
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      let newItems: CartItem[]

      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }]
      }

      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems),
      }
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload)
      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems),
      }
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems),
      }
    }

    case 'CLEAR_CART':
      return initialState

    default:
      return state
  }
}

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 