import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function OrderSuccess() {
  const location = useLocation()
  const navigate = useNavigate()
  const { orderId, total } = location.state || {}

  useEffect(() => {
    if (!orderId) {
      navigate('/cart')
    }
  }, [orderId, navigate])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-xl shadow-lg p-12">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your purchase
          </p>
          {orderId && (
            <p className="text-gray-500 mb-2">
              Order ID: <span className="font-semibold">{orderId}</span>
            </p>
          )}
          {total && (
            <p className="text-gray-500 mb-8">
              Total Amount: <span className="font-semibold text-amber-800">${total.toFixed(2)}</span>
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/buy-sell"
              className="bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-900 transition"
            >
              Continue Shopping
            </Link>
            <Link
              to="/home"
              className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

