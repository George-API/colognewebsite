'use client'

import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from '@mui/material'

interface ShippingFormProps {
  onNext: () => void
  onBack: () => void
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipCode: Yup.string().required('ZIP code is required'),
  country: Yup.string().required('Country is required'),
})

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  // Add more countries as needed
]

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  // Add more states as needed
]

export default function ShippingForm({ onNext, onBack }: ShippingFormProps) {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US',
    },
    validationSchema,
    onSubmit: (values) => {
      // Save shipping info to context/state
      console.log('Shipping info:', values)
      onNext()
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Shipping Information
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="phone"
            label="Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            size="small"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            name="address"
            label="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="city"
            label="City"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>State</InputLabel>
            <Select
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              label="State"
            >
              {states.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="zipCode"
            label="ZIP Code"
            value={formik.values.zipCode}
            onChange={formik.handleChange}
            error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
            helperText={formik.touched.zipCode && formik.errors.zipCode}
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Country</InputLabel>
            <Select
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              label="Country"
            >
              {countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={onBack}
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
          sx={{
            bgcolor: 'black',
            '&:hover': {
              bgcolor: 'rgb(28, 28, 28)',
            },
          }}
        >
          Continue to Payment
        </Button>
      </Box>
    </form>
  )
} 