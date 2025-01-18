'use client'

import React from 'react'
import { useStripe, useElements, CardElement, PaymentElement } from '@stripe/react-stripe-js'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  Collapse,
} from '@mui/material'
import { useCart } from '../context/CartContext'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
}

const steps = ['Shipping', 'Payment', 'Review']

const shippingValidationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State/Province is required'),
  zipCode: Yup.string().required('ZIP/Postal code is required'),
})

interface CheckoutFormProps {
  activeStep: number
  handleNext: () => void
  handleBack: () => void
}

export default function CheckoutForm({ activeStep, handleNext, handleBack }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const { state: cartState } = useCart()
  const [error, setError] = React.useState<string | null>(null)
  const [processing, setProcessing] = React.useState(false)
  const [paymentMethod, setPaymentMethod] = React.useState('card')

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      country: '',
      state: '',
      zipCode: '',
    },
    validationSchema: shippingValidationSchema,
    onSubmit: (values) => {
      handleNext()
    },
  })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (activeStep === 0) {
      formik.handleSubmit()
      return
    }

    if (!stripe || !elements) {
      return
    }

    setProcessing(true)

    if (activeStep === 1) { // Payment step
      try {
        const { error: stripeError, paymentMethod: stripePaymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: `${formik.values.firstName} ${formik.values.lastName}`,
            email: formik.values.email,
            address: {
              line1: formik.values.address,
              city: formik.values.city,
              state: formik.values.state,
              postal_code: formik.values.zipCode,
              country: formik.values.country,
            },
          },
        })

        if (stripeError) {
          setError(stripeError.message || 'An error occurred')
          setProcessing(false)
          return
        }

        // Create payment intent
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: cartState.total,
            payment_method_id: stripePaymentMethod.id,
          }),
        })

        const data = await response.json()

        if (data.error) {
          setError(data.error)
          setProcessing(false)
          return
        }

        handleNext()
      } catch (err) {
        setError('An error occurred while processing your payment')
      }
    }

    setProcessing(false)
    handleNext()
  }

  const renderShippingForm = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="address"
          name="address"
          label="Address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="city"
          name="city"
          label="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Country</InputLabel>
          <Select
            label="Country"
            defaultValue=""
            value={formik.values.country}
            onChange={(e) => formik.setFieldValue('country', e.target.value)}
            error={formik.touched.country && Boolean(formik.errors.country)}
          >
            <MenuItem value="US">United States</MenuItem>
            <MenuItem value="CA">Canada</MenuItem>
            <MenuItem value="GB">United Kingdom</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="state"
          name="state"
          label="State/Province"
          value={formik.values.state}
          onChange={formik.handleChange}
          error={formik.touched.state && Boolean(formik.errors.state)}
          helperText={formik.touched.state && formik.errors.state}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="zipCode"
          name="zipCode"
          label="ZIP / Postal Code"
          value={formik.values.zipCode}
          onChange={formik.handleChange}
          error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
          helperText={formik.touched.zipCode && formik.errors.zipCode}
          variant="outlined"
        />
      </Grid>
    </Grid>
  )

  const renderPaymentForm = () => (
    <Box>
      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
        Select your payment method
      </Typography>

      <RadioGroup
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        sx={{ mb: 3 }}
      >
        <FormControlLabel
          value="card"
          control={<Radio />}
          label="Credit/Debit Card"
        />
        <Collapse in={paymentMethod === 'card'}>
          <Box sx={{ 
            p: 3, 
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            mb: 2,
            ml: 4
          }}>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </Box>
        </Collapse>

        <FormControlLabel
          value="paypal"
          control={<Radio />}
          label="PayPal"
        />
        <Collapse in={paymentMethod === 'paypal'}>
          <Box sx={{ p: 2, ml: 4 }}>
            <Typography variant="body2" color="text.secondary">
              You will be redirected to PayPal to complete your payment.
            </Typography>
          </Box>
        </Collapse>

        <FormControlLabel
          value="applepay"
          control={<Radio />}
          label="Apple Pay"
        />
      </RadioGroup>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
    </Box>
  )

  const renderReviewStep = () => (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Order Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Shipping Address
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formik.values.firstName} {formik.values.lastName}<br />
            {formik.values.address}<br />
            {formik.values.city}, {formik.values.state} {formik.values.zipCode}<br />
            {formik.values.country}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            Payment Method
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {paymentMethod === 'card' ? 'Credit/Debit Card' : 
             paymentMethod === 'paypal' ? 'PayPal' : 'Apple Pay'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return renderShippingForm()
      case 1:
        return renderPaymentForm()
      case 2:
        return renderReviewStep()
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {renderStepContent()}
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
        {activeStep !== 0 && (
          <Button
            onClick={handleBack}
            disabled={processing}
            sx={{ 
              px: 4,
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }}
          >
            Back
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          disabled={!stripe || processing}
          sx={{ 
            px: 4,
            backgroundColor: 'black',
            '&:hover': {
              backgroundColor: '#333',
            }
          }}
        >
          {activeStep === steps.length - 1 ? 'Place Order' : 'Continue'}
        </Button>
      </Box>
    </form>
  )
} 