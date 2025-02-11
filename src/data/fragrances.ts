type Size = '1ml' | '5ml' | '10ml'

interface Fragrance {
  id: number
  name: string
  brand: string
  prices: Record<Size, number>
  description: string
  image: string
  category: 'Niche' | 'Designer' | 'Luxury'
  season: 'Spring' | 'Summer' | 'Fall' | 'Winter'
  subcategory: string
}

export const fragrances: Fragrance[] = [
  {
    id: 1,
    name: 'Enclave',
    brand: 'Amouage',
    prices: {
      '1ml': 12,
      '5ml': 25,
      '10ml': 40
    },
    description: 'A luxurious fragrance from the House of Amouage',
    image: '/images/fragrances/amouage-enclave.jpg',
    category: 'Niche',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  // ... Add more fragrances as needed
] 