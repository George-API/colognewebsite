import React from 'react'
import Navbar from '@/components/Navbar'

export default function TermsOfService() {
  return (
    <main>
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 py-24">
        <h1 className="text-3xl font-light mb-8">Terms of Service</h1>
        
        <div className="space-y-8 text-zinc-600">
          <section>
            <h2 className="text-xl font-medium text-black mb-4">Agreement to Terms</h2>
            <p>By accessing and using Decant Labs, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-4">Use of Our Services</h2>
            <p className="mb-4">Our fragrance decanting service allows you to purchase smaller quantities of authentic luxury fragrances. By using our service, you agree to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Provide accurate and complete information when making purchases</li>
              <li>Use the products for personal use only</li>
              <li>Not resell or distribute our products commercially</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-4">Product Information</h2>
            <p className="mb-4">We strive to provide accurate product descriptions and pricing. However:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>All fragrances are authentic and sourced from authorized distributors</li>
              <li>Product images are representative and may vary slightly from actual products</li>
              <li>We reserve the right to modify prices and availability without notice</li>
              <li>Decanted products are carefully measured and packaged to maintain quality</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-4">Orders and Payment</h2>
            <p className="mb-4">When placing an order:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>All prices are in USD unless otherwise stated</li>
              <li>Payment is required at the time of purchase</li>
              <li>Orders are subject to availability and confirmation</li>
              <li>We reserve the right to refuse service to anyone</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-4">Shipping and Returns</h2>
            <p className="mb-4">Our shipping and returns policy includes:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Careful packaging to prevent damage during transit</li>
              <li>Returns accepted within 14 days of delivery</li>
              <li>Products must be unused and in original packaging</li>
              <li>Shipping costs are non-refundable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-4">Intellectual Property</h2>
            <p>All content on this website, including text, images, logos, and designs, is the property of Decant Labs and protected by intellectual property laws. You may not use our content without explicit permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-4">Limitation of Liability</h2>
            <p>Decant Labs is not liable for any damages arising from the use of our services or products, except where prohibited by law. Our liability is limited to the amount paid for the product in question.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-4">Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services constitutes acceptance of these changes.</p>
          </section>

          <p className="text-sm text-zinc-500 pt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </main>
  )
} 