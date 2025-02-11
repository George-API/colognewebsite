'use client'

import React from 'react'
import {
  Stepper,
  Step,
  StepLabel,
  Paper,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { ShoppingBag, Truck, CreditCard } from 'lucide-react'
import ShippingForm from '@/components/checkout/ShippingForm'
import PaymentForm from '@/components/checkout/PaymentForm'
import OrderSummary from '@/components/checkout/OrderSummary'
import { useCart } from '@/context/CartContext'

const steps = [
  { label: 'Order Summary', icon: ShoppingBag },
  { label: 'Shipping', icon: Truck },
  { label: 'Payment', icon: CreditCard },
]

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = React.useState(0)
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { state: cartState } = useCart()

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  // Redirect if cart is empty
  React.useEffect(() => {
    if (cartState.items.length === 0) {
      router.push('/cart')
    }
  }, [cartState.items.length, router])

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <OrderSummary onNext={handleNext} />
      case 1:
        return <ShippingForm onNext={handleNext} onBack={handleBack} />
      case 2:
        return <PaymentForm onBack={handleBack} />
      default:
        return null
    }
  }

  if (cartState.items.length === 0) {
    return null // Prevent flash before redirect
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Stepper */}
        <Box sx={{ mb: { xs: 3, md: 6 } }}>
          <Stepper 
            activeStep={activeStep} 
            alternativeLabel={isMobile}
            orientation={isMobile ? 'horizontal' : 'horizontal'}
            sx={{
              '& .MuiStepLabel-label': {
                mt: 1,
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
              },
              '& .MuiStepIcon-root': {
                width: { xs: 28, sm: 32 },
                height: { xs: 28, sm: 32 },
                color: 'rgb(228, 228, 231)',
                '&.Mui-active, &.Mui-completed': {
                  color: 'black',
                },
              },
            }}
          >
            {steps.map((step) => (
              <Step key={step.label}>
                <StepLabel 
                  StepIconComponent={() => (
                    <div className={`rounded-full p-2 ${
                      activeStep >= steps.findIndex(s => s.label === step.label)
                        ? 'bg-black text-white'
                        : 'bg-zinc-200 text-zinc-400'
                    }`}>
                      <step.icon className="w-4 h-4" />
                    </div>
                  )}
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="flex-1">
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'rgb(228, 228, 231)',
              }}
            >
              {renderStepContent(activeStep)}
            </Paper>
          </div>

          {/* Order Summary Section - Only visible on desktop */}
          {activeStep !== 0 && (
            <div className="hidden lg:block w-96">
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'rgb(228, 228, 231)',
                  position: 'sticky',
                  top: 24,
                }}
              >
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Order Summary
                </Typography>
                <OrderSummary isMinimal />
              </Paper>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 