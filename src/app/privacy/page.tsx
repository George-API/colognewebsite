import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PrivacyPolicy() {
  return (
    <main>
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 py-24">
        <h1 className="text-3xl font-light mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-zinc-600">
          <section>
            <h2 className="text-xl font-medium text-black mb-4">Information We Collect</h2>
            <p className="mb-4">When you visit Decant Labs, we collect certain information about your device, your interaction with the website, and information necessary to process your purchases. We may also collect additional information if you contact us for support.</p>
            <p>We collect the following types of information:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Personal information (name, email address, shipping address)</li>
              <li>Payment information (processed securely through our payment processors)</li>
              <li>Device information (browser type, IP address)</li>
              <li>Usage data (pages visited, time spent on site)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Process your orders and provide customer service</li>
              <li>Improve our website and product offerings</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Protect against fraud and unauthorized transactions</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-4">Data Protection</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-4">Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request transfer of your personal data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-4">Contact Us</h2>
            <p>If you have any questions about our privacy practices or would like to exercise your rights, please contact us at privacy@decantlabs.com</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-black mb-4">Updates to This Policy</h2>
            <p>We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new policy on this page.</p>
          </section>

          <p className="text-sm text-zinc-500 pt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <Footer />
    </main>
  )
} 