import React, { useEffect } from "react";
import { IconAward, IconWorld, IconUsers, IconLeaf } from "@tabler/icons-react";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* Hero */}
      <section className="relative h-[300px] flex items-center justify-center bg-primary overflow-hidden">
         <div className="absolute inset-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop" alt="Office" className="w-full h-full object-cover" />
         </div>
         <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-3">Our Story</h1>
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
               Redefining the digital shopping experience since 2026.
            </p>
         </div>
      </section>

      {/* Mission */}
      <section className="py-12 md:py-16 max-w-[1200px] mx-auto px-4 md:px-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
               <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">Mission & Vision</h2>
               <p className="text-gray-600 leading-relaxed mb-6 font-medium text-lg">
                  At Eleckyo, we believe technology should be accessible, reliable, and beautiful.
               </p>
               <p className="text-gray-600 leading-relaxed mb-6">
                  Founded with a vision to streamline the global electronics market, we curate only the best products that meet strict quality standards. We are committed to providing a seamless shopping experience backed by world-class customer support.
               </p>
               <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                     <h3 className="text-4xl font-bold text-accent mb-2">50k+</h3>
                     <p className="text-gray-500 font-medium">Happy Customers</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                     <h3 className="text-4xl font-bold text-accent mb-2">100+</h3>
                     <p className="text-gray-500 font-medium">Global Brands</p>
                  </div>
               </div>
            </div>
            <div className="relative">
               <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop" alt="Team" className="rounded-2xl shadow-2xl" />
               <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl hidden md:block">
                  <p className="font-serif italic text-xl text-primary">"Quality is not an act, it is a habit."</p>
               </div>
            </div>
         </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-12 md:py-16">
         <div className="max-w-[1200px] mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Our Core Values</h2>
               <p className="text-gray-500 max-w-2xl mx-auto">The principles that guide everything we do.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {[
                  { icon: IconAward, title: "Excellence", desc: "We never settle for less than the best in quality and service." },
                  { icon: IconWorld, title: "Global Reach", desc: "Connecting innovative tech with enthusiasts worldwide." },
                  { icon: IconUsers, title: "Customer First", desc: "Your satisfaction is our top priority, every single time." },
                  { icon: IconLeaf, title: "Sustainability", desc: "Committed to eco-friendly packaging and responsible sourcing." },
               ].map((item, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
                     <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                        <item.icon size={32} />
                     </div>
                     <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                     <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
};

export default AboutPage;
