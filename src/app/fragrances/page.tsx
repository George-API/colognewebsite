'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { Filter, X, ShoppingCart } from 'lucide-react'
import { Button, Drawer, Snackbar, Alert } from '@mui/material'
import ProductFilters from '@/components/ProductFilters'
import ProductSort, { SortOption } from '@/components/ProductSort'
import { useCart } from '@/context/CartContext'

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

interface FilterState {
  brands: string[]
  categories: string[]
  seasons: string[]
  subcategories: string[]
  search: string
}

const CATEGORIES = ['All', 'Niche', 'Designer', 'Vintage', 'Limited Edition']

const fragrances: Fragrance[] = [
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
  {
    id: 2,
    name: 'Figment Man',
    brand: 'Amouage',
    prices: {
      '1ml': 13,
      '5ml': 31,
      '10ml': 52
    },
    description: 'An artistic expression in fragrance form',
    image: '/images/fragrances/amouage-figment-man.jpg',
    category: 'Niche',
    season: 'Spring',
    subcategory: 'Floral & Light'
  },
  {
    id: 3,
    name: 'Interlude Man',
    brand: 'Amouage',
    prices: {
      '1ml': 12,
      '5ml': 25,
      '10ml': 40
    },
    description: 'A chaotic interlude leads to creative discord',
    image: '/images/fragrances/amouage-interlude-man.jpg',
    category: 'Niche',
    season: 'Winter',
    subcategory: 'Warm & Spicy'
  },
  {
    id: 4,
    name: 'Lyric Man',
    brand: 'Amouage',
    prices: {
      '1ml': 12,
      '5ml': 25,
      '10ml': 40
    },
    description: 'A lyrical interpretation of rose for men',
    image: '/images/fragrances/amouage-lyric-man.jpg',
    category: 'Niche',
    season: 'Winter',
    subcategory: 'Warm & Spicy'
  },
  {
    id: 5,
    name: 'Bryant Park',
    brand: 'Bond No. 9',
    prices: {
      '1ml': 12,
      '5ml': 25,
      '10ml': 40
    },
    description: 'A tribute to New York\'s fashion epicenter',
    image: '/products/cologne5.jpg',
    category: 'Niche',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 6,
    name: 'Madison Square Park',
    brand: 'Bond No. 9',
    prices: {
      '1ml': 12,
      '5ml': 25,
      '10ml': 40
    },
    description: 'Captures the essence of Madison Square Park',
    image: '/products/cologne6.jpg',
    category: 'Niche',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 7,
    name: 'De Los Santos',
    brand: 'Byredo',
    prices: {
      '1ml': 12,
      '5ml': 25,
      '10ml': 40
    },
    description: 'A spiritual journey in fragrance form',
    image: '/products/cologne7.jpg',
    category: 'Niche',
    season: 'Spring',
    subcategory: 'Floral & Light'
  },
  {
    id: 8,
    name: 'Mixed Emotions',
    brand: 'Byredo',
    prices: {
      '1ml': 12,
      '5ml': 25,
      '10ml': 40
    },
    description: 'A fragrance that embodies the tumultuous nature of our times',
    image: '/products/cologne8.jpg',
    category: 'Niche',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 9,
    name: 'Paper +',
    brand: 'Commodity',
    prices: {
      '1ml': 12,
      '5ml': 25,
      '10ml': 40
    },
    description: 'A modern interpretation of paper and literary inspiration',
    image: '/products/cologne9.jpg',
    category: 'Niche',
    season: 'Spring',
    subcategory: 'Floral & Light'
  },
  {
    id: 10,
    name: 'Coriander',
    brand: 'D.S. & Durga',
    prices: {
      '1ml': 11,
      '5ml': 23,
      '10ml': 36
    },
    description: 'A spicy aromatic journey through ancient trade routes',
    image: '/products/cologne10.jpg',
    category: 'Niche',
    season: 'Spring',
    subcategory: 'Fresh & Clean'
  },
  {
    id: 11,
    name: 'Cowboy Grass',
    brand: 'D.S. & Durga',
    prices: {
      '1ml': 11,
      '5ml': 23,
      '10ml': 36
    },
    description: 'A rugged blend of wild herbs and prairie grasses',
    image: '/products/cologne11.jpg',
    category: 'Niche',
    season: 'Fall',
    subcategory: 'Woody & Spicy'
  },
  {
    id: 12,
    name: 'Bianco Latte',
    brand: 'Giardini Di Toscana',
    prices: {
      '1ml': 12,
      '5ml': 25,
      '10ml': 40
    },
    description: 'A creamy, comforting fragrance inspired by Italian elegance',
    image: '/products/cologne12.jpg',
    category: 'Niche',
    season: 'Spring',
    subcategory: 'Floral & Light'
  },
  {
    id: 13,
    name: 'Absolute Aphrodisiac',
    brand: 'Initio',
    prices: {
      '1ml': 12,
      '5ml': 27,
      '10ml': 42
    },
    description: 'A seductive blend of precious ingredients',
    image: '/products/cologne13.jpg',
    category: 'Niche',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 14,
    name: 'Blessed Baraka',
    brand: 'Initio',
    prices: {
      '1ml': 12,
      '5ml': 26,
      '10ml': 41
    },
    description: 'A blessed union of sacred ingredients',
    image: '/products/cologne14.jpg',
    category: 'Niche',
    season: 'Spring',
    subcategory: 'Floral & Light'
  },
  {
    id: 15,
    name: 'Oud For Greatness',
    brand: 'Initio',
    prices: {
      '1ml': 12,
      '5ml': 28,
      '10ml': 46
    },
    description: 'A majestic interpretation of precious oud',
    image: '/products/cologne15.jpg',
    category: 'Luxury',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 16,
    name: 'Rehab',
    brand: 'Initio',
    prices: {
      '1ml': 12,
      '5ml': 26,
      '10ml': 41
    },
    description: 'A therapeutic blend of comforting notes',
    image: '/products/cologne16.jpg',
    category: 'Luxury',
    season: 'Spring',
    subcategory: 'Fresh & Clean'
  },
  {
    id: 17,
    name: 'Side Effect',
    brand: 'Initio',
    prices: {
      '1ml': 12,
      '5ml': 28,
      '10ml': 46
    },
    description: 'An addictive composition of rich ingredients',
    image: '/products/cologne17.jpg',
    category: 'Luxury',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 18,
    name: 'Black Phantom',
    brand: 'Kilian',
    prices: {
      '1ml': 12,
      '5ml': 28,
      '10ml': 46
    },
    description: 'A dark and mysterious blend of coffee and rum',
    image: '/products/cologne18.jpg',
    category: 'Niche',
    season: 'Winter',
    subcategory: 'Warm & Spicy'
  },
  {
    id: 19,
    name: "L'Heure Verte",
    brand: 'Kilian',
    prices: {
      '1ml': 12,
      '5ml': 28,
      '10ml': 46
    },
    description: 'A tribute to the Parisian absinthe hour',
    image: '/products/cologne19.jpg',
    category: 'Niche',
    season: 'Spring',
    subcategory: 'Fresh & Clean'
  },
  {
    id: 20,
    name: 'Moonlight In Heaven',
    brand: 'Kilian',
    prices: {
      '1ml': 12,
      '5ml': 28,
      '10ml': 46
    },
    description: 'A celestial journey through exotic fruits and flowers',
    image: '/products/cologne20.jpg',
    category: 'Luxury',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 21,
    name: 'Santal 33',
    brand: 'Le Labo',
    prices: {
      '1ml': 12,
      '5ml': 27,
      '10ml': 42
    },
    description: 'An iconic sandalwood fragrance',
    image: '/products/cologne21.jpg',
    category: 'Niche',
    season: 'Spring',
    subcategory: 'Fresh & Clean'
  },
  {
    id: 22,
    name: 'DesirToxic',
    brand: 'M. Micallef',
    prices: {
      '1ml': 12,
      '5ml': 23,
      '10ml': 36
    },
    description: 'An intoxicating blend of desire',
    image: '/products/cologne22.jpg',
    category: 'Niche',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 23,
    name: 'EdenFalls',
    brand: 'M. Micallef',
    prices: {
      '1ml': 12,
      '5ml': 23,
      '10ml': 36
    },
    description: 'A paradise-inspired aquatic fragrance',
    image: '/products/cologne23.jpg',
    category: 'Niche',
    season: 'Summer',
    subcategory: 'Aquatic Fresh'
  },
  {
    id: 24,
    name: 'Osaito',
    brand: 'M. Micallef',
    prices: {
      '1ml': 12,
      '5ml': 23,
      '10ml': 36
    },
    description: 'An oriental journey through exotic spices',
    image: '/products/cologne24.jpg',
    category: 'Luxury',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 25,
    name: 'Coffee Break',
    brand: 'Maison Margiela',
    prices: {
      '1ml': 11,
      '5ml': 23,
      '10ml': 36
    },
    description: 'A comforting blend of coffee and sweet notes',
    image: '/products/cologne25.jpg',
    category: 'Designer',
    season: 'Spring',
    subcategory: 'Fresh & Clean'
  },
  {
    id: 26,
    name: 'Megamare',
    brand: 'Orto Parisi',
    prices: {
      '1ml': 13,
      '5ml': 32,
      '10ml': 54
    },
    description: 'A powerful marine fragrance',
    image: '/products/cologne26.jpg',
    category: 'Niche',
    season: 'Summer',
    subcategory: 'Aquatic Fresh'
  },
  {
    id: 27,
    name: 'Carlisle',
    brand: 'Parfums De Marly',
    prices: {
      '1ml': 12,
      '5ml': 27,
      '10ml': 42
    },
    description: 'A royal blend of vanilla and precious woods',
    image: '/products/cologne27.jpg',
    category: 'Niche',
    season: 'Spring',
    subcategory: 'Floral & Light'
  },
  {
    id: 28,
    name: 'Galloway',
    brand: 'Parfums De Marly',
    prices: {
      '1ml': 12,
      '5ml': 23,
      '10ml': 36
    },
    description: 'A fresh and citrusy composition',
    image: '/products/cologne28.jpg',
    category: 'Niche',
    season: 'Spring',
    subcategory: 'Fresh & Clean'
  },
  {
    id: 29,
    name: 'Godolphin',
    brand: 'Parfums De Marly',
    prices: {
      '1ml': 12,
      '5ml': 23,
      '10ml': 36
    },
    description: 'A sophisticated leather and tobacco blend',
    image: '/products/cologne29.jpg',
    category: 'Luxury',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 30,
    name: 'Greenley',
    brand: 'Parfums De Marly',
    prices: {
      '1ml': 12,
      '5ml': 23,
      '10ml': 36
    },
    description: 'A fresh and green aromatic fragrance',
    image: '/products/cologne30.jpg',
    category: 'Luxury',
    season: 'Spring',
    subcategory: 'Fresh & Clean'
  },
  {
    id: 31,
    name: 'Herod',
    brand: 'Parfums De Marly',
    prices: {
      '1ml': 12,
      '5ml': 26,
      '10ml': 41
    },
    description: 'A rich tobacco vanilla masterpiece',
    image: '/products/cologne31.jpg',
    category: 'Luxury',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 32,
    name: 'Layton',
    brand: 'Parfums De Marly',
    prices: {
      '1ml': 12,
      '5ml': 23,
      '10ml': 36
    },
    description: 'A regal blend of apple and vanilla',
    image: '/products/cologne32.jpg',
    category: 'Luxury',
    season: 'Spring',
    subcategory: 'Floral & Light'
  },
  {
    id: 33,
    name: 'Layton Exclusif',
    brand: 'Parfums De Marly',
    prices: {
      '1ml': 12,
      '5ml': 28,
      '10ml': 44
    },
    description: 'An intense and luxurious interpretation of Layton',
    image: '/products/cologne33.jpg',
    category: 'Luxury',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 34,
    name: 'Pegasus',
    brand: 'Parfums De Marly',
    prices: {
      '1ml': 12,
      '5ml': 23,
      '10ml': 36
    },
    description: 'An elegant almond and vanilla composition',
    image: '/products/cologne34.jpg',
    category: 'Luxury',
    season: 'Spring',
    subcategory: 'Fresh & Clean'
  },
  {
    id: 35,
    name: 'Pegasus Exclusif',
    brand: 'Parfums De Marly',
    prices: {
      '1ml': 12,
      '5ml': 28,
      '10ml': 44
    },
    description: 'A more intense and refined version of Pegasus',
    image: '/products/cologne35.jpg',
    category: 'Luxury',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 36,
    name: 'Sedley',
    brand: 'Parfums De Marly',
    prices: {
      '1ml': 12,
      '5ml': 23,
      '10ml': 36
    },
    description: 'A fresh and elegant citrus fragrance',
    image: '/products/cologne36.jpg',
    category: 'Luxury',
    season: 'Spring',
    subcategory: 'Fresh & Clean'
  },
  {
    id: 37,
    name: 'Blazing Mr. Sam',
    brand: 'Penhaligon\'s',
    prices: {
      '1ml': 15,
      '5ml': 34,
      '10ml': 59
    },
    description: 'A charismatic and spicy oriental fragrance',
    image: '/products/cologne37.jpg',
    category: 'Niche',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 38,
    name: 'Terrible Teddy',
    brand: 'Penhaligon\'s',
    prices: {
      '1ml': 15,
      '5ml': 34,
      '10ml': 59
    },
    description: 'A leather-based fragrance with a rebellious spirit',
    image: '/products/cologne38.jpg',
    category: 'Luxury',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 39,
    name: 'Bois Marocain',
    brand: 'Tom Ford',
    prices: {
      '1ml': 12,
      '5ml': 28,
      '10ml': 44
    },
    description: 'An exotic woody fragrance inspired by Morocco',
    image: '/products/cologne39.jpg',
    category: 'Designer',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 40,
    name: 'Costa Azzura (PB)',
    brand: 'Tom Ford',
    prices: {
      '1ml': 12,
      '5ml': 28,
      '10ml': 44
    },
    description: 'A fresh aquatic scent of the Mediterranean',
    image: '/products/cologne40.jpg',
    category: 'Designer',
    season: 'Summer',
    subcategory: 'Aquatic Fresh'
  },
  {
    id: 41,
    name: 'Fucking Fabulous',
    brand: 'Tom Ford',
    prices: {
      '1ml': 12,
      '5ml': 28,
      '10ml': 44
    },
    description: 'A provocative and luxurious leather fragrance',
    image: '/products/cologne41.jpg',
    category: 'Designer',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 42,
    name: 'Mandarino Di Amalfi',
    brand: 'Tom Ford',
    prices: {
      '1ml': 12,
      '5ml': 28,
      '10ml': 44
    },
    description: 'A bright citrus scent inspired by the Amalfi coast',
    image: '/products/cologne42.jpg',
    category: 'Designer',
    season: 'Summer',
    subcategory: 'Citrus & Light'
  },
  {
    id: 43,
    name: 'Neroli Portofino',
    brand: 'Tom Ford',
    prices: {
      '1ml': 12,
      '5ml': 28,
      '10ml': 44
    },
    description: 'A fresh aromatic blend of citrus and florals',
    image: '/products/cologne43.jpg',
    category: 'Designer',
    season: 'Spring',
    subcategory: 'Fresh & Clean'
  },
  {
    id: 44,
    name: 'Noir de Noir',
    brand: 'Tom Ford',
    prices: {
      '1ml': 12,
      '5ml': 28,
      '10ml': 44
    },
    description: 'A dark and sensual rose and truffle blend',
    image: '/products/cologne44.jpg',
    category: 'Designer',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 45,
    name: 'Oud Wood',
    brand: 'Tom Ford',
    prices: {
      '1ml': 12,
      '5ml': 28,
      '10ml': 44
    },
    description: 'An exotic blend of rare oud wood and spices',
    image: '/products/cologne45.jpg',
    category: 'Designer',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 46,
    name: 'Rose D\'Amalfi',
    brand: 'Tom Ford',
    prices: {
      '1ml': 12,
      '5ml': 28,
      '10ml': 44
    },
    description: 'A romantic rose fragrance inspired by the Amalfi coast',
    image: '/products/cologne46.jpg',
    category: 'Designer',
    season: 'Spring',
    subcategory: 'Floral & Light'
  },
  {
    id: 47,
    name: 'Rose Prick',
    brand: 'Tom Ford',
    prices: {
      '1ml': 12,
      '5ml': 28,
      '10ml': 44
    },
    description: 'A thorny rose garden in full bloom',
    image: '/products/cologne47.jpg',
    category: 'Designer',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 48,
    name: 'Tobacco Vanille',
    brand: 'Tom Ford',
    prices: {
      '1ml': 13,
      '5ml': 32,
      '10ml': 54
    },
    description: 'An opulent blend of tobacco leaf and aromatic spices',
    image: '/products/cologne48.jpg',
    category: 'Designer',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 49,
    name: 'Vanille Fatale',
    brand: 'Tom Ford',
    prices: {
      '1ml': 13,
      '5ml': 32,
      '10ml': 54
    },
    description: 'A dark and mysterious vanilla fragrance',
    image: '/products/cologne49.jpg',
    category: 'Designer',
    season: 'Spring',
    subcategory: 'Fresh & Clean'
  },
  {
    id: 50,
    name: 'White Suede',
    brand: 'Tom Ford',
    prices: {
      '1ml': 12,
      '5ml': 28,
      '10ml': 44
    },
    description: 'A soft and sensual leather fragrance',
    image: '/products/cologne50.jpg',
    category: 'Designer',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 51,
    name: '40 Knots',
    brand: 'Xerjoff',
    prices: {
      '1ml': 12,
      '5ml': 25,
      '10ml': 40
    },
    description: 'A marine fragrance inspired by sailing adventures',
    image: '/products/cologne51.jpg',
    category: 'Niche',
    season: 'Summer',
    subcategory: 'Aquatic Fresh'
  },
  {
    id: 52,
    name: 'Alexandria II',
    brand: 'Xerjoff',
    prices: {
      '1ml': 13,
      '5ml': 32,
      '10ml': 54
    },
    description: 'A majestic oriental fragrance fit for royalty',
    image: '/products/cologne52.jpg',
    category: 'Niche',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 53,
    name: 'Decas',
    brand: 'Xerjoff',
    prices: {
      '1ml': 12,
      '5ml': 25,
      '10ml': 40
    },
    description: 'A celebration of refined elegance',
    image: '/products/cologne53.jpg',
    category: 'Luxury',
    season: 'Spring',
    subcategory: 'Fresh & Clean'
  },
  {
    id: 54,
    name: 'Erba Pura',
    brand: 'Xerjoff',
    prices: {
      '1ml': 12,
      '5ml': 25,
      '10ml': 40
    },
    description: 'A vibrant and fruity Italian fragrance',
    image: '/products/cologne54.jpg',
    category: 'Luxury',
    season: 'Summer',
    subcategory: 'Citrus & Light'
  },
  {
    id: 55,
    name: 'Kobe',
    brand: 'Xerjoff',
    prices: {
      '1ml': 12,
      '5ml': 28,
      '10ml': 46
    },
    description: 'An homage to Japanese refinement',
    image: '/products/cologne55.jpg',
    category: 'Luxury',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 56,
    name: 'Mamluk',
    brand: 'Xerjoff',
    prices: {
      '1ml': 12,
      '5ml': 28,
      '10ml': 46
    },
    description: 'A rich oriental fragrance with coffee and amber',
    image: '/products/cologne56.jpg',
    category: 'Luxury',
    season: 'Spring',
    subcategory: 'Fresh & Clean'
  },
  {
    id: 57,
    name: 'More Than Words',
    brand: 'Xerjoff',
    prices: {
      '1ml': 12,
      '5ml': 25,
      '10ml': 40
    },
    description: 'A poetic expression in fragrance form',
    image: '/products/cologne57.jpg',
    category: 'Luxury',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 58,
    name: 'Naxos',
    brand: 'Xerjoff',
    prices: {
      '1ml': 12,
      '5ml': 28,
      '10ml': 46
    },
    description: 'A journey to the Greek islands in a bottle',
    image: '/products/cologne58.jpg',
    category: 'Luxury',
    season: 'Spring',
    subcategory: 'Fresh & Clean'
  },
  {
    id: 59,
    name: 'Renaissance',
    brand: 'Xerjoff',
    prices: {
      '1ml': 12,
      '5ml': 25,
      '10ml': 40
    },
    description: 'A rebirth of classical perfumery',
    image: '/products/cologne59.jpg',
    category: 'Luxury',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  },
  {
    id: 60,
    name: 'Starlight',
    brand: 'Xerjoff',
    prices: {
      '1ml': 13,
      '5ml': 31,
      '10ml': 52
    },
    description: 'A celestial blend of precious ingredients',
    image: '/products/cologne60.jpg',
    category: 'Luxury',
    season: 'Spring',
    subcategory: 'Fresh & Clean'
  },
  {
    id: 61,
    name: 'Zefiro',
    brand: 'Xerjoff',
    prices: {
      '1ml': 12,
      '5ml': 25,
      '10ml': 40
    },
    description: 'A gentle breeze of oriental spices',
    image: '/products/cologne61.jpg',
    category: 'Luxury',
    season: 'Fall',
    subcategory: 'Oriental & Spicy'
  }
]

const SIZES: Size[] = ['1ml', '5ml', '10ml']

export default function FragrancesPage() {
  const [selectedSizes, setSelectedSizes] = React.useState<Record<string, string>>({})
  const [showMobileFilters, setShowMobileFilters] = React.useState(false)
  const [showSnackbar, setShowSnackbar] = React.useState(false)
  const [snackbarMessage, setSnackbarMessage] = React.useState('')
  const [filteredProducts, setFilteredProducts] = React.useState(fragrances)
  const [currentSort, setCurrentSort] = React.useState<SortOption>('featured')
  const { dispatch } = useCart()

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

    // Apply season filter
    if (filters.seasons.length > 0) {
      result = result.filter(fragrance =>
        filters.seasons.includes(fragrance.season)
      )
    }

    // Apply subcategory filter
    if (filters.subcategories.length > 0) {
      result = result.filter(fragrance =>
        filters.subcategories.includes(fragrance.subcategory)
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
              onClick={() => setShowMobileFilters(true)}
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
                          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors rounded-md text-sm"
                          onClick={() => {
                            dispatch({
                              type: 'ADD_ITEM',
                              payload: {
                                id: fragrance.id,
                                name: fragrance.name,
                                brand: fragrance.brand,
                                price: fragrance.prices[selectedSizes[fragrance.id]],
                                size: selectedSizes[fragrance.id],
                                quantity: 1,
                                image: fragrance.image
                              }
                            })
                            setSnackbarMessage('Added to cart successfully')
                            setShowSnackbar(true)
                          }}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Add to Cart
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
          open={showMobileFilters}
          onClose={() => setShowMobileFilters(false)}
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
                  onClick={() => setShowMobileFilters(false)}
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
                    setShowMobileFilters(false);
                  }}
                />
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="sticky bottom-0 bg-white border-t border-zinc-200 p-4">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full bg-zinc-900 text-white py-2.5 px-4 text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                View Results
              </button>
            </div>
          </div>
        </Drawer>
      </div>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSnackbar(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </main>
  )
} 