'use client'

import React from 'react'

interface FilterProps {
  onFilterChange: (filters: FilterState) => void
  initialFilters?: FilterState
}

interface FilterState {
  brands: string[]
  categories: string[]
  search: string
}

const INITIAL_FILTERS: FilterState = {
  brands: [],
  categories: [],
  search: '',
}

const BRANDS = ['Creed', 'Tom Ford', 'Maison Francis Kurkdjian', 'Parfums de Marly', 'Initio', 'Xerjoff']

const CATEGORIES = {
  Spring: ['Fresh & Clean', 'Floral & Light', 'Citrus Fresh'],
  Summer: ['Aquatic Fresh', 'Citrus & Light', 'Fresh Spicy'],
  Fall: ['Woody & Spicy', 'Oriental & Spicy', 'Sweet & Amber'],
  Winter: ['Warm & Spicy', 'Oriental Rich', 'Sweet & Intense']
}

export default function ProductFilters({ onFilterChange, initialFilters = INITIAL_FILTERS }: FilterProps) {
  const [filters, setFilters] = React.useState<FilterState>(initialFilters)

  const handleCheckboxChange = (type: 'brands' | 'categories', value: string) => {
    const currentValues = filters[type]
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]

    const newFilters = {
      ...filters,
      [type]: newValues
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, search: event.target.value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Search */}
      <div>
        <h3 className="text-sm font-medium mb-3 sm:mb-4">Search</h3>
        <input
          type="text"
          placeholder="Search fragrances..."
          value={filters.search}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
        />
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-sm font-medium mb-3 sm:mb-4">Brands</h3>
        <div className="space-y-2">
          {BRANDS.map(brand => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleCheckboxChange('brands', brand)}
                className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
              />
              <span className="ml-2 text-sm text-zinc-600">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium mb-3 sm:mb-4">Categories</h3>
        <div className="space-y-4 sm:space-y-6">
          {Object.entries(CATEGORIES).map(([season, categories]) => (
            <div key={season} className="space-y-2">
              <h4 className="text-sm font-medium text-zinc-800">{season}</h4>
              {categories.map(category => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCheckboxChange('categories', category)}
                    className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                  />
                  <span className="ml-2 text-sm text-zinc-600 leading-tight">{category}</span>
                </label>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 