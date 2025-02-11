import { Client, Environment } from 'square';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Initialize Square client
    const client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: process.env.SQUARE_ENVIRONMENT === 'production' 
        ? Environment.Production 
        : Environment.Sandbox
    });

    // Test the connection by getting location details
    const { result } = await client.locationsApi.retrieveLocation(
      process.env.SQUARE_LOCATION_ID!
    );

    return NextResponse.json({
      success: true,
      message: 'Successfully connected to Square API',
      location: result.location
    });

  } catch (error) {
    console.error('Square API Error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to connect to Square API',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 