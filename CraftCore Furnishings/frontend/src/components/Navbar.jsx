import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function Navbar() {
  const { getCartCount } = useCart()
  const { getWishlistCount } = useWishlist()
  const cartCount = getCartCount()
  const wishlistCount = getWishlistCount()
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isEditingName, setIsEditingName] = useState(false)
  const [editedName, setEditedName] = useState('')
  const [loading, setLoading] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const profileRef = useRef(null)

  // Get current user from localStorage
  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      const user = JSON.parse(userStr)
      setUserData(user)
      setEditedName(user.name || '')
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNameUpdate = async () => {
    if (!userData || !editedName.trim()) return

    setLoading(true)
    try {
      const updatedUser = { ...userData, name: editedName.trim() }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUserData(updatedUser)
      setIsEditingName(false)
    } catch (error) {
      console.error('Error updating name:', error)
    } finally {
      setLoading(false)
    }
  }

  const getProfilePhoto = () => {
    // Users registered via email won't have photos
    return null
  }

  const getDisplayName = () => {
    if (userData?.name) return userData.name
    return 'User'
  }

  const getEmail = () => {
    if (userData?.email) return userData.email
    if (user?.email) return user.email
    return ''
  }

  const getInitials = () => {
    const name = getDisplayName()
    if (name && name !== 'User') {
      // Get first letter of the name
      return name.charAt(0).toUpperCase()
    }
    // If no name, get first letter of email
    const email = getEmail()
    if (email) {
      return email.charAt(0).toUpperCase()
    }
    return 'U' // Default to 'U' for User
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUserData(null)
      setIsProfileOpen(false)
      // Use replace to prevent back button from going to protected routes
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/home" className="text-2xl font-bold text-amber-800 hover:text-amber-900 transition cursor-pointer">
              CraftCore
            </Link>
          </div>

          {/* Navigation Links - Centered */}
          <div className="hidden md:flex items-center flex-1 justify-end">
            <nav className="flex items-center space-x-5">
              <Link to="/home" className="text-gray-700 hover:text-amber-800 px-3 py-2 text-sm font-medium transition-colors cursor-pointer">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-amber-800 px-3 py-2 text-sm font-medium transition-colors cursor-pointer">
                About
              </Link>
              <Link to="/buy-sell" className="text-gray-700 hover:text-amber-800 px-3 py-2 text-sm font-medium transition-colors cursor-pointer">
                Buy
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-amber-800 px-3 py-2 text-sm font-medium transition-colors cursor-pointer">
                Contact
              </Link>
              <Link to="/wishlist" className="text-gray-700 hover:text-amber-800 px-3 py-2 text-sm font-medium transition-colors flex items-center relative cursor-pointer" title="Wishlist">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="text-gray-700 hover:text-amber-800 px-3 py-2 text-sm font-medium transition-colors flex items-center relative cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6' viewBox="0 0 24 24"><path fill="none" stroke="#364153" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.5 21a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-8 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M3.71 5.4h15.214c1.378 0 2.373 1.27 1.995 2.548l-1.654 5.6C19.01 14.408 18.196 15 17.27 15H8.112c-.927 0-1.742-.593-1.996-1.452zm0 0L3 3"/></svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <div className="flex items-center gap-4">
                {/* Profile Button */}
                {userData && (
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-amber-800 transition focus:outline-none focus:ring-2 focus:ring-amber-800"
                    >
                      <div className="w-full h-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white font-semibold text-lg">
                        {getInitials()}
                      </div>
                    </button>

                    {/* Profile Dropdown Menu */}
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                        <div className="p-4 border-b border-gray-200">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white font-semibold text-lg">
                              {getInitials()}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-800">Profile</h3>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 space-y-4">
                          {/* Name Field - Editable */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Name
                            </label>
                            {isEditingName ? (
                              <div className="space-y-3">
                                <input
                                  type="text"
                                  value={editedName}
                                  onChange={(e) => setEditedName(e.target.value)}
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-amber-800 transition"
                                  placeholder="Enter your name"
                                  autoFocus
                                />
                                <div className="flex items-center justify-end gap-3">
                                  <button
                                    onClick={() => {
                                      setIsEditingName(false)
                                      setEditedName(getDisplayName())
                                    }}
                                    className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm border border-gray-300 cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={handleNameUpdate}
                                    disabled={loading || !editedName.trim()}
                                    className="px-5 py-2.5 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm shadow-sm cursor-pointer"
                                  >
                                    {loading ? (
                                      <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                      </span>
                                    ) : (
                                      'Save'
                                    )}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                                <span className="text-gray-800 font-medium">{getDisplayName()}</span>
                                <button
                                  onClick={() => setIsEditingName(true)}
                                  className="text-amber-800 cursor-pointer hover:text-amber-900 text-sm font-medium px-3 py-1.5 rounded-md hover:bg-amber-50 transition"
                                >
                                  Edit
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Email Field - Read Only */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              value={getEmail()}
                              readOnly
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                            />
                            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                          </div>

                          {/* Logout Button */}
                          <div className="pt-2 border-t border-gray-200">
                            <button
                              onClick={handleLogout}
                              disabled={loggingOut}
                              className="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium text-sm border border-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {loggingOut ? (
                                <>
                                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Logging out...
                                </>
                              ) : (
                                <>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                  </svg>
                                  Logout
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Mobile Wishlist & Cart */}
                <div className="md:hidden flex items-center gap-4">
                  <Link to="/wishlist" className="text-gray-700 hover:text-amber-800 relative cursor-pointer">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                  <Link to="/cart" className="text-gray-700 hover:text-amber-800 relative cursor-pointer">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </nav>
          </div>

          {/* Right Side - Profile & Mobile Cart */}
        </div>
      </div>
    </nav>
  )
}

