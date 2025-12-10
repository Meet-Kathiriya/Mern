import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function Home() {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [selectedCategory, setSelectedCategory] = useState(null)

  const featuredProducts = [
    { id: 1, name: 'Modern Sofa Set', price: '$1,299', image: '🛋️', category: 'Living Room', condition: 'New' },
    { id: 2, name: 'Elegant Dining Table', price: '$899', image: '🍽️', category: 'Dining Room', condition: 'New' },
    { id: 3, name: 'Comfortable Bed Frame', price: '$1,599', image: '🛏️', category: 'Bedroom', condition: 'New' },
    { id: 4, name: 'Office Desk', price: '$599', image: '💼', category: 'Office', condition: 'Like New' },
    { id: 5, name: 'Coffee Table', price: '$349', image: '☕', category: 'Living Room', condition: 'New' },
    { id: 6, name: 'Wardrobe Cabinet', price: '$1,199', image: '🚪', category: 'Bedroom', condition: 'New' },
    { id: 7, name: 'Bookshelf', price: '$449', image: '📚', category: 'Office', condition: 'Like New' },
    { id: 8, name: 'Dining Chairs Set', price: '$599', image: '🪑', category: 'Dining Room', condition: 'New' },
    { id: 9, name: 'Recliner Chair', price: '$799', image: '🪑', category: 'Living Room', condition: 'New' }
  ]

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) {
      return featuredProducts
    }
    return featuredProducts.filter(product => product.category === selectedCategory)
  }, [selectedCategory])

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const handleCategoryClick = (categoryName) => {
    if (selectedCategory === categoryName) {
      // If clicking the same category, reset to show all
      setSelectedCategory(null)
    } else {
      setSelectedCategory(categoryName)
    }
    // Smooth scroll to products section
    setTimeout(() => {
      const productsSection = document.getElementById('featured-products')
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Transform Your Space with
                <span className="text-amber-800"> Premium Furniture</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover elegant furniture pieces that combine style, comfort, and functionality. 
                Create the home of your dreams with our curated collection.
              </p>
              <div className="flex gap-4">
                <Link to="/buy-sell" className="bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-900 transition cursor-pointer">
                  Shop Now
                </Link>
                <Link to="/about" className="bg-white text-amber-800 px-8 py-3 rounded-lg font-semibold border-2 border-amber-800 hover:bg-amber-50 transition cursor-pointer">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-200 to-orange-200 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-32 h-32 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Living Room', icon: '🛋️' },
              { name: 'Bedroom', icon: '🛏️' },
              { name: 'Dining Room', icon: '🍽️' },
              { name: 'Office', icon: '💼' }
            ].map((category, index) => (
              <div 
                key={index} 
                onClick={() => handleCategoryClick(category.name)}
                className={`rounded-xl p-6 hover:shadow-xl transition cursor-pointer transform hover:scale-105 ${
                  selectedCategory === category.name
                    ? 'bg-gradient-to-br from-amber-600 to-orange-600 shadow-2xl scale-105'
                    : 'bg-gradient-to-br from-amber-50 to-orange-50'
                }`}
              >
                <div className={`text-6xl mb-4 text-center ${selectedCategory === category.name ? 'filter drop-shadow-lg' : ''}`}>
                  {category.icon}
                </div>
                <h3 className={`text-xl font-semibold text-center ${
                  selectedCategory === category.name ? 'text-white' : 'text-gray-900'
                }`}>
                  {category.name}
                </h3>
                {selectedCategory === category.name && (
                  <p className="text-center text-amber-100 text-sm mt-2">Click to show all</p>
                )}
              </div>
            ))}
          </div>
          {selectedCategory && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-amber-800 hover:text-amber-900 font-semibold underline cursor-pointer"
              >
                Show All Products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory ? `${selectedCategory} Products` : 'Featured Products'}
            </h2>
            {selectedCategory && (
              <span className="text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </span>
            )}
          </div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 h-64 flex items-center justify-center">
                  <span className="text-8xl">{product.image}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-amber-800 mb-4">{product.price}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-amber-800 text-white py-2 rounded-lg font-semibold hover:bg-amber-900 transition cursor-pointer"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`px-4 py-2 rounded-lg font-semibold transition cursor-pointer flex items-center ${
                        isInWishlist(product.id)
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      <svg className="w-5 h-5" fill={isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">No products found in this category.</p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-amber-800 hover:text-amber-900 font-semibold underline cursor-pointer"
              >
                Show All Products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Quality Guaranteed', desc: 'Premium materials and craftsmanship', icon: '✓' },
              { title: 'Free Delivery', desc: 'Fast and reliable delivery service', icon: '🚚' },
              { title: 'Best Prices', desc: 'Competitive pricing on all items', icon: '💰' }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

