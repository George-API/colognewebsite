# Cologne E-commerce Website

A modern, serverless e-commerce platform built with Next.js, Prisma, and Neon Postgres.

## Deployment Guide

### Prerequisites
- Node.js 18+ installed
- Vercel account
- Neon account (free tier)
- Stripe account
- Git installed

### Step 1: Environment Variables Setup

Create a `.env` file in your root directory with the following variables:

```env
# Database URLs (Neon Postgres)
DATABASE_URL=""    # Neon connection string with pooling
DIRECT_URL=""      # Direct connection URL for migrations

# Auth
NEXTAUTH_SECRET="" # Generate with: openssl rand -base64 32
NEXTAUTH_URL=""    # Local: "http://localhost:3000" | Prod: "https://your-domain.com"

# Stripe
STRIPE_SECRET_KEY=""         # From Stripe Dashboard → Developers → API keys
STRIPE_WEBHOOK_SECRET=""     # From Stripe Dashboard → Developers → Webhooks
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="" # From Stripe Dashboard → Developers → API keys
```

#### How to Get Each Variable:

1. **Database Setup with Neon**:
   - Sign up at [Neon](https://neon.tech) (free tier available)
   - Create a new project
   - In your project dashboard:
     1. Click "Connection Details"
     2. Select "Prisma" from the Connection Type dropdown
     3. Copy both connection strings:
        - `DATABASE_URL`: Connection string with pooling
        - `DIRECT_URL`: Direct connection string for migrations
   
   Benefits of Neon:
   - Generous free tier (10GB storage, unlimited databases)
   - Automatic scaling
   - Built-in connection pooling
   - Point-in-time recovery
   - Database branching for development/staging

2. **Auth Variables**:
   ```bash
   # Generate NEXTAUTH_SECRET
   openssl rand -base64 32
   
   # NEXTAUTH_URL
   # Development: http://localhost:3000
   # Production: Your actual domain (e.g., https://your-site.vercel.app)
   ```

3. **Stripe Variables**:
   - Create account at [stripe.com](https://stripe.com)
   - Go to Dashboard → Developers → API keys
   - Toggle to view test keys
   - Create webhook endpoint in Stripe Dashboard:
     - Endpoint URL: `https://your-domain.com/api/webhooks/stripe`
     - Events to listen for: 
       - `payment_intent.succeeded`
       - `payment_intent.payment_failed`

### Step 2: Database Setup

```bash
# Install dependencies
npm install

# Push database schema
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

### Step 3: Vercel Deployment

1. Push your code to GitHub

2. Deploy to Vercel:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel deploy
   ```

3. Set up environment variables in Vercel:
   - Go to Project Settings → Environment Variables
   - Add all variables from your `.env` file
   - Make sure to add different values for Production/Preview/Development
   - For database URLs, use different Neon database branches for each environment

### Step 4: Post-Deployment

1. Update Stripe webhook endpoint to your production URL
2. Test the payment flow in test mode
3. Verify email sending functionality
4. Check database connections

## Development

```bash
# Run development server
npm run dev

# Run Prisma Studio (database management)
npx prisma studio

# Create a new database branch for development (using Neon CLI)
neonctl branches create --name dev
```

## Database Management

```bash
# Apply schema changes
npx prisma db push

# Reset database (caution: deletes all data)
npx prisma db reset

# Generate Prisma Client after schema changes
npx prisma generate
```

## Database Branching with Neon

Neon supports database branching, which is perfect for development workflows:

1. **Create a branch for development**:
   ```bash
   neonctl branches create --name dev
   ```

2. **Get connection string for a branch**:
   ```bash
   neonctl branches get-endpoint --branch-name dev
   ```

3. **Best practices**:
   - Use `main` branch for production
   - Create separate branches for staging/development
   - Use temporary branches for feature development

## Troubleshooting

1. **Database Connection Issues**:
   - Verify Neon project is active
   - Check connection strings in environment variables
   - Ensure you're using the correct branch endpoints
   - Verify IP is not blocked by Neon's security settings

2. **Stripe Webhook Errors**:
   - Verify webhook endpoint URL
   - Check webhook secret is correctly set
   - Ensure all required events are selected

3. **Authentication Issues**:
   - Verify NEXTAUTH_URL matches your domain
   - Check NEXTAUTH_SECRET is set
   - Ensure database tables are properly migrated

## Security Notes

- Never commit `.env` file
- Use test keys for Stripe during development
- Regularly rotate NEXTAUTH_SECRET in production
- Keep Prisma Schema migrations in version control
- Use different Neon database branches for different environments

"Design a modern, clean, and minimal e-commerce website that prioritizes simplicity and user experience. The homepage should feature a sleek, full-width banner with bold typography and a high-quality image showcasing the product or service. Use a monochromatic or neutral color palette with subtle accents for contrast. Include a streamlined navigation bar with concise labels and a search bar for easy access.

The product pages should have ample white space, large product images, and clear, readable text. Highlight key details like price, description, and availability using a clean, sans-serif font. Add interactive elements like hover effects on buttons and product images. Incorporate a sticky 'Add to Cart' button for convenience. The cart and checkout process should be intuitive and straightforward, featuring clear calls to action and minimal distractions.

Ensure the website is fully responsive, loading quickly and adapting seamlessly to different devices. Focus on accessibility, ensuring all text is legible, buttons are easy to tap, and the layout is intuitive for users of all abilities."



Next.js: For server-side rendering and routing.
Vite: For fast builds and efficient development.
TypeScript: For type safety and maintainability.
Focus on:

A sleek, minimal design with a neutral color palette.
Large product images with clear details.
Smooth navigation and responsive design.
Intuitive cart and checkout experience.
Accessible and performant website optimized for SEO."






