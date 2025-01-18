import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'
    const category = searchParams.get('category')
    const brand = searchParams.get('brand')

    const where = {
      ...(featured && { featured: true }),
      ...(category && { category }),
      ...(brand && { brand }),
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Products fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
} 