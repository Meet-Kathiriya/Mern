import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

// Initialize Stripe - will be null if key is not set, handled in component
const getStripePromise = () => {
  const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  if (!publishableKey || publishableKey === 'pk_test_51QEXAMPLE') {
    console.warn('Stripe publishable key is not configured. Please set VITE_STRIPE_PUBLISHABLE_KEY in your .env file.');
    return null;
  }
  return loadStripe(publishableKey);
};

const stripePromise = getStripePromise();

function PaymentFormContent({ clientSecret, orderId, total, onSuccess }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!stripe || !elements) {
      return
    }

    setLoading(true)
    setError('')

    try {
      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-success`,
        },
        redirect: 'if_required'
      })

      if (confirmError) {
        setError(confirmError.message)
        setLoading(false)
        return
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id, orderId)
      }
    } catch (err) {
      setError(err.message || 'An error occurred during payment')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full mt-6 bg-amber-800 text-white py-3 rounded-lg font-semibold hover:bg-amber-900 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
      </button>
    </form>
  )
}

export default function PaymentForm({ clientSecret, orderId, total, onSuccess }) {
  if (!clientSecret) {
    return null
  }

  if (!stripePromise) {
    return (
      <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
        <p className="font-semibold">Stripe is not configured</p>
        <p className="text-sm mt-1">Please set VITE_STRIPE_PUBLISHABLE_KEY in your .env file to enable payments.</p>
      </div>
    );
  }

  return (
    <Elements 
      stripe={stripePromise}
      options={{
        clientSecret: clientSecret
      }}
    >
      <PaymentFormContent 
        clientSecret={clientSecret}
        orderId={orderId}
        total={total}
        onSuccess={onSuccess}
      />
    </Elements>
  )
}

