import React from "react";
import Nav from "../components/nav";

export default function ContactPage() {
   const adds = [
    {
      id: 1,
      add1: "./assets/images/add1.jpg",
    },
    {
      id: 2,
      add2: "./assets/images/add2.jpg",
    },
  ];
  return (
    <>
    <Nav />
            <div className="h-screen w-full bg-gradient-to-br from-[#7db9d1] to-[#5294ad] md:pb-[400px] fixed top-0">
        {/* footbar */}
        <div
          className="
  fixed bottom-0 w-[99%] md:w-[90.5%] 
  bg-[#f7fbff] border border-[#3f3f3f50] 
  rounded-t-[30px] md:rounded-t-[80px]
  place-self-center transition-all duration-300
  md:hover:w-[99.5%] md:hover:h-[240px]
  h-[150px] md:h-[230px] flex flex-col justify-end
  px-3 md:px-6 pb-1 md:pb-8 group
"
        >
          {/* Top divider line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

          {/* Footer Content */}
          <div
            className="
    grid grid-cols-2 md:grid-cols-3 
    gap-4 md:gap-8 text-gray-700 w-full
    max-w-7xl mx-auto
  "
          >
            {/* Column 1 - Logo & tagline */}
            <div className="space-y-1 md:space-y-4 col-span-2 md:col-span-1">
              <h2 className="text-lg md:text-4xl font-extrabold text-gray-700 group-hover:text-gray-900 transition-all duration-300 mb-0 md:mb-2">
                Galaxy Ecommerce
              </h2>
              <p className="text-[10px] md:text-sm leading-tight mb-0 md:mb-3">
                Shop the stars. Best deals on fashion, tech & more.
              </p>

              {/* Social icons (visible only on md and above) */}
              <div className="hidden md:flex gap-4 pt-2">
                <svg
                  className="w-6 h-6 hover:text-gray-900 cursor-pointer"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
                </svg>
                <svg
                  className="w-6 h-6 hover:text-gray-900 cursor-pointer"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5v-6h-2v-2h2V9c0-1.1.9-2 2-2h2v2h-2c-.55 0-1 .45-1 1v1.5h3l-.5 2H13v6h-2z" />
                </svg>
                <svg
                  className="w-6 h-6 hover:text-gray-900 cursor-pointer"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
                </svg>
              </div>
            </div>

            {/* Column 2 - Shop Links */}
            <div className="space-y-1 md:space-y-3">
              <h3 className="text-xs md:text-lg font-semibold text-gray-900">
                Shop
              </h3>
              <ul className="space-y-1 md:space-y-2 text-[10px] md:text-sm">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Sale
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Brands
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 - Support */}
            <div className="space-y-1 md:space-y-3">
              <h3 className="text-xs md:text-lg font-semibold text-gray-900">
                Support
              </h3>
              <ul className="space-y-1 md:space-y-2 text-[10px] md:text-sm">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* main */}
      <div className="w-[99.5%] place-self-center h-auto rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z- top-15 md:top-30 p-1 md:p-5 overflow-hidden shadow-[gray] shadow-lg shadow-black mb-60 md:mb-96">
           {/* bigimg */}
      <div className="bg-[#f7fbff] min-h-screen px-2 py-6 md:py-8 md:px-12">

  {/* Header */}
  <div className="text-center mb-12">
    <h1 className="text-3xl md:text-5xl font-extrabold text-[#265592] mb-4">Contact Us</h1>
    <p className="text-gray-700 max-w-2xl mx-auto text-sm md:text-lg">
      Have questions or need assistance? Our team is here to help! Reach out to us using the form below or through our contact details.
    </p>
  </div>

  {/* Contact Form and Info */}
  <div className="grid md:grid-cols-2 gap-8 md:gap-14 mb-12">
    {/* Contact Form */}
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-1">Name</label>
          <input 
            type="text" 
            placeholder="Your Name" 
            className="w-full p-3 rounded-xl border border-[#3f71b36c] focus:outline-none focus:ring-2 focus:ring-[#3f71b3]"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-1">Email</label>
          <input 
            type="email" 
            placeholder="Your Email" 
            className="w-full p-3 rounded-xl border border-[#3f71b36c] focus:outline-none focus:ring-2 focus:ring-[#3f71b3]"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-1">Message</label>
          <textarea 
            placeholder="Your Message" 
            className="w-full p-3 rounded-xl border border-[#3f71b36c] h-32 focus:outline-none focus:ring-2 focus:ring-[#3f71b3]"
          />
        </div>
        <button 
          type="submit" 
          className="bg-[#265592] hover:bg-[#15355e] text-white font-semibold py-3 px-6 rounded-xl w-full transition-colors duration-300"
        >
          Send Message
        </button>
      </form>
    </div>

    {/* Contact Info */}
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-[#265592] mb-2">Our Office</h3>
          <p className="text-gray-700 text-sm md:text-xl">
            123 TechBazaar Street, Tech City, Country
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[#265592] mb-2">Email</h3>
          <p className="text-gray-700 text-sm md:text-xl">support@techbazaar.com</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[#265592] mb-2">Phone</h3>
          <p className="text-gray-700 text-sm md:text-xl">+1 (234) 567-890</p>
        </div>
      </div>

      {/* Optional Image / Map */}
     <div className="mt-6 w-full h-48 md:h-64 rounded-2xl overflow-hidden">
  <iframe
    title="Vengara, Kerala Map"
    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.123456789!2d${75.982535}!3d${11.051009}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8ff…!2sVengara,+Kerala!5e0!3m2!1sen!2sin!4v1234567890`}
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="rounded-2xl"
  ></iframe>
</div>

    </div>
  </div>

  {/* Why Contact Us */}
  <div className="bg-sky-50 p-6 md:p-12 rounded-3xl shadow-lg mt-12 text-center">
    <h2 className="text-2xl md:text-4xl font-bold text-[#265592] mb-4">Why Contact Us?</h2>
    <p className="text-gray-700 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
      We are committed to providing you the best support and guidance for all your electronics needs. 
      Whether you have a question about a product, need help with your order, or want personalized recommendations, 
      our expert team is always ready to assist you. Your satisfaction is our top priority!
    </p>
  </div>

  {/* FAQ Section */}
  <div className="mt-12">
    <h2 className="text-2xl md:text-4xl font-bold text-[#265592] mb-6 text-center">Frequently Asked Questions</h2>
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h3 className="font-semibold text-[#265592] mb-2">How do I track my order?</h3>
        <p className="text-gray-700 text-sm md:text-base">
          You can track your order by logging into your account and visiting the "Orders" section. You will see the latest status and tracking info for your purchase.
        </p>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h3 className="font-semibold text-[#265592] mb-2">What payment methods do you accept?</h3>
        <p className="text-gray-700 text-sm md:text-base">
          We accept all major credit cards, debit cards, net banking, UPI, and popular digital wallets. Payment is safe and encrypted.
        </p>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h3 className="font-semibold text-[#265592] mb-2">Can I return a product?</h3>
        <p className="text-gray-700 text-sm md:text-base">
          Yes! We have a hassle-free 30-day return policy on most electronics. Simply contact our support team for assistance.
        </p>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h3 className="font-semibold text-[#265592] mb-2">Do you offer international shipping?</h3>
        <p className="text-gray-700 text-sm md:text-base">
          Currently, we ship within our country. International shipping may be available in the future. Please contact support for updates.
        </p>
      </div>
    </div>
  </div>
{/* Google Map - Vengara, Malappuram */}
<div className="mt-12 w-full h-64 md:h-96 rounded-3xl overflow-hidden shadow-lg">
  <iframe
    title="Vengara, Malappuram"
    src="https://maps.google.com/maps?q=11.051009,75.982535&z=15&output=embed"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="rounded-3xl"
  />
</div>

  {/* Footer Note */}
  <div className="text-center mt-7 text-gray-500 text-sm md:text-base">
    © {new Date().getFullYear()} TechBazaar. All rights reserved.
  </div>
</div>

      </div>

    </>  );
}
