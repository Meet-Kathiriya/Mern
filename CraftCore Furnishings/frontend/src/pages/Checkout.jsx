import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import PaymentForm from '../components/PaymentForm'
import API_BASE_URL from '../config/api'

export default function Checkout() {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, clearCart } = useCart()
  
  const [clientSecret, setClientSecret] = useState('')
  const [orderId, setOrderId] = useState('')
  const [loading, setLoading] = useState(false)
  const [creatingIntent, setCreatingIntent] = useState(false)
  const [error, setError] = useState('')
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA'
  })

  const subtotal = getCartTotal()
  const tax = subtotal * 0.08
  const shipping = 50
  const total = subtotal + tax + shipping

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart')
      return
    }
  }, [cartItems, navigate])

  const handleShippingChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    })
  }

  const createPaymentIntent = async () => {
    // Validate shipping address
    const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'state', 'zipCode']
    const missingFields = requiredFields.filter(field => !shippingAddress[field])
    
    if (missingFields.length > 0) {
      setError('Please fill in all shipping address fields')
      return false
    }

    setCreatingIntent(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}/payment/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          shippingAddress,
          cartItems: cartItems
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.msg || 'Failed to create payment intent')
      }

      setClientSecret(data.clientSecret)
      setOrderId(data.orderId)
      setCreatingIntent(false)
      return true
    } catch (err) {
      setError(err.message || 'Failed to create payment intent')
      setCreatingIntent(false)
      return false
    }
  }

  const handlePaymentSuccess = async (paymentIntentId, orderId) => {
    try {
      // Confirm payment on backend
      const token = localStorage.getItem('token')
      const confirmResponse = await fetch(`${API_BASE_URL}/payment/confirm-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          paymentIntentId: paymentIntentId,
          orderId: orderId
        })
      })

      const confirmData = await confirmResponse.json()

      if (!confirmResponse.ok) {
        throw new Error(confirmData.msg || 'Failed to confirm payment')
      }

      // Clear cart and redirect
      clearCart()
      navigate('/order-success', { 
        state: { orderId: orderId, total: total } 
      })
    } catch (err) {
      setError(err.message || 'Failed to confirm payment')
    }
  }

  if (cartItems.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-orange-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Checkout</h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Complete your purchase securely
          </p>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping & Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Address</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={shippingAddress.name}
                        onChange={handleShippingChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={shippingAddress.email}
                        onChange={handleShippingChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleShippingChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingAddress.address}
                      onChange={handleShippingChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleShippingChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={shippingAddress.state}
                        onChange={handleShippingChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={shippingAddress.zipCode}
                        onChange={handleShippingChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* Payment Form */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
                {error && (
                  <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                  </div>
                )}
                {!clientSecret ? (
                  <div>
                    <p className="text-gray-600 mb-4">
                      Please fill in your shipping address above, then click the button below to proceed to payment.
                    </p>
                    <button
                      onClick={createPaymentIntent}
                      disabled={creatingIntent}
                      className="w-full bg-amber-800 text-white py-3 rounded-lg font-semibold hover:bg-amber-900 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {creatingIntent ? 'Creating Payment...' : 'Continue to Payment'}
                    </button>
                  </div>
                ) : (
                  <PaymentForm
                    clientSecret={clientSecret}
                    orderId={orderId}
                    total={total}
                    onSuccess={handlePaymentSuccess}
                  />
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => {
                    const price = typeof item.price === 'string' 
                      ? parseFloat(item.price.replace(/[^0-9.]/g, ''))
                      : item.price
                    return (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name} x {item.quantity}
                        </span>
                        <span className="text-gray-900 font-medium">
                          ${(price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    )
                  })}
                  <div className="border-t border-gray-300 pt-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2">
                      <div className="flex justify-between text-xl font-bold text-gray-900">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

