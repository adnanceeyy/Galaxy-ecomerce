import React from "react";
import Nav from "../components/nav";

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-br from-[#f7fbff] to-[#e2f1ff] min-h-screen">
      <Nav />

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-20 md:py-30">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800">
            Let’s Connect With Us
          </h1>
          <p className="text-gray-600 mt-3 text-sm md:text-lg max-w-2xl mx-auto">
            We’re always here to help you with your orders, products, or any
            support you need. Reach out anytime — we’d love to hear from you.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Side - Image */}
          <div className="relative flex justify-center items-center">
            <img
              src="https://img.freepik.com/free-vector/contact-us-concept-illustration_114360-2299.jpg"
              alt="Contact illustration"
              className="w-[90%] md:w-[80%] rounded-3xl shadow-lg hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 md:p-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-5">
              <div>
                <label className="text-gray-700 text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full mt-1 p-3 border rounded-lg outline-none text-gray-700 focus:ring-2 focus:ring-[#0f76bb] transition-all"
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full mt-1 p-3 border rounded-lg outline-none text-gray-700 focus:ring-2 focus:ring-[#0f76bb] transition-all"
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm font-medium">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full mt-1 p-3 border rounded-lg outline-none text-gray-700 focus:ring-2 focus:ring-[#0f76bb] transition-all"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0f76bb] hover:bg-[#0c5f96] text-white py-3 rounded-lg font-semibold text-base shadow-md transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              📍 Address
            </h3>
            <p className="text-gray-600 text-sm">
              123 Market Street, Kochi, Kerala 682001, India
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              📞 Call Us
            </h3>
            <p className="text-gray-600 text-sm">
              +91 98765 43210 <br />
              support@techmart.com
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              🕒 Working Hours
            </h3>
            <p className="text-gray-600 text-sm">
              Mon–Sat: 9:00 AM – 8:00 PM <br />
              Sunday: Closed
            </p>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-12 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            title="store-location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.12350845321!2d76.2673!3d9.9312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0873c222b6df67%3A0x9b64a82e87769c3e!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1689865432109!5m2!1sen!2sin"
            width="100%"
            height="350"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
