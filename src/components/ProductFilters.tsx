'use client'

import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

interface FilterProps {
  onFilterChange: (filters: FilterState) => void
  initialFilters?: FilterState
}

interface FilterState {
  priceRange: [number, number]
  brands: string[]
  categories: string[]
  sizes: string[]
  inStock: boolean
  search: string
}

const INITIAL_FILTERS: FilterState = {
  priceRange: [0, 500],
  brands: [],
  categories: [],
  sizes: [],
  inStock: false,
  search: '',
}

const BRANDS = ['Tom Ford', 'Creed', 'Le Labo', 'Maison Francis Kurkdjian', 'Byredo']
const CATEGORIES = ['Niche', 'Designer', 'Vintage', 'Limited Edition']
const SIZES = ['2ml', '5ml', '10ml', '30ml', '50ml', '100ml']

export default function ProductFilters({ onFilterChange, initialFilters = INITIAL_FILTERS }: FilterProps) {
  const [filters, setFilters] = React.useState<FilterState>(initialFilters)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    const newFilters = { ...filters, priceRange: newValue as [number, number] }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleCheckboxChange = (category: keyof FilterState) => (value: string) => {
    const currentValues = filters[category] as string[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]
    
    const newFilters = { ...filters, [category]: newValues }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, search: event.target.value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleInStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, inStock: event.target.checked }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="space-y-4">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search fragrances..."
        value={filters.search}
        onChange={handleSearchChange}
        size="small"
        className="mb-6"
      />

      <Accordion 
        defaultExpanded={!isMobile} 
        className="shadow-none border border-zinc-200"
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary 
          expandIcon={<ExpandMore />}
          sx={{
            minHeight: { xs: 48, sm: 56 },
            '& .MuiAccordionSummary-content': {
              margin: { xs: '12px 0', sm: '14px 0' },
            },
          }}
        >
          <span className="font-medium text-sm sm:text-base">Price Range</span>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            value={filters.priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={500}
            sx={{
              color: 'black',
              '& .MuiSlider-thumb': {
                backgroundColor: 'black',
                width: { xs: 20, sm: 24 },
                height: { xs: 20, sm: 24 },
              },
              '& .MuiSlider-track': {
                backgroundColor: 'black',
                height: 2,
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#d4d4d4',
                height: 2,
              },
            }}
          />
          <div className="flex justify-between text-xs sm:text-sm text-zinc-600">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </AccordionDetails>
      </Accordion>

      {[
        { title: 'Brands', items: BRANDS, key: 'brands' as const },
        { title: 'Categories', items: CATEGORIES, key: 'categories' as const },
        { title: 'Sizes', items: SIZES, key: 'sizes' as const },
      ].map((section) => (
        <Accordion
          key={section.key}
          defaultExpanded={!isMobile}
          className="shadow-none border border-zinc-200"
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMore />}
            sx={{
              minHeight: { xs: 48, sm: 56 },
              '& .MuiAccordionSummary-content': {
                margin: { xs: '12px 0', sm: '14px 0' },
              },
            }}
          >
            <span className="font-medium text-sm sm:text-base">{section.title}</span>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {section.items.map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      checked={filters[section.key].includes(item)}
                      onChange={() => handleCheckboxChange(section.key)(item)}
                      sx={{
                        color: '#d4d4d4',
                        padding: { xs: '6px', sm: '9px' },
                        '&.Mui-checked': {
                          color: 'black',
                        },
                      }}
                    />
                  }
                  label={<span className="text-xs sm:text-sm">{item}</span>}
                  sx={{
                    marginY: { xs: 0.5, sm: 1 },
                  }}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      ))}

      <FormControlLabel
        control={
          <Checkbox
            checked={filters.inStock}
            onChange={handleInStockChange}
            sx={{
              color: '#d4d4d4',
              padding: { xs: '6px', sm: '9px' },
              '&.Mui-checked': {
                color: 'black',
              },
            }}
          />
        }
        label={<span className="text-xs sm:text-sm font-medium">In Stock Only</span>}
        sx={{
          marginY: { xs: 0.5, sm: 1 },
        }}
      />
    </div>
  )
} 