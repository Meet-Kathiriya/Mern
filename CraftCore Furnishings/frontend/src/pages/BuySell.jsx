import { useState, useMemo } from 'react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function BuySell() {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedCondition, setSelectedCondition] = useState('All Conditions')

  const furnitureItems = [
    { id: 1, name: 'Modern Sofa Set', price: '$1,299', category: 'Living Room', image: '🛋️', condition: 'New' },
    { id: 2, name: 'Elegant Dining Table', price: '$899', category: 'Dining Room', image: '🍽️', condition: 'New' },
    { id: 3, name: 'Comfortable Bed Frame', price: '$1,599', category: 'Bedroom', image: '🛏️', condition: 'New' },
    { id: 4, name: 'Office Desk', price: '$599', category: 'Office', image: '💼', condition: 'Like New' },
    { id: 5, name: 'Coffee Table', price: '$349', category: 'Living Room', image: '☕', condition: 'New' },
    { id: 6, name: 'Wardrobe Cabinet', price: '$1,199', category: 'Bedroom', image: '🚪', condition: 'New' },
    { id: 7, name: 'Bookshelf', price: '$449', category: 'Office', image: '📚', condition: 'Like New' },
    { id: 8, name: 'Dining Chairs Set', price: '$599', category: 'Dining Room', image: '🪑', condition: 'New' },
    { id: 9, name: 'Recliner Chair', price: '$799', category: 'Living Room', image: '🪑', condition: 'New' }
  ]

  const filteredItems = useMemo(() => {
    return furnitureItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory
      const matchesCondition = selectedCondition === 'All Conditions' || item.condition === selectedCondition
      return matchesSearch && matchesCategory && matchesCondition
    })
  }, [searchTerm, selectedCategory, selectedCondition])

  const handleAddToCart = (item) => {
    addToCart(item)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-orange-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Buy Furniture</h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Browse our collection of premium furniture pieces
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search furniture..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              />
            </div>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none cursor-pointer"
            >
              <option>All Categories</option>
              <option>Living Room</option>
              <option>Bedroom</option>
              <option>Dining Room</option>
              <option>Office</option>
            </select>
            <select 
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none cursor-pointer"
            >
              <option>All Conditions</option>
              <option>New</option>
              <option>Like New</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </div>
        </div>
      </section>

      {/* Furniture Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                  <div className="bg-gradient-to-br from-amber-100 to-orange-100 h-64 flex items-center justify-center">
                    <span className="text-8xl">{item.image}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded">
                        {item.condition}
                      </span>
                      <span className="text-gray-500 text-sm">{item.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-2xl font-bold text-amber-800 mb-4">{item.price}</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 bg-amber-800 text-white py-2 rounded-lg font-semibold hover:bg-amber-900 transition cursor-pointer"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => toggleWishlist(item)}
                        className={`px-4 py-2 rounded-lg font-semibold transition cursor-pointer ${
                          isInWishlist(item.id)
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                      >
                        <svg className="w-5 h-5" fill={isInWishlist(item.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
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
              <p className="text-xl text-gray-600">No items found matching your search criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Pagination */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer">
              Previous
            </button>
            <button className="px-4 py-2 bg-amber-800 text-white rounded-lg cursor-pointer">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer">2</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer">3</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer">
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

