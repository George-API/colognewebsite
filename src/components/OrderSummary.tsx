'use client'

import React from 'react'
import {
  Paper,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material'

// This would typically come from your cart state management
const cartItems = [
  {
    id: 1,
    name: 'Aventus',
    brand: 'Creed',
    price: 435,
    size: '100ml',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Oud Wood',
    brand: 'Tom Ford',
    price: 399,
    size: '100ml',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&auto=format&fit=crop&q=80',
  },
]

export default function OrderSummary() {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 15
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + shipping + tax

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        backgroundColor: 'white',
        borderRadius: 1,
      }}
    >
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 400 }}>
        Order Summary
      </Typography>

      <List sx={{ mb: 3 }}>
        {cartItems.map((item) => (
          <ListItem key={item.id} alignItems="flex-start" sx={{ px: 0 }}>
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                src={item.image}
                alt={item.name}
                sx={{ width: 64, height: 64, borderRadius: 1 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {item.brand} · {item.size}
                  </Typography>
                  <Typography
                    component="div"
                    variant="body2"
                    sx={{ mt: 1 }}
                  >
                    Qty: {item.quantity}
                  </Typography>
                </React.Fragment>
              }
              sx={{ ml: 2 }}
            />
            <Typography variant="body1" sx={{ ml: 2 }}>
              ${item.price}
            </Typography>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ color: 'text.secondary' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Subtotal</Typography>
          <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Shipping</Typography>
          <Typography variant="body2">${shipping.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Tax</Typography>
          <Typography variant="body2">${tax.toFixed(2)}</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">${total.toFixed(2)}</Typography>
      </Box>
    </Paper>
  )
} 