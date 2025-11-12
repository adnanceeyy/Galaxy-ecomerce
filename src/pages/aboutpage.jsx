import React from 'react'
import Nav from '../components/nav'

export default function Aboutpage() {
  return (
    <div>
        <Nav />
        
        <div className="bg-gradient-to-b from-[#f5faff] to-[#e3f1ff] min-h-screen">
      <Nav />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text */}
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4">
              About <span className="text-[#0f76bb]">TechMart</span>
            </h1>
            <p className="text-gray-700 text-sm md:text-lg leading-relaxed">
              Welcome to <strong>TechMart</strong> — your one-stop destination
              for the latest and most reliable <strong>electronics, gadgets,
              and smart devices.</strong> From smartphones and laptops to
              headsets and smartwatches, we bring you cutting-edge technology
              at unbeatable prices.  
              <br /> <br />
              We started with a simple mission — to make premium tech accessible
              and affordable to everyone in India. Today, TechMart serves
              thousands of happy customers with trust, quality, and quick
              delivery.
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="https://img.freepik.com/free-vector/online-shopping-concept-illustration_114360-1084.jpg"
              alt="About us illustration"
              className="rounded-3xl w-[90%] md:w-[80%] shadow-lg hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-10 md:py-20 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 md:px-10 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 text-sm md:text-lg max-w-3xl mx-auto">
            To empower every customer with the right technology for their needs.
            We aim to bridge the gap between innovation and accessibility by
            offering top-quality electronics from trusted global brands — all
            in one place.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="bg-[#f7fbff] rounded-2xl p-6 shadow-sm border hover:shadow-md transition-all">
              <h3 className="text-xl font-semibold text-[#0f76bb] mb-2">
                💡 Innovation
              </h3>
              <p className="text-gray-600 text-sm">
                We stay ahead of trends, bringing the latest gadgets and
                technology directly to your hands.
              </p>
            </div>
            <div className="bg-[#f7fbff] rounded-2xl p-6 shadow-sm border hover:shadow-md transition-all">
              <h3 className="text-xl font-semibold text-[#0f76bb] mb-2">
                ⚙️ Quality
              </h3>
              <p className="text-gray-600 text-sm">
                Every product is handpicked and verified for quality,
                performance, and authenticity.
              </p>
            </div>
            <div className="bg-[#f7fbff] rounded-2xl p-6 shadow-sm border hover:shadow-md transition-all">
              <h3 className="text-xl font-semibold text-[#0f76bb] mb-2">
                🤝 Customer First
              </h3>
              <p className="text-gray-600 text-sm">
                Our team ensures a smooth shopping experience with dedicated
                support and fast delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-10">
            Why Choose <span className="text-[#0f76bb]">TechMart</span>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "🚚 Fast Delivery",
                desc: "Quick and safe doorstep delivery across India.",
              },
              {
                title: "💰 Best Prices",
                desc: "Affordable deals and regular discounts on all gadgets.",
              },
              {
                title: "🛡️ Secure Payment",
                desc: "We use trusted and encrypted payment gateways.",
              },
              {
                title: "📞 24/7 Support",
                desc: "Friendly and fast support whenever you need it.",
              },
              {
                title: "🧾 Warranty & Returns",
                desc: "Hassle-free returns and genuine product warranties.",
              },
              {
                title: "🌍 Global Brands",
                desc: "We partner with top brands like Apple, Samsung, HP & more.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md p-6 transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0f76bb] text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8">
          <div>
            <h3 className="text-3xl md:text-5xl font-bold">500+</h3>
            <p className="text-sm md:text-base opacity-90">Products</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-5xl font-bold">50K+</h3>
            <p className="text-sm md:text-base opacity-90">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-5xl font-bold">200+</h3>
            <p className="text-sm md:text-base opacity-90">Cities Served</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-5xl font-bold">100%</h3>
            <p className="text-sm md:text-base opacity-90">Genuine Products</p>
          </div>
        </div>
      </section>

      {/* Team / Store Image */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-lg mb-10">
            Behind every great store is a great team. Our skilled professionals
            ensure you get the best tech experience — from product selection to
            delivery.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Adnan C",
                role: "Founder & CEO",
                img: "https://img.freepik.com/free-photo/portrait-young-businessman_23-2148175429.jpg",
              },
              {
                name: "Aisha K",
                role: "Marketing Head",
                img: "https://img.freepik.com/free-photo/portrait-confident-businesswoman_23-2148154172.jpg",
              },
              {
                name: "Rahul M",
                role: "Tech Support Lead",
                img: "https://img.freepik.com/free-photo/handsome-smiling-indian-man_23-2148124523.jpg",
              },
            ].map((person, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-lg transition-all"
              >
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-[#0f76bb]"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {person.name}
                </h3>
                <p className="text-sm text-gray-600">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </div>
  )
}
