'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import {
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material'
import { useCart } from '@/context/CartContext'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentFormProps {
  onBack: () => void
}

function PaymentFormContent({ onBack }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = React.useState<string | null>(null)
  const [isProcessing, setIsProcessing] = React.useState(false)
  const router = useRouter()
  const { state: cartState } = useCart()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // Create the payment intent on your server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: cartState.total * 100, // Convert to cents
          currency: 'usd',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create payment intent')
      }

      const { clientSecret } = await response.json()

      // Confirm the payment
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
        },
      })

      if (stripeError) {
        setError(stripeError.message ?? 'An error occurred')
      } else if (paymentIntent.status === 'succeeded') {
        router.push('/order-confirmation')
      }
    } catch (err) {
      setError('An error occurred while processing your payment')
      console.error('Payment error:', err)
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Payment Information
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <PaymentElement
        options={{
          layout: 'tabs',
          fields: {
            billingDetails: {
              address: {
                country: 'never',
              },
            },
          },
        }}
      />

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={onBack}
          disabled={isProcessing}
          sx={{
            color: 'black',
            borderColor: 'rgb(228, 228, 231)',
            '&:hover': {
              borderColor: 'black',
              backgroundColor: 'rgb(244, 244, 245)',
            },
          }}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={!stripe || isProcessing}
          sx={{
            bgcolor: 'black',
            '&:hover': {
              bgcolor: 'rgb(28, 28, 28)',
            },
            '&.Mui-disabled': {
              bgcolor: 'rgb(228, 228, 231)',
            },
          }}
        >
          {isProcessing ? (
            <CircularProgress size={24} sx={{ color: 'white' }} />
          ) : (
            `Pay ${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(cartState.total)}`
          )}
        </Button>
      </Box>
    </form>
  )
}

export default function PaymentForm(props: PaymentFormProps) {
  const [clientSecret, setClientSecret] = React.useState<string | null>(null)

  React.useEffect(() => {
    // Fetch the client secret when the component mounts
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 1000, // Replace with actual amount
        currency: 'usd',
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error('Error fetching client secret:', err))
  }, [])

  if (!clientSecret) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#000000',
            colorBackground: '#ffffff',
            colorText: '#000000',
            colorDanger: '#df1b41',
          },
        },
      }}
    >
      <PaymentFormContent {...props} />
    </Elements>
  )
} 