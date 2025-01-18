import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  brand: z.string().min(1, 'Brand is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be positive'),
  size: z.string().min(1, 'Size is required'),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  images: z.array(z.string().url()).min(1, 'At least one image is required'),
  category: z.string().min(1, 'Category is required'),
  featured: z.boolean().default(false),
})

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(3).optional(),
  productId: z.string().min(1),
})

export const orderItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
})

export const orderSchema = z.object({
  items: z.array(orderItemSchema).min(1),
  shippingAddress: z.string().min(10),
}) 