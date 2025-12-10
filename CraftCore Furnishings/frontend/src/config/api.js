const API_BASE_URL = 'http://localhost:5000/api'

export const api = {
  auth: {
    register: async (data) => {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      return response.json()
    },
    login: async (data) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      return response.json()
    },
  },
  payment: {
    createPaymentIntent: async (data, token) => {
      const response = await fetch(`${API_BASE_URL}/payment/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      })
      return response.json()
    },
    confirmPayment: async (data, token) => {
      const response = await fetch(`${API_BASE_URL}/payment/confirm-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      })
      return response.json()
    },
    getOrders: async (token) => {
      const response = await fetch(`${API_BASE_URL}/payment/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      return response.json()
    },
  },
}

export default API_BASE_URL

