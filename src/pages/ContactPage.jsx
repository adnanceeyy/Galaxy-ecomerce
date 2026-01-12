import React, { useEffect } from "react";
import { IconMapPin, IconPhone, IconMail, IconClock } from "@tabler/icons-react";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans pt-6 pb-12">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
           <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Contact Us</h1>
           <p className="text-base text-gray-600">
              We'd love to hear from you. Whether you have a question about our products, orders, or just want to share feedback, our team is ready to help.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
           
           {/* Info Side */}
           <div className="space-y-10">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                 <h3 className="text-2xl font-bold font-serif text-primary mb-6">Get in Touch</h3>
                 <ul className="space-y-6">
                    <li className="flex gap-4">
                       <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <IconMapPin size={24} />
                       </div>
                       <div>
                          <h4 className="font-bold text-gray-900">Headquarters</h4>
                          <p className="text-gray-600">123 Tech Park, Innovation Street<br/>Silicon Valley, CA, USA</p>
                       </div>
                    </li>
                    <li className="flex gap-4">
                       <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <IconPhone size={24} />
                       </div>
                       <div>
                          <h4 className="font-bold text-gray-900">Phone</h4>
                          <p className="text-gray-600">+1 (800) 123-4567</p>
                          <p className="text-gray-500 text-sm">Mon-Fri 9am-6pm PST</p>
                       </div>
                    </li>
                    <li className="flex gap-4">
                       <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <IconMail size={24} />
                       </div>
                       <div>
                          <h4 className="font-bold text-gray-900">Email</h4>
                          <p className="text-gray-600">support@eleckyo.com</p>
                          <p className="text-gray-600">sales@eleckyo.com</p>
                       </div>
                    </li>
                 </ul>
              </div>

               <div className="bg-primary text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                 <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><IconClock size={24} /> Business Hours</h3>
                    <ul className="space-y-2 opacity-90">
                       <li className="flex justify-between border-b border-white/20 pb-2"><span>Monday - Friday</span> <span>9:00 AM - 6:00 PM</span></li>
                       <li className="flex justify-between border-b border-white/20 pb-2"><span>Saturday</span> <span>10:00 AM - 4:00 PM</span></li>
                       <li className="flex justify-between"><span>Sunday</span> <span>Closed</span></li>
                    </ul>
                 </div>
                 <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-accent rounded-full opacity-20 blur-3xl"></div>
              </div>
           </div>

           {/* Form Side */}
           <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold font-serif text-primary mb-6">Send us a Message</h3>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message Sent!'); }}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                       <label className="block text-xs font-bold text-gray-700 uppercase mb-2">First Name</label>
                       <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" placeholder="John" required />
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Last Name</label>
                       <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" placeholder="Doe" required />
                    </div>
                 </div>
                 
                 <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Email Address</label>
                    <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" placeholder="john@example.com" required />
                 </div>

                 <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Phone (Optional)</label>
                    <input type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" placeholder="+1 (555) 000-0000" />
                 </div>

                 <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Message</label>
                    <textarea rows="4" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" placeholder="How can we help you?" required></textarea>
                 </div>

                 <button type="submit" className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-primary/30 transition">
                    Send Message
                 </button>
              </form>
           </div>
           
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
