import { NextResponse } from 'next/server'
import { fragrances } from '@/data/fragrances'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'
    const category = searchParams.get('category')
    const brand = searchParams.get('brand')

    let filteredProducts = [...fragrances]

    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category)
    }

    if (brand) {
      filteredProducts = filteredProducts.filter(p => p.brand === brand)
    }

    // For now, we'll consider all products as featured
    if (featured) {
      filteredProducts = filteredProducts.slice(0, 8)
    }

    return NextResponse.json(filteredProducts)
  } catch (error) {
    console.error('Products fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
} 