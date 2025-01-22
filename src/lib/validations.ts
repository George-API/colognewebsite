import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  brand: z.string().min(1, 'Brand is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0, 'Price must be greater than or equal to 0'),
  size: z.string().min(1, 'Size is required'),
  stock: z.number().int().min(0, 'Stock must be greater than or equal to 0'),
  mainImage: z.string().url('Main image must be a valid URL'),
  imageGallery: z.array(z.string().url('Gallery images must be valid URLs')),
  category: z.string().min(1, 'Category is required'),
  featured: z.boolean()
})

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5'),
  comment: z.string().optional(),
  userId: z.string().min(1, 'User ID is required'),
  productId: z.string().min(1, 'Product ID is required')
})

export const orderItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
})

export const orderSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  items: z.array(z.object({
    productId: z.string().min(1, 'Product ID is required'),
    quantity: z.number().int().positive('Quantity must be greater than 0'),
    price: z.number().min(0, 'Price must be greater than or equal to 0')
  })).min(1, 'Order must contain at least one item'),
  subtotal: z.number().min(0, 'Subtotal must be greater than or equal to 0'),
  tax: z.number().min(0, 'Tax must be greater than or equal to 0').optional(),
  shipping: z.number().min(0, 'Shipping must be greater than or equal to 0').optional(),
  total: z.number().min(0, 'Total must be greater than or equal to 0'),
  shippingAddress: z.string().min(1, 'Shipping address is required')
})

export function validateProduct(data: unknown) {
  return productSchema.parse(data);
}

export function validateOrder(data: unknown) {
  return orderSchema.parse(data);
}

export function validateReview(data: unknown) {
  return reviewSchema.parse(data);
}

export function validateProductSafe(data: unknown) {
  return productSchema.safeParse(data);
}

export function validateOrderSafe(data: unknown) {
  return orderSchema.safeParse(data);
}

export function validateReviewSafe(data: unknown) {
  return reviewSchema.safeParse(data);
} 