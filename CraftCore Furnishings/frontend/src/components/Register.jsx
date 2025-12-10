import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../config/api'

export default function Register() {

  const [formdata, setFormdata] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState('')
  const navigate = useNavigate()

  // Check password strength
  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength('')
      return
    }

    let strength = 0
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++

    if (strength <= 2) {
      setPasswordStrength('weak')
    } else if (strength <= 4) {
      setPasswordStrength('normal')
    } else {
      setPasswordStrength('strong')
    }
  }

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/home', { replace: true })
    }
  }, [navigate])

  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
    setError('') // Clear error when user types
    
    // Check password strength when password changes
    if (e.target.name === 'password') {
      checkPasswordStrength(e.target.value)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validate required fields
    if (!formdata.name || !formdata.email || !formdata.password) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    try {
      const response = await api.auth.register({
        name: formdata.name,
        email: formdata.email,
        password: formdata.password
      })

      if (response.token) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.data))
        navigate('/home', { replace: true })
      } else {
        throw new Error(response.msg || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setError(error.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 p-4 overflow-hidden">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden h-[90vh] max-h-[800px]">
        {/* Left Side - Furniture Image/Design */}
        <div className="hidden lg:flex bg-gradient-to-br from-amber-100 via-orange-50 to-stone-100 p-8 items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 left-8 text-7xl">🛋️</div>
            <div className="absolute bottom-16 right-8 text-6xl">🪑</div>
            <div className="absolute top-1/2 left-1/4 text-5xl">🛏️</div>
            <div className="absolute bottom-8 left-1/2 text-5xl">💼</div>
          </div>
          <div className="relative z-10 text-center">
            <div className="mb-6">
              <svg className="w-24 h-24 mx-auto text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-stone-800 mb-3">CraftCore</h2>
            <p className="text-base text-stone-600">Create your account and start</p>
            <p className="text-base text-stone-600">transforming your living space</p>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="p-6 lg:p-8 flex flex-col justify-center overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-stone-800 mb-1">Create Account</h1>
            <p className="text-sm text-stone-600">Join CraftCore and discover premium furniture</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block font-medium text-stone-700 mb-1.5 text-sm">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="name" 
                onChange={handlechange} 
                placeholder="John Doe" 
                required 
                className="w-full border-2 border-stone-200 rounded-lg px-4 py-2.5 bg-stone-50 outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition text-stone-800 text-sm" 
              />
            </div>
            <div>
              <label className="block font-medium text-stone-700 mb-1.5 text-sm">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                name="email" 
                onChange={handlechange} 
                placeholder="your.email@example.com" 
                required 
                className="w-full border-2 border-stone-200 rounded-lg px-4 py-2.5 bg-stone-50 outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition text-stone-800 text-sm" 
              />
            </div>
            <div>
              <label className="block font-medium text-stone-700 mb-1.5 text-sm">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  onChange={handlechange} 
                  placeholder="Create a strong password" 
                  required 
                  className="w-full border-2 border-stone-200 rounded-lg px-4 py-2.5 pr-10 bg-stone-50 outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition text-stone-800 text-sm" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-500 hover:text-stone-700 focus:outline-none cursor-pointer"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {/* Password Strength Indicator */}
              {formdata.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          passwordStrength === 'weak' ? 'bg-red-500 w-1/3' :
                          passwordStrength === 'normal' ? 'bg-yellow-500 w-2/3' :
                          passwordStrength === 'strong' ? 'bg-green-500 w-full' : ''
                        }`}
                      ></div>
                    </div>
                    <span className={`text-xs font-medium ${
                      passwordStrength === 'weak' ? 'text-red-600' :
                      passwordStrength === 'normal' ? 'text-yellow-600' :
                      passwordStrength === 'strong' ? 'text-green-600' : 'text-stone-500'
                    }`}>
                      {passwordStrength === 'weak' ? 'Weak Password' :
                       passwordStrength === 'normal' ? 'Normal Password' :
                       passwordStrength === 'strong' ? 'Strong Password' : ''}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button 
              onClick={handleRegister} 
              disabled={loading} 
              className="w-full py-2.5 rounded-lg text-white font-semibold bg-stone-800 hover:bg-stone-900 transition shadow-md hover:shadow-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer" 
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-300"></div>
              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-stone-600 mt-4 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-amber-700 font-semibold hover:text-amber-800 hover:underline transition cursor-pointer">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

