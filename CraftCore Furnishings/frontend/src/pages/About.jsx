export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-orange-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About FurnitureHub</h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            We are passionate about bringing beautiful, functional furniture to your home
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2010, FurnitureHub has been dedicated to providing high-quality furniture 
                that combines style, comfort, and durability. We believe that every home deserves 
                beautiful furniture that reflects the personality of its owners.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our team of experienced designers and craftsmen work tirelessly to curate and create 
                furniture pieces that stand the test of time. We source materials from trusted suppliers 
                and ensure every product meets our strict quality standards.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you're looking to buy new furniture or sell your existing pieces, we're here 
                to make the process seamless and enjoyable.
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-8 shadow-lg">
              <div className="bg-white rounded-lg p-6">
                <div className="aspect-video bg-gradient-to-br from-amber-200 to-orange-200 rounded-lg flex items-center justify-center">
                  <svg className="w-24 h-24 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality First',
                desc: 'We never compromise on quality. Every piece of furniture is carefully selected and tested to ensure it meets our high standards.',
                icon: '⭐'
              },
              {
                title: 'Customer Satisfaction',
                desc: 'Your happiness is our priority. We go above and beyond to ensure you have a great shopping experience with us.',
                icon: '❤️'
              },
              {
                title: 'Sustainability',
                desc: 'We care about the environment and work with suppliers who share our commitment to sustainable practices.',
                icon: '🌱'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition">
                <div className="text-5xl mb-4 text-center">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: 'John Smith', role: 'CEO & Founder' },
              { name: 'Sarah Johnson', role: 'Head of Design' },
              { name: 'Mike Davis', role: 'Sales Manager' },
              { name: 'Emily Brown', role: 'Customer Service' }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-amber-200 to-orange-200 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-amber-800 to-orange-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10,000+', label: 'Happy Customers' },
              { number: '5,000+', label: 'Products Sold' },
              { number: '14', label: 'Years Experience' },
              { number: '50+', label: 'Team Members' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-amber-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

