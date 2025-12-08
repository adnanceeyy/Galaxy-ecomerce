import React, { useState, useEffect } from "react";
import Nav from "../components/nav";
import Footer from "../components/footer";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // WhatsApp handler
  const handleWhatsApp = (e) => {
    e.preventDefault();

    // Add country code here
    const phoneNumber = "917034887478";

    // Build the message string
    const text = `Hello! 👋%0AName: ${name}%0AEmail: ${email}%0AMessage: ${message}`;

    // Open WhatsApp link
    const url = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(url, "_blank");

    // Optional: clear the form after sending
    setName("");
    setEmail("");
    setMessage("");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="h-screen w-full bg-gradient-to-br from-[#7db9d1] to-[#5294ad] md:pb-[400px] fixed top-0"></div>

      <div className="w-[99.5%] place-self-center h-auto rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z-10 top-15 md:top-30 p-1 md:p-5 overflow-hidden shadow-[gray] shadow-lg shadow-black mb-60 md:mb-96">
        <div className="bg-[#f7fbff] min-h-screen px-2 py-6 md:py-8 md:px-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#265592] mb-4">
              Contact Us
            </h1>
            <p className="text-gray-700 max-w-2xl mx-auto text-sm md:text-lg">
              Have questions or need assistance? Our team is here to help! Reach
              out to us using the form below or through our contact details.
            </p>
          </div>

          {/* Contact Form & Info */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-14 mb-12">
            {/* Contact Form */}
            <div className="bg-white p-6 md:p-10 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <form className="space-y-4" onSubmit={handleWhatsApp}>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#3f71b36c] focus:outline-none focus:ring-2 focus:ring-[#3f71b3]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#3f71b36c] focus:outline-none focus:ring-2 focus:ring-[#3f71b3]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">
                    Message
                  </label>
                  <textarea
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#3f71b36c] h-32 focus:outline-none focus:ring-2 focus:ring-[#3f71b3]"
                    required
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
                  <h3 className="text-2xl font-bold text-[#265592] mb-2">
                    Our Office
                  </h3>
                  <p className="text-gray-700 text-sm md:text-xl">
                    Vengara, Malappuram, Kerala
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#265592] mb-2">
                    Email
                  </h3>
                  <p className="text-gray-700 text-sm md:text-xl">
                    support@elekyo.com
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#265592] mb-2">
                    Phone
                  </h3>
                  <p className="text-gray-700 text-sm md:text-xl">
                    +91 7034887478
                  </p>
                </div>
              </div>

              <div className="mt-6 w-full h-48 md:h-64 rounded-2xl overflow-hidden">
                <iframe
                  title="Vengara, Kerala Map"
                  src="https://maps.google.com/maps?q=11.051009,75.982535&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Why Contact Us */}
          <div className="bg-sky-50 p-6 md:p-12 rounded-3xl shadow-lg mt-12 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-[#265592] mb-4">
              Why Contact Us?
            </h2>
            <p className="text-gray-700 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
              We are committed to providing you the best support and guidance
              for all your electronics needs. Whether you have a question about
              a product, need help with your order, or want personalized
              recommendations, our expert team is always ready to assist you.
              Your satisfaction is our top priority!
            </p>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#265592] mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="font-semibold text-[#265592] mb-2">
                  How do I track my order?
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  You can track your order by logging into your account and
                  visiting the "Orders" section. You will see the latest status
                  and tracking info for your purchase.
                </p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="font-semibold text-[#265592] mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  We accept all major credit cards, debit cards, net banking,
                  UPI, and popular digital wallets. Payment is safe and
                  encrypted.
                </p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="font-semibold text-[#265592] mb-2">
                  Can I return a product?
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  Yes! We have a hassle-free 30-day return policy on most
                  electronics. Simply contact our support team for assistance.
                </p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="font-semibold text-[#265592] mb-2">
                  Do you offer international shipping?
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  Currently, we ship within our country. International shipping
                  may be available in the future. Please contact support for
                  updates.
                </p>
              </div>
            </div>
          </div>

          {/* Google Map */}
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
            © {new Date().getFullYear()} elekyo. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
}
