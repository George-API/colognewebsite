'use client'

import React from 'react'
import Link from 'next/link'
import { Instagram, Twitter, Facebook } from 'lucide-react'
import { Divider } from '@mui/material'

const footerLinks = [
  {
    title: 'Shop',
    links: [
      { name: 'All Fragrances', href: '/products' },
      { name: 'New Arrivals', href: '/new-arrivals' },
      { name: 'Best Sellers', href: '/best-sellers' },
      { name: 'Gift Sets', href: '/gift-sets' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Shipping', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
  },
]

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: Instagram,
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com',
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: Twitter,
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: Facebook,
  },
]

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div>
            <Link href="/" className="text-xl font-light tracking-widest">
              DECANT LABS
            </Link>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
              Curated collection of luxury fragrances for the modern individual. 
              Experience the art of scent.
            </p>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-medium mb-4 text-sm tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-zinc-400">
            <span>© 2025 Decant Labs. All rights reserved.</span>
            <div className="hidden md:flex gap-4 items-center">
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 