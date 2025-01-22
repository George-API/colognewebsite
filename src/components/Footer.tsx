'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 -ml-1">
              <Image
                src="/images/decant-logo-final.png"
                alt="Decant Labs"
                width={53}
                height={18}
                className="opacity-90"
              />
              <span className="text-white text-lg">Decant Labs</span>
            </Link>
            <p className="text-sm">Luxury fragrance decants, carefully measured and authentically sourced.</p>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Contact</h3>
            <p className="text-sm">Email: info@decantlabs.com</p>
            <p className="text-sm mt-2">Hours: Mon-Fri 9am-5pm EST</p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Follow us on TikTok"
              >
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
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Decant Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 