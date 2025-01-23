'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { Filter, X } from 'lucide-react'
import { Button, Drawer } from '@mui/material'
import ProductFilters from '@/components/ProductFilters'
import ProductSort, { SortOption } from '@/components/ProductSort'

type Size = '1ml' | '5ml' | '10ml'

interface Fragrance {
  id: number
  name: string
  brand: string
  prices: Record<Size, number>
  description: string
  image: string
  category: string
}

interface FilterState {
  brands: string[]
  categories: string[]
  search: string
}

const fragrances: Fragrance[] = [
  {
    id: 1,
    name: 'Aventus',
    brand: 'Creed',
    prices: {
      '1ml': 12.99,
      '5ml': 49.99,
      '10ml': 89.99
    },
    description: 'A timeless blend of fruity and woody notes',
    image: '/products/cologne1.jpg',
    category: 'Fruity & Rich'
  },
  {
    id: 2,
    name: 'Oud Wood',
    brand: 'Tom Ford',
    prices: {
      '1ml': 11.99,
      '5ml': 45.99,
      '10ml': 85.99
    },
    description: 'Rare, exotic, distinctive',
    image: '/products/cologne2.jpg',
    category: 'Woody & Spicy'
  },
  {
    id: 3,
    name: 'Baccarat Rouge 540',
    brand: 'Maison Francis Kurkdjian',
    prices: {
      '1ml': 13.99,
      '5ml': 52.99,
      '10ml': 95.99
    },
    description: 'A masterful blend of jasmine and woody notes',
    image: '/products/cologne3.jpg',
    category: 'Sweet & Amber'
  }
]

const SIZES: Size[] = ['1ml', '5ml', '10ml']

export default function FragrancesPage() {
  const [selectedSizes, setSelectedSizes] = React.useState<Record<number, Size>>({})
  const [filteredProducts, setFilteredProducts] = React.useState(fragrances)
  const [currentSort, setCurrentSort] = React.useState<SortOption>('featured')
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = React.useState(false)

  const handleSizeSelect = (fragranceId: number, size: Size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [fragranceId]: size
    }))
  }

  const handleFilterChange = (filters: FilterState) => {
    let result = [...fragrances]

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      result = result.filter(
        fragrance =>
          fragrance.name.toLowerCase().includes(searchTerm) ||
          fragrance.brand.toLowerCase().includes(searchTerm) ||
          fragrance.description.toLowerCase().includes(searchTerm)
      )
    }

    // Apply brand filter
    if (filters.brands.length > 0) {
      result = result.filter(fragrance =>
        filters.brands.includes(fragrance.brand)
      )
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(fragrance =>
        filters.categories.includes(fragrance.category)
      )
    }

    // Apply current sort
    result = sortProducts(result, currentSort)

    setFilteredProducts(result)
  }

  const handleSortChange = (sort: SortOption) => {
    setCurrentSort(sort)
    setFilteredProducts(prev => sortProducts([...prev], sort))
  }

  const sortProducts = (products: typeof fragrances, sort: SortOption) => {
    switch (sort) {
      case 'price-asc':
        return products.sort((a, b) => a.prices['1ml'] - b.prices['1ml'])
      case 'price-desc':
        return products.sort((a, b) => b.prices['1ml'] - a.prices['1ml'])
      case 'name-asc':
        return products.sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc':
        return products.sort((a, b) => b.name.localeCompare(a.name))
      case 'newest':
        return products // In a real app, we'd sort by createdAt
      default: // 'featured'
        return products
    }
  }

  return (
    <main className="bg-[#fafafa]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-light mb-4 sm:mb-6 text-white">Our Fragrances</h1>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl">
            Explore our collection of premium fragrance decants
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Button
              onClick={() => setIsFilterDrawerOpen(true)}
              startIcon={<Filter className="h-4 w-4" />}
              variant="outlined"
              sx={{
                color: 'rgb(24, 24, 27)',
                borderColor: 'rgb(228, 228, 231)',
                textTransform: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  borderColor: 'rgb(24, 24, 27)',
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {filteredProducts.map((fragrance) => (
                <div key={fragrance.id} className="bg-white p-4 sm:p-6 lg:p-8 group">
                  <div className="relative aspect-square mb-6 sm:mb-8 bg-zinc-100 overflow-hidden">
                    <Image
                      src={fragrance.image}
                      alt={fragrance.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mb-4">
                    <h3 className="text-sm text-zinc-600 mb-1">{fragrance.brand}</h3>
                    <h2 className="text-xl sm:text-2xl font-light">{fragrance.name}</h2>
                  </div>
                  <p className="text-zinc-600 mb-6">{fragrance.description}</p>
                  
                  {/* Size Selection */}
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      {SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeSelect(fragrance.id, size)}
                          className={`flex-1 py-2 px-2 sm:px-4 border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 ${
                            selectedSizes[fragrance.id] === size
                              ? 'border-zinc-900 bg-zinc-900 text-white'
                              : 'border-zinc-200 hover:border-zinc-900'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-base sm:text-lg font-medium">
                        ${selectedSizes[fragrance.id] 
                          ? fragrance.prices[selectedSizes[fragrance.id]]
                          : fragrance.prices['1ml']}
                      </div>
                      {selectedSizes[fragrance.id] && (
                        <button 
                          className="text-sm text-zinc-900 hover:text-zinc-600 transition-colors"
                          onClick={() => {
                            const newSizes = { ...selectedSizes }
                            delete newSizes[fragrance.id]
                            setSelectedSizes(newSizes)
                          }}
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>

                  <Link 
                    href={`/fragrances/${fragrance.id}`}
                    className="inline-block mt-6 text-sm text-zinc-900 hover:text-zinc-600 transition-colors"
                  >
                    VIEW DETAILS →
                  </Link>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-8 sm:py-12">
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
              backgroundColor: '#fafafa',
            },
          }}
          SlideProps={{
            timeout: 300,
          }}
        >
          <div className="min-h-screen flex flex-col">
            {/* Drawer Header */}
            <div className="sticky top-0 bg-white border-b border-zinc-200 px-4 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-zinc-900">Filters</h2>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="p-2 -mr-2 text-zinc-500 hover:text-zinc-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <ProductFilters onFilterChange={handleFilterChange} />
              <div className="mt-8 pt-8 border-t border-zinc-200">
                <h2 className="text-lg font-medium mb-4 text-zinc-900">Sort By</h2>
                <ProductSort
                  currentSort={currentSort}
                  onSortChange={(sort) => {
                    handleSortChange(sort);
                    setIsFilterDrawerOpen(false);
                  }}
                />
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="sticky bottom-0 bg-white border-t border-zinc-200 p-4">
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-full bg-zinc-900 text-white py-2.5 px-4 text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                View Results
              </button>
            </div>
          </div>
        </Drawer>
      </div>
    </main>
  )
} 