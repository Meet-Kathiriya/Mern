import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()

  const subtotal = getCartTotal()
  const tax = subtotal * 0.08
  const shipping = 50
  const total = subtotal + tax + shipping

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!')
      return
    }
    // Navigate to checkout page
    navigate('/checkout')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-orange-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Shopping Cart</h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Review your items and proceed to checkout
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => {
                  const price = typeof item.price === 'string' 
                    ? parseFloat(item.price.replace(/[^0-9.]/g, ''))
                    : item.price
                  
                  return (
                    <div key={item.id} className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg w-full md:w-32 h-32 flex items-center justify-center flex-shrink-0">
                          <span className="text-6xl">{item.image}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.name}</h3>
                              <p className="text-2xl font-bold text-amber-800">
                                {typeof item.price === 'string' ? item.price : `$${item.price.toLocaleString()}`}
                              </p>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 transition cursor-pointer"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          <div className="flex items-center gap-4">
                            <label className="text-gray-700 font-medium">Quantity:</label>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-2 hover:bg-gray-100 transition cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-4 py-2 border-x border-gray-300">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-2 hover:bg-gray-100 transition cursor-pointer"
                            >
                              +
                            </button>
                            </div>
                            <div className="ml-auto">
                              <p className="text-lg font-bold text-gray-900">
                                ${(price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                
                {/* Continue Shopping */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <Link 
                    to="/buy-sell" 
                    className="text-amber-800 font-semibold hover:text-amber-900 transition flex items-center cursor-pointer"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>${shipping}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-4">
                      <div className="flex justify-between text-xl font-bold text-gray-900">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-amber-800 text-white py-3 rounded-lg font-semibold hover:bg-amber-900 transition mb-4 cursor-pointer"
                  >
                    Proceed to Checkout
                  </button>
                  <button 
                    onClick={clearCart}
                    className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition cursor-pointer"
                  >
                    Clear Cart
                  </button>
                  
                  {/* Promo Code */}
                  <div className="mt-6 pt-6 border-t border-gray-300">
                    <h3 className="font-semibold text-gray-900 mb-3">Promo Code</h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                      />
                      <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition cursor-pointer">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Start adding items to your cart to see them here</p>
              <Link 
                to="/buy-sell"
                className="inline-block bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-900 transition cursor-pointer"
              >
                Browse Products
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Recommended Items */}
      {cartItems.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { name: 'Office Desk', price: '$599', image: '💼' },
                { name: 'Wardrobe', price: '$1,199', image: '🚪' },
                { name: 'Bookshelf', price: '$449', image: '📚' },
                { name: 'Recliner', price: '$799', image: '🪑' }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition cursor-pointer">
                  <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg h-32 flex items-center justify-center mb-4">
                    <span className="text-5xl">{item.image}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-amber-800 font-bold mb-3">{item.price}</p>
                  <Link 
                    to="/buy-sell"
                    className="block w-full bg-amber-800 text-white py-2 rounded-lg font-semibold hover:bg-amber-900 transition text-sm text-center cursor-pointer"
                  >
                    View Product
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
