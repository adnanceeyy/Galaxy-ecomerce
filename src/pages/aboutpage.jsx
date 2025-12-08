import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "../components/nav";
import Footer from "../components/footer";

gsap.registerPlugin(ScrollTrigger);

export default function Aboutpage() {
  const sectionRef = useRef(null);
  const stripRef = useRef(null);

  const aboutImage = [
    {
      id: 1,
      src: "https://imgs.search.brave.com/5jV5RbmpgZIjhTe16EUB98GjxcpN2xshVWy5QtlrLyc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTE0/MzIxMzE1L3Bob3Rv/L2RpdmVyc2l0eS10/aGF0LW1ha2VzLXRo/ZS10ZWFtLXdvcmsu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PTFOZl9ucEZSYmhH/Q2NKcFZONmJiQWl1/SWhGczVJWVZmbGJh/aDFLazB3ME09",
    },
    {
      id: 2,
      src: "https://imgs.search.brave.com/kkOlqTUdomPZ0qOBfHnxsT6oYRDEM7cLIzRwpbLTajU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9naWZk/Yi5jb20vaW1hZ2Vz/L2hpZ2gvd2VsY29t/ZS10by10aGUtdGVh/bS10aGUtb2ZmaWNl/LTlwbHlhOHp4czkz/anUwc3QuZ2lm.gif",
    },
    {
      id: 3,
      src: "https://imgs.search.brave.com/MZcdSLmLm9oDqeRYrx_aYBp4IQ-OhsrXbG72tGGiDZs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE4/NDIzNzU5My9waG90/by9zbWlsaW5nLW1h/bGUtYW5kLWZlbWFs/ZS1kdW8taW4tYnVz/aW5lc3MtYXR0aXJl/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz0xUnpiY0lDTkhN/U3dwY3JvbWhVSGVz/MHJTcjV0aUFBR1FR/aXp5dWpzWTlnPQ",
    },
    {
      id: 4,
      src: "https://imgs.search.brave.com/G7Y0SXLjEQqxILjphCb9degMAA7MkbXA_MFObd83VFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9naWZk/Yi5jb20vaW1hZ2Vz/L2hpZ2gvd2VsY29t/ZS10by10aGUtdGVh/bS15b3VuZy1lZHVj/YXRvcnMtZzV0OHZi/NmRpZjJ4bXpjMS5n/aWY.gif",
    },
    {
      id: 5,
      src: "https://imgs.search.brave.com/W8aWzxeWuZchJ96B112-Y_fJ5PhEs4zKJHe3poMcS-Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE5/ODE5MzM0NS9waG90/by9wcm91ZC1pbmRp/YW4tY2VvLXBvc2lu/Zy13aXRoLXNtaWxp/bmctY29tcGFueS1z/dGFmZi1pbi1vZmZp/Y2UuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPU9ub3J6R1Nr/Yk8tZE16NVVHMmdF/X0wzSHpfMlVGajVj/eExYak5TR054NWc9",
    },
    {
      id: 6,
      src: "https://imgs.search.brave.com/7g9NO8J4fYIQLB7FTvDh0wBdjeRy8eOaIzHY6Iv3kvg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE1/MjcxOTc4Ni9waG90/by9tdWx0aWN1bHR1/cmFsLWNvcnBvcmF0/ZS10ZWFtLWluLWEt/bW9kZXJuLW9mZmlj/ZS1lbnZpcm9ubWVu/dC1kaXZlcnNpdHkt/YW5kLXRlYW13b3Jr/LWluLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1OQlcxTGZB/Z2hUZUxVbGFEc1Rl/cGRRNGVaYVdNWHc4/YWhmM0xDZmNHcXVr/PQ",
    },
    {
      id: 7,
      src: "https://imgs.search.brave.com/P26-7ssMPt5laWKkRULLHXYPXNt4HvcWWhzpSjOHSjA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE0/ODEyMjM2Ny9waG90/by9zbWlsaW5nLXBy/b2Zlc3Npb25hbC13/b21hbi13aXRoLXN1/cHBvcnRpdmUtdGVh/bS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9bTNBYjEyVHdK/SjU0c3djcXFYR0Zk/emZnZHlHRW5aWkds/VTU3NDBBdmRFQT0",
    },
  ];

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="h-screen w-full bg-gradient-to-br from-[#7db9d1] to-[#5294ad] fixed top-0 -z-10" />
      <div className="w-[99.5%] place-self-center h-auto rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z-10 top-15 md:top-30 p-1 md:p-5 overflow-hidden shadow-[gray] shadow-lg shadow-black mb-60 md:mb-96">
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
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#265592] mb-6 text-center">
                Our Journey
              </h2>
              <p className="text-gray-700 text-sm md:text-base mx-auto leading-relaxed space-y-4">
                TechBazaar began its journey over a decade ago with a simple
                mission: to make high-quality electronics accessible to
                everyone. What started as a small startup operating from a
                modest office quickly grew into a trusted online electronics
                marketplace, serving thousands of customers across the country.
                Through dedication, innovation, and a relentless focus on
                customer satisfaction, we expanded our product range from basic
                gadgets to cutting-edge smart devices, computers, and home
                electronics. Each year, we introduced new technologies,
                partnered with leading brands, and invested in creating a
                seamless online shopping experience. Today, TechBazaar is proud
                to be recognized as a leader in the electronics e-commerce
                space, known for our commitment to quality, fast delivery, and
                exceptional customer support. Our journey is a testament to our
                passion for technology and our unwavering dedication to
                empowering our customers with products that enhance their
                everyday lives. And this is just the beginning – we continue to
                innovate, grow, and strive for excellence in everything we do.
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
                <h2 className="text-xl md:text-2xl font-bold text-[#265592] mb-2">
                  Our Mission
                </h2>
                <p className="text-gray-700 text-sm md:text-base">
                  To empower our customers with cutting-edge technology and
                  exceptional electronics products, making life smarter and
                  easier.
                </p>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center md:text-left">
                <img
                  src="https://imgs.search.brave.com/WBlT0SCjTXfEBKV4WOnTi0oRzRdVAtL3tJJKGvWZ3WU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNzEv/NTk2LzI3Ny9zbWFs/bC9idXNpbmVzcy12/aXNpb24tYnVzaW5l/c3NtYW4tZ2F6ZXMt/dGhyb3VnaC1iaW5v/Y3VsYXJzLWZyb20t/aGlzLWxhcmdlLWV5/ZS12ZWN0b3IuanBn"
                  alt="Vision"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl md:text-2xl font-bold text-[#265592] mb-2">
                  Our Vision
                </h2>
                <p className="text-gray-700 text-sm md:text-base">
                  To be the most trusted online electronics store, delivering
                  not just products but a seamless shopping experience and
                  customer delight.
                </p>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-t border-sky-100 my-12" />

            {/* Why Choose Us */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#265592] mb-6 md:mb-8">
                Why Choose Us
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="p-4 md:p-6 border border-sky-100 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <img
                    src="https://img.icons8.com/fluency/96/000000/checked.png"
                    alt="Quality"
                    className="mx-auto mb-3 md:mb-4"
                  />
                  <h3 className="text-lg md:text-xl font-semibold text-[#265592] mb-1 md:mb-2">
                    Top Quality
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Every product is carefully selected to meet high standards
                    of quality and performance.
                  </p>
                </div>

                <div className="p-4 md:p-6 border border-sky-100 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <img
                    src="https://img.icons8.com/fluency/96/000000/delivery.png"
                    alt="Fast Delivery"
                    className="mx-auto mb-3 md:mb-4"
                  />
                  <h3 className="text-lg md:text-xl font-semibold text-[#265592] mb-1 md:mb-2">
                    Fast Delivery
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Reliable and fast delivery ensures your gadgets reach you
                    safely and on time.
                  </p>
                </div>

                <div className="p-4 md:p-6 border border-sky-100 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <img
                    src="https://img.icons8.com/fluency/96/000000/customer-support.png"
                    alt="Support"
                    className="mx-auto mb-3 md:mb-4"
                  />
                  <h3 className="text-lg md:text-xl font-semibold text-[#265592] mb-1 md:mb-2">
                    24/7 Support
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    Our expert team is always available to assist you before and
                    after your purchase.
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
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#265592] mb-3 md:mb-4">
                  Our Story
                </h2>
                <p className="text-gray-700 text-sm md:text-base mb-2 mr-10 md:mb-4">
                  TechBazaar started with a vision to make advanced technology
                  accessible to everyone. Over the years, we have grown into a
                  leading online electronics store trusted by thousands of
                  customers.
                </p>
                <p className="text-gray-700 text-sm md:text-base  mr-10">
                  Our passion for technology drives us to constantly update our
                  catalog with the latest gadgets, ensuring that our customers
                  always get the best products on the market. Our passion for
                  technology drives us to constantly update our catalog with the
                  latest gadgets, ensuring that our customers always get the
                  best products on the market. Our passion for technology drives
                  us to constantly update our catalog with the latest gadgets,
                  ensuring that our customers always get the best products on
                  the market.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
