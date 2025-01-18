'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import { Filter } from 'lucide-react'
import { Button, Drawer } from '@mui/material'
import ProductFilters from '@/components/ProductFilters'
import ProductSort, { SortOption } from '@/components/ProductSort'

interface FilterState {
  priceRange: [number, number]
  brands: string[]
  categories: string[]
  sizes: string[]
  inStock: boolean
  search: string
}

const products = [
  {
    id: 1,
    name: 'Aventus',
    brand: 'Creed',
    price: 435,
    size: '100ml',
    category: 'Fruity & Rich',
    description: 'Pineapple, Birch, Ambergris, Black Currant',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80',
    stock: 10,
    featured: true,
  },
  {
    id: 2,
    name: 'Oud Wood',
    brand: 'Tom Ford',
    price: 399,
    size: '100ml',
    category: 'Woody & Spicy',
    description: 'Rare Oud Wood, Sandalwood, Chinese Pepper',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&auto=format&fit=crop&q=80',
    stock: 5,
    featured: false,
  },
  {
    id: 3,
    name: 'Baccarat Rouge 540',
    brand: 'Maison Francis Kurkdjian',
    price: 495,
    size: '70ml',
    category: 'Sweet & Amber',
    description: 'Saffron, Jasmine, Cedar, Ambergris',
    image: 'https://images.unsplash.com/photo-1592914610354-fd354ea45e48?w=800&auto=format&fit=crop&q=80',
    stock: 8,
    featured: true,
  },
  {
    id: 4,
    name: 'Black Phantom',
    brand: 'Kilian',
    price: 485,
    size: '50ml',
    category: 'Gourmand',
    description: 'Rum, Coffee, Sugar Cane, Dark Chocolate',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&auto=format&fit=crop&q=80',
    stock: 3,
    featured: false,
  },
  {
    id: 5,
    name: 'Layton',
    brand: 'Parfums de Marly',
    price: 335,
    size: '125ml',
    category: 'Fresh & Spicy',
    description: 'Bergamot, Lavender, Vanilla, Geranium',
    image: 'https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=800&auto=format&fit=crop&q=80',
    stock: 7,
    featured: true,
  },
  {
    id: 6,
    name: 'Reflection Man',
    brand: 'Amouage',
    price: 445,
    size: '100ml',
    category: 'Fresh & Floral',
    description: 'Rosemary, Jasmine, Neroli, Sandalwood',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=800&auto=format&fit=crop&q=80',
    stock: 2,
    featured: false,
  },
  {
    id: 7,
    name: 'Side Effect',
    brand: 'Initio',
    price: 395,
    size: '90ml',
    category: 'Sweet & Tobacco',
    description: 'Tobacco, Vanilla, Rum, Cinnamon',
    image: 'https://images.unsplash.com/photo-1524638067-feba7e8ed70f?w=800&auto=format&fit=crop&q=80',
    stock: 6,
    featured: true,
  },
  {
    id: 8,
    name: '40 Knots',
    brand: 'Xerjoff',
    price: 475,
    size: '100ml',
    category: 'Fresh & Woody',
    description: 'Sea Notes, Cedar, Ambergris, Musk',
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&auto=format&fit=crop&q=80',
    stock: 4,
    featured: false,
  }
]

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = React.useState(products)
  const [currentSort, setCurrentSort] = React.useState<SortOption>('featured')
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = React.useState(false)

  const handleFilterChange = (filters: FilterState) => {
    let result = [...products]

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      result = result.filter(
        product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
      )
    }

    // Apply price range filter
    result = result.filter(
      product =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    )

    // Apply brand filter
    if (filters.brands.length > 0) {
      result = result.filter(product =>
        filters.brands.includes(product.brand)
      )
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(product =>
        filters.categories.includes(product.category)
      )
    }

    // Apply size filter
    if (filters.sizes.length > 0) {
      result = result.filter(product =>
        filters.sizes.includes(product.size)
      )
    }

    // Apply in stock filter
    if (filters.inStock) {
      result = result.filter(product => product.stock > 0)
    }

    // Apply current sort
    result = sortProducts(result, currentSort)

    setFilteredProducts(result)
  }

  const handleSortChange = (sort: SortOption) => {
    setCurrentSort(sort)
    setFilteredProducts(prev => sortProducts([...prev], sort))
  }

  const sortProducts = (products: typeof filteredProducts, sort: SortOption) => {
    switch (sort) {
      case 'price-asc':
        return products.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return products.sort((a, b) => b.price - a.price)
      case 'name-asc':
        return products.sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc':
        return products.sort((a, b) => b.name.localeCompare(a.name))
      case 'newest':
        return products // In a real app, we'd sort by createdAt
      default: // 'featured'
        return products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
  }

  return (
    <main>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-light mb-2">All Fragrances</h1>
            <p className="text-zinc-500">Discover our curated collection of luxury fragrances</p>
          </div>
          
          {/* Mobile Filter Button */}
          <div className="lg:hidden flex items-center gap-4">
            <Button
              onClick={() => setIsFilterDrawerOpen(true)}
              startIcon={<Filter className="h-4 w-4" />}
              sx={{
                color: 'black',
                borderColor: 'rgb(228, 228, 231)',
                '&:hover': {
                  borderColor: 'black',
                  backgroundColor: 'rgb(244, 244, 245)',
                },
              }}
            >
              Filters & Sort
            </Button>
          </div>

          {/* Desktop Sort */}
          <div className="hidden lg:block">
            <ProductSort
              currentSort={currentSort}
              onSortChange={handleSortChange}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilters onFilterChange={handleFilterChange} />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="group">
                  <div className="aspect-square bg-zinc-50 relative mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                        <span className="text-sm font-medium text-zinc-900">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-zinc-500">{product.brand}</p>
                    <h3 className="font-medium group-hover:text-zinc-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-zinc-600">{product.description}</p>
                    <div className="flex justify-between items-center pt-2">
                      <p className="font-medium">${product.price}</p>
                      <p className="text-sm text-zinc-500">{product.size}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-zinc-600">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <Drawer
          anchor="left"
          open={isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: '100%',
              maxWidth: '320px',
              px: 2,
              py: 3,
            },
          }}
        >
          <div className="space-y-6">
            <h2 className="text-lg font-medium">Filters</h2>
            <ProductFilters onFilterChange={handleFilterChange} />
            <div className="mt-6 border-t pt-6">
              <h2 className="text-lg font-medium mb-4">Sort By</h2>
              <ProductSort
                currentSort={currentSort}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
        </Drawer>
      </div>
    </main>
  )
} 