import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get response
  const response = NextResponse.next()

  // Add security headers with expanded CSP
  response.headers.set(
    'Content-Security-Policy',
    `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' *.squarecdn.com *.squareupsandbox.com;
      connect-src 'self' *.squarecdn.com *.squareupsandbox.com *.square.com *.sentry.io;
      frame-src 'self' *.squarecdn.com *.squareupsandbox.com;
      style-src 'self' 'unsafe-inline' *.squarecdn.com;
      style-src-elem 'self' 'unsafe-inline' *.squarecdn.com;
      font-src 'self' *.squarecdn.com;
      img-src 'self' data: blob: *.squarecdn.com;
    `.replace(/\s+/g, ' ').trim()
  )

  // Add CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  return response
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
} 