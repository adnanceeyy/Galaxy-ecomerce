import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import HomePage from "./pages/Homepage";
import AllProduct from "./pages/allProduct";
import Condactpage from "./pages/condactpage";
import Aboutpage from "./pages/aboutpage";
import CartPage from "./pages/cartpage";
import SingleProduct from "./pages/singleProduct";
import Nav from "./components/nav";
import Footer from "./components/footer";
import Catogerypages from "./pages/catogerypages";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catogerypages/:id" element={<Catogerypages/>} />
          <Route path="/allProduct" element={<AllProduct />} />
          <Route path="/contact" element={<Condactpage />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/singleProduct/:id" element={<SingleProduct />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
