import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../config/api'
import LoadingAnimation from './LoadingAnimation'

export default function Login() {
  const [formdata, setFormdata] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  // Check if user is already logged in
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
    setError('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    
    if (!formdata.email || !formdata.password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await api.auth.login({
        email: formdata.email,
        password: formdata.password
      })

      if (response.token) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.data))
        navigate('/home', { replace: true })
      } else {
        throw new Error(response.msg || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError(error.message || 'Invalid credentials')
      
      // Show redirecting animation
      setRedirecting(true)
      setTimeout(() => {
        navigate('/register', { replace: true })
      }, 2000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {redirecting && <LoadingAnimation message="Invalid credentials. Redirecting to register..." />}
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 p-4">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Left Side - Furniture Image/Design */}
          <div className="hidden lg:flex bg-gradient-to-br from-amber-100 via-orange-50 to-stone-100 p-12 items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 text-9xl">🛋️</div>
              <div className="absolute bottom-20 right-10 text-8xl">🪑</div>
              <div className="absolute top-1/2 left-1/4 text-7xl">🛏️</div>
            </div>
            <div className="relative z-10 text-center">
              <div className="mb-8">
                <svg className="w-32 h-32 mx-auto text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-stone-800 mb-4">CraftCore</h2>
              <p className="text-lg text-stone-600">Transform your space with premium furniture</p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-stone-800 mb-2">Welcome Back</h1>
              <p className="text-stone-600">Sign in to continue your furniture journey</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block font-medium text-stone-700 mb-2">Email Address</label>
                <input 
                  type="text" 
                  name="email" 
                  onChange={handlechange} 
                  placeholder="your.email@example.com" 
                  className="w-full border-2 border-stone-200 rounded-lg px-4 py-3 bg-stone-50 outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition text-stone-800" 
                />
              </div>
              <div>
                <label className="block font-medium text-stone-700 mb-2">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password" 
                    onChange={handlechange} 
                    placeholder="Enter your password" 
                    className="w-full border-2 border-stone-200 rounded-lg px-4 py-3 pr-10 bg-stone-50 outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition text-stone-800" 
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
              </div>

              {/* Error Message */}
              {error && !redirecting && (
                <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button 
                onClick={handleLogin}
                disabled={loading || redirecting}
                className="w-full py-3.5 cursor-pointer rounded-lg text-white font-semibold bg-stone-800 hover:bg-stone-900 transition shadow-md hover:shadow-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Footer */}
              <p className="text-center text-stone-600 mt-6">
                Don't have an account?{" "}
                <Link to="/register" className="text-amber-700 font-semibold hover:text-amber-800 hover:underline transition cursor-pointer">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
