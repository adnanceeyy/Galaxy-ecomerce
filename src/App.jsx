import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import HomePage from "./pages/Homepage";
import AllProduct from "./pages/allProduct";
import Condactpage from "./pages/condactpage";
import Aboutpage from "./pages/aboutpage";
import CartPage from "./pages/cartpage";
import SingleProduct from "./pages/singleProduct";

// COMPONENTS (Optional: Your navigation always visible)
import Nav from "./components/nav";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <Router>
        {/* Navigation Bar always visible */}
        <Nav />

        {/* Page Routing */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/allProduct" element={<AllProduct />} />
          <Route path="/contact" element={<Condactpage />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/cart" element={<CartPage />} />

          {/* Dynamic Single Product Route */}
          <Route path="/singleProduct/:id" element={<SingleProduct />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
