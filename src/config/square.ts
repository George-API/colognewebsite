export const squareConfig = {
  applicationId: process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID,
  locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
  environment: process.env.SQUARE_ENVIRONMENT || 'sandbox'
} as const

// Validate required configuration
if (!squareConfig.applicationId) {
  throw new Error('Square Application ID is not configured')
}

if (!squareConfig.locationId) {
  throw new Error('Square Location ID is not configured')
}

export default squareConfig 