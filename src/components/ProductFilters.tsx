'use client'

import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { ChevronDown } from 'lucide-react'

interface FilterState {
  brands: string[]
  categories: string[]
  seasons: string[]
  subcategories: string[]
  search: string
}

interface Props {
  onFilterChange: (filters: FilterState) => void
}

const BRANDS = [
  'Amouage',
  'Bond No. 9',
  'Byredo',
  'Commodity',
  'D.S. & Durga',
  'Giardini Di Toscana',
  'Initio',
  'Kilian',
  'Le Labo',
  'M. Micallef',
  'Maison Margiela',
  'Orto Parisi',
  'Parfums De Marly',
  'Penhaligon\'s',
  'Tom Ford',
  'Xerjoff'
]

const CATEGORIES = ['Niche', 'Designer', 'Luxury']

const SEASONAL_CATEGORIES = {
  Spring: ['Fresh & Clean', 'Floral & Light', 'Citrus Fresh'],
  Summer: ['Aquatic Fresh', 'Citrus & Light', 'Fresh Spicy'],
  Fall: ['Woody & Spicy', 'Oriental & Spicy', 'Sweet & Amber'],
  Winter: ['Warm & Spicy', 'Oriental Rich', 'Sweet & Intense']
} as const

export default function ProductFilters({ onFilterChange }: Props) {
  const [filters, setFilters] = React.useState<FilterState>({
    brands: [],
    categories: [],
    seasons: [],
    subcategories: [],
    search: ''
  })

  const handleFilterChange = (type: keyof FilterState, value: string) => {
    const newFilters = { ...filters }
    
    if (type === 'search') {
      newFilters.search = value
    } else {
      const array = newFilters[type] as string[]
      const index = array.indexOf(value)
      
      if (index === -1) {
        array.push(value)
      } else {
        array.splice(index, 1)
      }
    }
    
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
          className="w-full px-3 py-2 border border-zinc-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </div>

      {/* Brands */}
      <Accordion defaultExpanded>
        <AccordionSummary 
          expandIcon={<ChevronDown className="h-5 w-5" />}
          className="px-0"
        >
          <h3 className="text-sm font-medium">Brands</h3>
        </AccordionSummary>
        <AccordionDetails className="px-0 pt-2">
          <div className="space-y-2">
            {BRANDS.map((brand) => (
              <label key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleFilterChange('brands', brand)}
                  className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                />
                <span className="ml-2 text-sm">{brand}</span>
              </label>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Categories */}
      <Accordion defaultExpanded>
        <AccordionSummary 
          expandIcon={<ChevronDown className="h-5 w-5" />}
          className="px-0"
        >
          <h3 className="text-sm font-medium">Categories</h3>
        </AccordionSummary>
        <AccordionDetails className="px-0 pt-2">
          <div className="space-y-2">
            {CATEGORIES.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleFilterChange('categories', category)}
                  className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                />
                <span className="ml-2 text-sm">{category}</span>
              </label>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Seasonal Categories */}
      <Accordion defaultExpanded>
        <AccordionSummary 
          expandIcon={<ChevronDown className="h-5 w-5" />}
          className="px-0"
        >
          <h3 className="text-sm font-medium">Seasonal Categories</h3>
        </AccordionSummary>
        <AccordionDetails className="px-0 pt-2">
          <div className="space-y-6">
            {Object.entries(SEASONAL_CATEGORIES).map(([season, subcategories]) => (
              <div key={season} className="space-y-2">
                <label className="flex items-center font-medium">
                  <input
                    type="checkbox"
                    checked={filters.seasons.includes(season)}
                    onChange={() => handleFilterChange('seasons', season)}
                    className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                  />
                  <span className="ml-2 text-sm">{season}</span>
                </label>
                <div className="ml-6 space-y-2">
                  {subcategories.map((subcategory) => (
                    <label key={subcategory} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.subcategories.includes(subcategory)}
                        onChange={() => handleFilterChange('subcategories', subcategory)}
                        className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                      />
                      <span className="ml-2 text-sm">{subcategory}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
} 