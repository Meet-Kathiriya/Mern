import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-amber-400 mb-4">FurnitureHub</h3>
            <p className="text-gray-400">
              Your trusted destination for quality furniture. We bring style and comfort to your home.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-amber-400 transition">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-amber-400 transition">About</Link></li>
              <li><Link to="/buy-sell" className="text-gray-400 hover:text-amber-400 transition cursor-pointer">Buy/Sell</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-amber-400 transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Furniture Sales</li>
              <li>Furniture Buyback</li>
              <li>Interior Design</li>
              <li>Delivery Service</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>123 Furniture Street</li>
              <li>City, State 12345</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@furniturehub.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FurnitureHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

