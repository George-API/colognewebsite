'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button, Box, Typography, Alert, CircularProgress } from '@mui/material'
import { useCart } from '@/context/CartContext'
import squareConfig from '@/config/square'

interface PaymentFormProps {
  onBack: () => void
}

export default function PaymentForm({ onBack }: PaymentFormProps) {
  const [error, setError] = React.useState<string | null>(null)
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [card, setCard] = React.useState<any>(null)
  const cardContainerRef = React.useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { state: cartState } = useCart()

  // Memoize the submit handler to prevent recreation
  const handleSubmit = React.useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!card) {
      setError('Payment form not ready');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      console.log('Starting payment process...');
      
      // Tokenize the card
      const result = await card.tokenize();
      console.log('Tokenization result:', result);

      if (result.status === 'OK' && result.token) {
        // Ensure amount is valid
        if (!cartState.total || cartState.total <= 0) {
          setError('Invalid payment amount');
          return;
        }

        // Ensure we have required configuration
        if (!squareConfig.locationId) {
          console.error('Square location ID is not configured');
          setError('Payment system is not properly configured');
          return;
        }

        // Create payment request with guaranteed values
        const paymentRequest = {
          source_id: result.token,
          amount: cartState.total,
          currency: 'USD',
          location_id: squareConfig.locationId,
          idempotency_key: crypto.randomUUID()
        };

        console.log('Sending payment request:', paymentRequest);

        // Process payment
        const response = await fetch('/api/create-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentRequest),
        });

        const data = await response.json();
        console.log('Payment response:', data);

        if (!response.ok) {
          throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }

        if (data.success) {
          console.log('Payment successful, redirecting...');
          router.push('/order-confirmation');
        } else {
          console.error('Payment failed:', data.error);
          switch (data.code) {
            case 'CARD_DECLINED':
              setError('Your card was declined. Please try a different card.');
              break;
            case 'INVALID_EXPIRATION':
              setError('The card expiration date is invalid.');
              break;
            case 'INVALID_CVV':
              setError('The security code (CVV) is invalid.');
              break;
            case 'INSUFFICIENT_FUNDS':
              setError('Insufficient funds in the account.');
              break;
            case 'UNAUTHORIZED':
              setError('Payment authorization failed. Please check your card details.');
              break;
            default:
              setError(data.error || 'Payment failed. Please try again.');
          }
        }
      } else {
        console.error('Tokenization failed:', result.error);
        setError(result.error?.message || 'Failed to process card. Please check your details.');
      }
    } catch (err) {
      console.error('Payment processing error:', err);
      setError('An error occurred while processing your payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [card, cartState.total, router]);

  React.useEffect(() => {
    let cardInstance: any = null;
    let script: HTMLScriptElement | null = null;
    let isSubscribed = true;

    const loadSquare = async () => {
      try {
        if (!cardContainerRef.current) {
          console.error('Card container not found');
          return;
        }

        // Initialize Square
        if (!squareConfig.applicationId || !squareConfig.locationId) {
          throw new Error('Square configuration is missing');
        }

        // @ts-expect-error - Square types are not available
        const payments = window.Square?.payments(squareConfig.applicationId, squareConfig.locationId);
        if (!payments) {
          throw new Error('Square payments not initialized');
        }

        // Create new card instance
        cardInstance = await payments.card();
        
        // Clear container and attach new instance
        if (cardContainerRef.current) {
          cardContainerRef.current.innerHTML = '';
          await cardInstance.attach(cardContainerRef.current);
          
          if (isSubscribed) {
            setCard(cardInstance);
            console.log('Square card form initialized successfully');
          }
        }
      } catch (e) {
        console.error('Failed to load Square:', e);
        if (isSubscribed) {
          setError(e instanceof Error ? e.message : 'Failed to load payment form');
        }
      }
    };

    const initializeSquare = () => {
      // Only create script if it doesn't exist
      if (!document.querySelector('script[src*="squarecdn.com"]')) {
        script = document.createElement('script');
        script.src = squareConfig.environment === 'sandbox' 
          ? 'https://sandbox.web.squarecdn.com/v1/square.js'
          : 'https://web.squarecdn.com/v1/square.js';
        script.async = true;
        script.onload = () => {
          console.log('Square SDK loaded');
          loadSquare();
        };
        script.onerror = (e) => {
          console.error('Failed to load Square SDK:', e);
          if (isSubscribed) {
            setError('Failed to load payment system. Please try again.');
          }
        };
        document.body.appendChild(script);
      } else {
        loadSquare();
      }
    };

    // Initialize Square
    if (typeof window !== 'undefined') {
      // @ts-expect-error - Square types are not available
      if (window.Square?.payments) {
        loadSquare();
      } else {
        initializeSquare();
      }
    }

    return () => {
      isSubscribed = false;
      if (cardInstance) {
        cardInstance.destroy().catch(console.error);
      }
      setCard(null);
    };
  }, []); // Empty dependency array since we want this to run once on mount

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Payment Information
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <div 
        ref={cardContainerRef}
        className="mb-4 p-3 border rounded"
        style={{ minHeight: '90px' }}
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
          disabled={isProcessing || !card}
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
  );
} 