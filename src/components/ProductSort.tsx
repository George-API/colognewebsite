'use client'

import React from 'react'
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material'

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'

interface ProductSortProps {
  onSortChange: (sort: SortOption) => void
  currentSort: SortOption
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
]

export default function ProductSort({ onSortChange, currentSort }: ProductSortProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onSortChange(event.target.value as SortOption)
  }

  return (
    <FormControl size="small" sx={{ minWidth: 200 }}>
      <Select
        value={currentSort}
        onChange={handleChange}
        displayEmpty
        sx={{
          '& .MuiSelect-select': {
            py: 1.5,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(228, 228, 231)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(161, 161, 170)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
          },
        }}
      >
        {sortOptions.map((option) => (
          <MenuItem 
            key={option.value} 
            value={option.value}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgb(244, 244, 245)',
                '&:hover': {
                  backgroundColor: 'rgb(228, 228, 231)',
                },
              },
              '&:hover': {
                backgroundColor: 'rgb(244, 244, 245)',
              },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
} 