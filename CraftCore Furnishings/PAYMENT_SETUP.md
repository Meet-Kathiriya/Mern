# Payment Gateway Setup Guide

This guide will help you set up Stripe payment gateway for your e-commerce website.

## Prerequisites

1. A Stripe account (sign up at https://stripe.com)
2. Node.js backend and React frontend running

## Step 1: Get Your Stripe API Keys

1. Log in to your Stripe Dashboard: https://dashboard.stripe.com
2. Go to **Developers** → **API keys**
3. Copy your **Publishable key** (starts with `pk_test_`) and **Secret key** (starts with `sk_test_`)
   - For testing, use the test keys
   - For production, use live keys (switch to live mode in Stripe dashboard)

## Step 2: Backend Setup

1. Navigate to the `backend` directory
2. Create a `.env` file (or update existing one) and add:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/craftcore
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
```

3. Replace `sk_test_your_stripe_secret_key_here` with your actual Stripe secret key

## Step 3: Frontend Setup

1. Navigate to the `frontend` directory
2. Create a `.env` file and add:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

3. Replace `pk_test_your_stripe_publishable_key_here` with your actual Stripe publishable key

## Step 4: Restart Your Servers

After adding the environment variables:

1. Restart your backend server:
```bash
cd backend
npm start
# or for development
npm run dev
```

2. Restart your frontend server:
```bash
cd frontend
npm run dev
```

## Step 5: Test the Payment Flow

1. Add items to your cart
2. Click "Proceed to Checkout"
3. Fill in shipping address
4. Click "Continue to Payment"
5. Use Stripe test card numbers:
   - **Card Number**: `4242 4242 4242 4242`
   - **Expiry**: Any future date (e.g., `12/34`)
   - **CVC**: Any 3 digits (e.g., `123`)
   - **ZIP**: Any 5 digits (e.g., `12345`)

## Features Implemented

✅ Stripe Payment Integration
✅ Payment Intent Creation
✅ Secure Payment Processing
✅ Order Management
✅ Shipping Address Collection
✅ Order Success Page
✅ Cart Clearing After Payment

## API Endpoints

- `POST /api/payment/create-payment-intent` - Create payment intent
- `POST /api/payment/confirm-payment` - Confirm payment and create order
- `GET /api/payment/orders` - Get user's orders
- `GET /api/payment/orders/:orderId` - Get specific order

## Security Notes

- Never commit your `.env` files to version control
- Use test keys during development
- Switch to live keys only in production
- Keep your secret keys secure and never expose them in frontend code

## Troubleshooting

### Payment Intent Creation Fails
- Check if Stripe secret key is correctly set in backend `.env`
- Verify cart is not empty
- Check backend server logs for errors

### Payment Element Not Loading
- Verify Stripe publishable key is set in frontend `.env`
- Check browser console for errors
- Ensure StripeProvider is wrapping your app

### Payment Confirmation Fails
- Verify payment intent was created successfully
- Check if order exists in database
- Review backend logs for detailed error messages

## Support

For Stripe-specific issues, visit: https://stripe.com/docs/support

