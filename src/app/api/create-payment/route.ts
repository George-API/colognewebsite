import { NextResponse } from 'next/server'
import type { PaymentRequest } from '@square/web-payments-sdk-types'

// Add headers to allow Square domains
export async function OPTIONS(_request: Request) {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  })
}

export async function POST(request: Request) {
  try {
    // Validate request body
    const body = await request.json()
    const { sourceId, amount, currency, locationId, idempotencyKey } = body
    
    console.log('Received payment request:', { sourceId, amount, currency, locationId, idempotencyKey })

    // Validate required fields
    if (!sourceId || !amount || !currency || !locationId || !idempotencyKey) {
      const missingFields = []
      if (!sourceId) missingFields.push('sourceId')
      if (!amount) missingFields.push('amount')
      if (!currency) missingFields.push('currency')
      if (!locationId) missingFields.push('locationId')
      if (!idempotencyKey) missingFields.push('idempotencyKey')

      console.error('Missing required fields:', missingFields)
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      )
    }

    // Validate amount is positive
    if (amount <= 0) {
      console.error('Invalid amount:', amount)
      return NextResponse.json(
        { success: false, error: 'Invalid payment amount' },
        { status: 400 }
      )
    }

    // Convert amount to cents and ensure it's an integer
    const amountInCents = Math.round(amount * 100)
    console.log('Amount in cents:', amountInCents)

    // Create payment body with snake_case field names as required by Square API
    const paymentBody = {
      source_id: sourceId,
      idempotency_key: idempotencyKey,
      amount_money: {
        amount: amountInCents,
        currency
      },
      location_id: locationId,
      autocomplete: true,
      note: 'Online store purchase'
    }

    console.log('Creating payment with:', paymentBody)

    try {
      const response = await fetch('https://connect.squareupsandbox.com/v2/payments', {
        method: 'POST',
        headers: {
          'Square-Version': '2024-02-15',
          'Accept-Version': '2024-02-15,*',
          'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentBody)
      })

      const data = await response.json()
      console.log('Square API response:', data)

      if (!response.ok) {
        const error = data.errors?.[0]
        console.error('Square payment error:', error)
        return NextResponse.json(
          { 
            success: false, 
            error: error?.detail || 'Payment processing failed',
            code: error?.code
          },
          { status: error?.code === 'CARD_DECLINED' ? 402 : response.status }
        )
      }

      return NextResponse.json({ 
        success: true, 
        payment: data,
        orderId: data.payment?.id
      })
    } catch (err) {
      console.error('Square API error:', err)
      throw err
    }
  } catch (error) {
    console.error('General error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred processing your payment. Please try again.' 
      },
      { status: 500 }
    )
  }
} 