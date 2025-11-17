import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "../components/nav";

gsap.registerPlugin(ScrollTrigger);

export default function Aboutpage() {
  const sectionRef = useRef(null);
  const stripRef = useRef(null);

  const aboutImage = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    src: "https://imgs.search.brave.com/vIkDTNoKW7XMMyQwXB7JhDuEx1Bn2WyNvLg15JJEd9k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2NhLzFm/LzBkL2NhMWYwZDhm/YjAyOWI5NDkyNDAy/MDNjODc5NDU0YzEx/LmpwZw",
  }));

  useEffect(() => {
    const section = sectionRef.current;
    const strip = stripRef.current;
    if (!section || !strip) return;

    const scrollDistance = strip.scrollWidth - window.innerWidth;
    if (scrollDistance <= 0) return;

    gsap.to(strip, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: () => (window.innerWidth >= 768 ? "top 13%" : "top 7%"),
        end: () => `+=${scrollDistance}`,
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [aboutImage.length]);

  return (
    <>
      <Nav />
      <div className="h-screen w-full bg-gradient-to-br from-[#7db9d1] to-[#5294ad] fixed top-0 -z-10" />
      <div
          className="
  fixed bottom-0 w-full md:w-[90.5%] 
  bg-[#f7fbff] border border-[#3f3f3f50] 
  rounded-t-[30px] md:rounded-t-[80px]
  place-self-center transition-all duration-300
  md:hover:w-[99.5%] md:hover:h-[240px]
  h-[160px] md:h-[230px] flex flex-col justify-end
  px-3 md:px-8 pb-3 md:pb-8 group
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
              <h2 className="text-lg md:text-4xl font-extrabold text-gray-700 group-hover:text-gray-900 transition-all duration-300">
                Galaxy Ecommerce
              </h2>
              <p className="text-[10px] md:text-sm leading-tight">
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

      <div className="w-[99.5%] place-self-center h-auto rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z- top-15 md:top-30 p-1 md:p-5 overflow-hidden shadow-[gray] shadow-lg shadow-black mb-60 md:mb-96">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
          About <span className="text-[#2e628b] font-extrabold">Us</span>
        </h1>

        <section ref={sectionRef} className="w-full overflow-hidden relative">
          <div
            ref={stripRef}
            className="inline-flex gap-2 h-[170px] md:h-[300px] mb-6"
            style={{ willChange: "transform" }}
          >
            {aboutImage.map((img) => (
              <img
                key={img.id}
                src={img.src}
                alt={`about-${img.id}`}
                className="h-full w-auto object-cover rounded-lg shadow-md"
                draggable="false"
              />
            ))}
          </div>

          {/* Bottom content under images */}
        <div className="bg-transparent px-2 md:px-2">
  {/* Our Journey */}
  <div className="bg-white p-6 md:p-12 mt-1 rounded-lg shadow-lg">
    <h2 className="text-3xl md:text-4xl font-extrabold text-[#265592] mb-6 text-center">Our Journey</h2>
    <p className="text-gray-700 text-sm md:text-base mx-auto leading-relaxed space-y-4">
      TechBazaar began its journey over a decade ago with a simple mission: to make high-quality electronics 
      accessible to everyone. What started as a small startup operating from a modest office quickly grew into 
      a trusted online electronics marketplace, serving thousands of customers across the country. Through 
      dedication, innovation, and a relentless focus on customer satisfaction, we expanded our product range 
      from basic gadgets to cutting-edge smart devices, computers, and home electronics. Each year, we 
      introduced new technologies, partnered with leading brands, and invested in creating a seamless 
      online shopping experience. Today, TechBazaar is proud to be recognized as a leader in the electronics 
      e-commerce space, known for our commitment to quality, fast delivery, and exceptional customer support. 
      Our journey is a testament to our passion for technology and our unwavering dedication to empowering 
      our customers with products that enhance their everyday lives. And this is just the beginning – we continue 
      to innovate, grow, and strive for excellence in everything we do.
    </p>
  </div>

  {/* Divider */}
  <hr className="border-t border-sky-100 my-12" />

  {/* Our Mission & Vision */}
  <div className="grid gap-8 md:grid-cols-2 mb-12 md:mb-16">
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center md:text-left">
      <img 
        src="https://imgs.search.brave.com/uPJNt5feJ8MUMwSV5Cn5C20Ql4StcE-JIwicWRz5tQ8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/aGFuZC1kcmF3bi1v/dXItbWlzc2lvbi1j/b25jZXB0LWlsbHVz/dHJhdGVkXzIzLTIx/NDkxMDQyNTkuanBn/P3NlbXQ9YWlzX2lu/Y29taW5nJnc9NzQw/JnE9ODA" 
        alt="Mission" 
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl md:text-2xl font-bold text-[#265592] mb-2">Our Mission</h2>
      <p className="text-gray-700 text-sm md:text-base">
        To empower our customers with cutting-edge technology and exceptional electronics products, making life smarter and easier.
      </p>
    </div>

    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center md:text-left">
      <img 
        src="https://imgs.search.brave.com/WBlT0SCjTXfEBKV4WOnTi0oRzRdVAtL3tJJKGvWZ3WU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNzEv/NTk2LzI3Ny9zbWFs/bC9idXNpbmVzcy12/aXNpb24tYnVzaW5l/c3NtYW4tZ2F6ZXMt/dGhyb3VnaC1iaW5v/Y3VsYXJzLWZyb20t/aGlzLWxhcmdlLWV5/ZS12ZWN0b3IuanBn" 
        alt="Vision" 
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl md:text-2xl font-bold text-[#265592] mb-2">Our Vision</h2>
      <p className="text-gray-700 text-sm md:text-base">
        To be the most trusted online electronics store, delivering not just products but a seamless shopping experience and customer delight.
      </p>
    </div>
  </div>

  {/* Divider */}
  <hr className="border-t border-sky-100 my-12" />

  {/* Why Choose Us */}
  <div className="text-center mb-12 md:mb-16">
    <h2 className="text-2xl md:text-4xl font-extrabold text-[#265592] mb-6 md:mb-8">Why Choose Us</h2>
    <div className="grid gap-6 md:grid-cols-3">
      <div className="p-4 md:p-6 border border-sky-100 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
        <img 
          src="https://img.icons8.com/fluency/96/000000/checked.png" 
          alt="Quality" 
          className="mx-auto mb-3 md:mb-4"
        />
        <h3 className="text-lg md:text-xl font-semibold text-[#265592] mb-1 md:mb-2">Top Quality</h3>
        <p className="text-gray-700 text-sm md:text-base">
          Every product is carefully selected to meet high standards of quality and performance.
        </p>
      </div>

      <div className="p-4 md:p-6 border border-sky-100 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
        <img 
          src="https://img.icons8.com/fluency/96/000000/delivery.png" 
          alt="Fast Delivery" 
          className="mx-auto mb-3 md:mb-4"
        />
        <h3 className="text-lg md:text-xl font-semibold text-[#265592] mb-1 md:mb-2">Fast Delivery</h3>
        <p className="text-gray-700 text-sm md:text-base">
          Reliable and fast delivery ensures your gadgets reach you safely and on time.
        </p>
      </div>

      <div className="p-4 md:p-6 border border-sky-100 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
        <img 
          src="https://img.icons8.com/fluency/96/000000/customer-support.png" 
          alt="Support" 
          className="mx-auto mb-3 md:mb-4"
        />
        <h3 className="text-lg md:text-xl font-semibold text-[#265592] mb-1 md:mb-2">24/7 Support</h3>
        <p className="text-gray-700 text-sm md:text-base">
          Our expert team is always available to assist you before and after your purchase.
        </p>
      </div>
    </div>
  </div>

  {/* Divider */}
  <hr className="border-t border-sky-100 my-12" />

  {/* Our Story */}
  <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 mb-12 md:mb-16">
    <div className="w-full md:w-1/2">
      <img 
        src="https://imgs.search.brave.com/sZh-f8mHvWNCCaRW2vYAPD-rFCVMBRu2b4_lxk6O3Go/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE1/OTgwNzE0MS92ZWN0/b3IvYnJhbmQtc3Rv/cnl0ZWxsaW5nLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz16/UWJDS2dmV1AzdTNh/cHpidmp2VnNpeWU4/TFNFc1ZhZ1FDSHla/TjZ0SmhvPQ" 
        alt="Our Story" 
        className="rounded-lg shadow-lg w-full"
      />
    </div>
    <div className="w-full md:w-1/2">
      <h2 className="text-2xl md:text-3xl font-extrabold text-[#265592] mb-3 md:mb-4">Our Story</h2>
      <p className="text-gray-700 text-sm md:text-base mb-2 md:mb-4">
        TechBazaar started with a vision to make advanced technology accessible to everyone. 
        Over the years, we have grown into a leading online electronics store trusted by thousands of customers.
      </p>
      <p className="text-gray-700 text-sm md:text-base">
        Our passion for technology drives us to constantly update our catalog with the latest gadgets, 
        ensuring that our customers always get the best products on the market.
        Our passion for technology drives us to constantly update our catalog with the latest gadgets, 
        ensuring that our customers always get the best products on the market.
        Our passion for technology drives us to constantly update our catalog with the latest gadgets, 
        ensuring that our customers always get the best products on the market.
      </p>
    </div>
  </div>
</div>

        </section>
      </div>
    </>
  );
}
