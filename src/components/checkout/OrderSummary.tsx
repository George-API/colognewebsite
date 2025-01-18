'use client'

import React from 'react'
import Image from 'next/image'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Button,
  Box,
} from '@mui/material'
import { useCart } from '@/context/CartContext'

interface OrderSummaryProps {
  onNext?: () => void
  isMinimal?: boolean
}

export default function OrderSummary({ onNext, isMinimal = false }: OrderSummaryProps) {
  const { state: cartState } = useCart()

  return (
    <div>
      {!isMinimal && (
        <Typography variant="h6" sx={{ mb: 3 }}>
          Order Summary
        </Typography>
      )}

      <List disablePadding>
        {cartState.items.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            sx={{ 
              py: 2,
              gap: 2,
              '&:not(:last-child)': {
                borderBottom: '1px solid',
                borderColor: 'rgb(228, 228, 231)',
              },
            }}
          >
            {/* Product Image */}
            <ListItemAvatar sx={{ minWidth: isMinimal ? 48 : 80 }}>
              <div className={`relative ${isMinimal ? 'w-12 h-12' : 'w-20 h-20'}`}>
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                  sizes={isMinimal ? '48px' : '80px'}
                />
              </div>
            </ListItemAvatar>

            {/* Product Details */}
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  className="font-medium line-clamp-1"
                  sx={{ mb: 0.5 }}
                >
                  {item.name}
                </Typography>
              }
              secondary={
                <div className="space-y-1">
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    className="block"
                  >
                    {item.brand}
                  </Typography>
                  <div className="flex justify-between items-center">
                    <Typography variant="caption" color="text.secondary">
                      Qty: {item.quantity}
                    </Typography>
                    <Typography variant="body2" className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </div>
                </div>
              }
            />
          </ListItem>
        ))}
      </List>

      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-600">Subtotal</span>
          <span>${cartState.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-600">Shipping</span>
          <span>${cartState.shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-600">Tax</span>
          <span>${cartState.tax.toFixed(2)}</span>
        </div>

        <Divider />

        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>${cartState.total.toFixed(2)}</span>
        </div>
      </div>

      {!isMinimal && onNext && (
        <Box sx={{ mt: 4 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={onNext}
            sx={{
              bgcolor: 'black',
              py: 1.5,
              '&:hover': {
                bgcolor: 'rgb(28, 28, 28)',
              },
            }}
          >
            Continue to Shipping
          </Button>
        </Box>
      )}
    </div>
  )
} 