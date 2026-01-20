import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  IconArrowRight,
  IconTruck,
  IconShieldCheck,
  IconHeadset,
  IconCreditCard,
  IconChevronLeft,
  IconChevronRight,
  IconClock,
  IconStar,
  IconMail
} from "@tabler/icons-react";
import axios from "axios";
import { API_URL, BACKEND_BASE, getImageUrl } from "../config/api";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState({ hours: 12, minutes: 45, seconds: 30 });
  const [categories, setCategories] = useState([]);
  const [offerImage, setOfferImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch Products
        const productRes = await axios.get(`${API_URL}/products`);
        setFeaturedProducts(productRes.data.slice(0, 8));
        setNewArrivals(productRes.data.slice(-8).reverse());

        // Fetch Categories
        const categoryRes = await axios.get(`${API_URL}/categories`);
        setCategories(categoryRes.data);

        // Fetch Settings (Offer Image)
        const settingsRes = await axios.get(`${API_URL}/settings`);
        if (settingsRes.data.homePageOfferImage) {
          setOfferImage(settingsRes.data.homePageOfferImage);
        }

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);

    // Mock Countdown Timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollContainerRef = useRef(null);
  const newArrivalsRef = useRef(null);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const { current } = ref;
      const scrollAmount = 300;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[400px] md:h-[500px] bg-primary flex items-center overflow-hidden">
        {/* Background Image/Overlay */}
        <div className="absolute inset-0 z-0 opacity-100">
          {/* If offerImage exists, use it. Else fallback to default */}
          <img
            src={getImageUrl(offerImage, "./assets/images/add1.jpg")}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent z-10"></div>

        <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-20 w-full text-white">
          <div className="max-w-2xl space-y-6">
            <span className="inline-block px-4 py-1 border border-white/30 rounded-full text-xs font-bold tracking-widest uppercase bg-white/10 backdrop-blur-md">
              New Arrivals 2026
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
              Upgrade Your <br /> <span className="text-accent">Digital Life</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg">
              Experience superior performance with our latest collection of premium gadgets and accessories.
            </p>
            <div className="flex gap-4 pt-4">
              <Link to="/allProduct" className="px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-accent/40 flex items-center gap-2">
                Shop Now <IconArrowRight size={20} />
              </Link>
              <Link to="/about" className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg backdrop-blur-sm transition-all border border-white/20">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES STRIP */}
      <div className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: IconTruck, title: "Free Shipping", desc: "On all orders over ₹4999" },
              { icon: IconShieldCheck, title: "Secure Payment", desc: "100% secure payment" },
              { icon: IconHeadset, title: "24/7 Support", desc: "Dedicated support team" },
              { icon: IconCreditCard, title: "Money Back", desc: "30-day return guarantee" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent shadow-sm border border-gray-100 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <item.icon size={24} stroke={1.5} />
                </div>
                <div>
                  <h4 className="font-bold text-primary">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. NEW ARRIVALS HORIZONTAL */}
      <section className="py-16 md:py-24 max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">New Arrivals</h2>
            <p className="text-gray-500">The latest tech in our store</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll(newArrivalsRef, 'left')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-primary hove:bg-accent hover:text-white hover:border-accent transition-all">
              <IconChevronLeft size={20} />
            </button>
            <button onClick={() => scroll(newArrivalsRef, 'right')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-primary hover:bg-accent hover:text-white hover:border-accent transition-all">
              <IconChevronRight size={20} />
            </button>
          </div>
        </div>

        <div ref={newArrivalsRef} className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x">
          {newArrivals.map((product) => (
            <Link to={`/singleProduct/${product.id}`} key={product.id} className="flex-shrink-0 w-[280px] group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 snap-start">
              <div className="relative h-48 p-4 flex items-center justify-center bg-gray-50/50">
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  className="h-full w-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">New</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-primary mb-1 line-clamp-1 group-hover:text-accent transition-colors">{product.name}</h3>
                <p className="text-lg font-bold text-primary">₹{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FLASH DEALS */}
      <section className="bg-primary py-16 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 skew-x-12 translate-x-1/2"></div>
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">Flash Sale Live <br /> <span className="text-accent underline decoration-4 underline-offset-8">Grab Your Deal</span></h2>
            <div className="flex gap-4">
              {[
                { label: "Hrs", val: countdown.hours },
                { label: "Min", val: countdown.minutes },
                { label: "Sec", val: countdown.seconds },
              ].map((time, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-3xl font-bold border border-white/20">
                    {time.val.toString().padStart(2, '0')}
                  </div>
                  <span className="text-xs mt-2 text-gray-300 font-bold uppercase tracking-widest">{time.label}</span>
                </div>
              ))}
            </div>
            <Link to="/allProduct" className="inline-block px-10 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-transform transform hover:-translate-y-1 shadow-lg shadow-accent/30">
              Explore Deals
            </Link>
          </div>
          <div className="flex-1 w-full max-w-lg">
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/20">
                  <IconClock size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">Top Rated Deal</h3>
                  <p className="text-gray-400 text-sm">Hurry, only a few items left!</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-gray-300">Headphones Max Pro</span>
                  <span className="text-accent font-bold font-serif italic text-xl">40% OFF</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-gray-300">Smart Band X7</span>
                  <span className="text-accent font-bold font-serif italic text-xl">55% OFF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SHOP BY CATEGORY */}
      <section className="py-12 md:py-16 max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-2">Shop by Category</h2>
            <p className="text-gray-500 text-sm">Explore our wide range of products</p>
          </div>
          <Link to="/allProduct" className="text-accent text-sm font-bold hover:underline">View All Categories</Link>
        </div>

        <div className="relative group px-1">
          <button
            onClick={() => scroll(scrollContainerRef, 'left')}
            className="absolute left-0 top-1/2 -translate-y-12 z-20 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50 border border-gray-100 hidden md:flex hover:bg-gray-50"
            aria-label="Scroll Left"
          >
            <IconChevronLeft size={20} />
          </button>

          <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x px-2 py-4">
            {categories.map((cat) => (
              <Link key={cat._id || cat.id} to={`/category/${cat._id || cat.id}`} className="flex-shrink-0 flex flex-col items-center gap-2 group/item cursor-pointer snap-start w-24 md:w-32">
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md group-hover/item:shadow-xl transition-all duration-300 ring-4 ring-white group-hover/item:ring-accent/20">
                  <div className="absolute inset-0 bg-gray-100">
                    <span className="absolute inset-0 flex items-center justify-center text-4xl">{cat.icon || "📦"}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover/item:bg-black/0 transition-colors duration-300"></div>
                </div>
                <div className="text-center pt-2">
                  <h3 className="font-bold text-xs md:text-sm text-primary group-hover/item:text-accent transition-colors">{cat.name}</h3>
                  {cat.products !== undefined && <p className="text-[10px] text-gray-400">{cat.products} Products</p>}
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={() => scroll(scrollContainerRef, 'right')}
            className="absolute right-0 top-1/2 -translate-y-12 z-20 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50 border border-gray-100 hidden md:flex hover:bg-gray-50"
            aria-label="Scroll Right"
          >
            <IconChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* 6. FEATURED PRODUCTS GRID */}
      <section className="bg-gray-50 py-16 md:py-24 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">Featured Products</h2>
              <p className="text-gray-500">Top picks for you this week</p>
            </div>
            <Link to="/allProduct" className="hidden md:flex items-center gap-1 text-accent font-semibold hover:text-accent-hover transition">
              View All <IconArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg h-[280px] md:h-[400px] animate-pulse"></div>
              ))
            ) : (
              featuredProducts.map((product) => (
                <Link to={`/singleProduct/${product.id}`} key={product.id} className="group bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col">
                  {/* Image */}
                  <div className="relative h-40 md:h-64 bg-white p-4 md:p-6 flex items-center justify-center overflow-hidden">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="h-full w-full object-contain transform group-hover:scale-110 transition-transform duration-500 will-change-transform"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/300?text=No+Image")}
                    />
                    {product.isNew && (
                      <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">New</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="text-xs text-gray-400 mb-1">{product.category || "Electronics"}</div>
                    <h3 className="font-bold text-primary text-lg mb-2 line-clamp-1 group-hover:text-accent transition-colors">{product.name}</h3>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">₹{product.price}</span>
                      <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors">
                        <IconArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link to="/allProduct" className="px-6 py-3 border border-gray-300 rounded-lg text-primary font-bold inline-block hover:border-primary transition">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* 7. PROMO BANNER */}
      <section className="py-8 md:py-16 mx-4">
        <div className="max-w-[1200px] mx-auto rounded-2xl bg-secondary overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2000')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10 px-8 py-16 md:py-24 text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Summer Sale is Live</h2>
            <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Get up to 50% off on premium headphones and smartwatches. Limited time offer.
            </p>
            <Link to="/allProduct" className="inline-block px-10 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition shadow-lg transform hover:-translate-y-1">
              Shop The Sale
            </Link>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">What Our Clients Say</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Adnan Cholayil", role: "UI Designer", text: "The quality of the products is unmatched. I bought a headset and the sound clarity is amazing!", rating: 5 },
              { name: "Rahul S.", role: "Tech Enthusiast", text: "Fast shipping and secure packaging. Eleckyo is now my go-to for all tech needs.", rating: 5 },
              { name: "Priya M.", role: "Graphic Artist", text: "Customer support helped me choose the right laptop for my design work. Very satisfied!", rating: 4 },
            ].map((test, i) => (
              <div key={i} className="p-8 bg-gray-50 rounded-2xl border border-gray-100 relative group hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="flex gap-1 mb-4 text-accent">
                  {[...Array(test.rating)].map((_, j) => <IconStar key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 italic mb-6 leading-relaxed">"{test.text}"</p>
                <div>
                  <h4 className="font-bold text-primary">{test.name}</h4>
                  <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">{test.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BRAND STORY */}
      <section className="py-24 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 relative">
            <div className="w-full h-[400px] bg-gray-200 rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000" alt="Our Store" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent rounded-2xl flex flex-col items-center justify-center text-white p-6 shadow-xl hidden md:flex">
              <span className="text-4xl font-bold font-serif italic tracking-tighter">10+</span>
              <span className="text-center font-bold text-xs uppercase tracking-widest leading-tight">Years of <br /> Excellence</span>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary leading-tight">We Believe in Tech <br /> <span className="text-accent underline decoration-2 underline-offset-4">That Empowers</span></h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Founded with a vision to make premium technology accessible to everyone, Eleckyo has grown from a small local shop to a leading destination for digital lifestyle enthusiasts.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <h4 className="font-bold text-primary mb-1">Our Mission</h4>
                <p className="text-sm text-gray-500">To provide cutting-edge gadgets that simplify and enhance your everyday life.</p>
              </div>
              <div>
                <h4 className="font-bold text-primary mb-1">Our Values</h4>
                <p className="text-sm text-gray-500">Quality first, customer second to none, and continuous innovation in service.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. NEWSLETTER */}
      <section className="pb-24 pt-12 max-w-[1200px] mx-auto px-4">
        <div className="bg-primary rounded-3xl p-8 md:p-16 relative overflow-hidden text-center text-white shadow-2xl">
          <div className="absolute top-0 left-0 w-32 h-32 bg-accent/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto border border-white/20 mb-8">
              <IconMail size={32} className="text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Join the Tech Revolution</h2>
            <p className="text-gray-300 italic">Subscribe to our newsletter for exclusive deals, tech tips, and early access to new launches.</p>

            <form className="flex flex-col md:flex-row gap-4 pt-6" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-accent focus:bg-white/10 transition-all font-sans"
              />
              <button className="px-10 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-accent/40 whitespace-nowrap">
                Subscribe Now
              </button>
            </form>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest pt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
