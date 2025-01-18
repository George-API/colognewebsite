'use client'

import React from 'react'
import { Grid, Skeleton, Drawer, Button } from '@mui/material'
import { FilterList } from '@mui/icons-material'
import ProductCard from './ProductCard'
import ProductFilters from './ProductFilters'
import ProductSort, { SortOption } from './ProductSort'
import { Product } from '@prisma/client'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
}

export default function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  const [filteredProducts, setFilteredProducts] = React.useState(products)
  const [currentSort, setCurrentSort] = React.useState<SortOption>('featured')
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = React.useState(false)

  const handleFilterChange = (filters: any) => {
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

    // Apply sorting
    result = sortProducts(result, currentSort)

    setFilteredProducts(result)
  }

  const handleSortChange = (sort: SortOption) => {
    setCurrentSort(sort)
    setFilteredProducts(prev => sortProducts([...prev], sort))
  }

  const sortProducts = (products: Product[], sort: SortOption) => {
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
        return products.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      default:
        return products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <Button
          onClick={() => setIsFilterDrawerOpen(true)}
          startIcon={<FilterList />}
          variant="outlined"
          fullWidth
          sx={{
            borderColor: 'rgb(228, 228, 231)',
            color: 'black',
            '&:hover': {
              borderColor: 'black',
              backgroundColor: 'rgb(244, 244, 245)',
            },
          }}
        >
          Filters & Sort
        </Button>
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

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <ProductFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Products Section */}
        <div className="flex-1">
          {/* Desktop Sort Bar */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <p className="text-zinc-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
            <ProductSort
              currentSort={currentSort}
              onSortChange={handleSortChange}
            />
          </div>

          {/* Product Grid */}
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {isLoading
              ? Array.from(new Array(12)).map((_, index) => (
                  <Grid item xs={6} sm={6} md={4} key={index}>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={0}
                      sx={{
                        paddingTop: '100%',
                        bgcolor: 'rgb(244, 244, 245)',
                      }}
                    />
                    <Skeleton height={24} width="60%" sx={{ mt: 1 }} />
                    <Skeleton height={24} width="80%" />
                  </Grid>
                ))
              : filteredProducts.map((product) => (
                  <Grid item xs={6} sm={6} md={4} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
          </Grid>

          {/* Empty State */}
          {filteredProducts.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-zinc-600">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 