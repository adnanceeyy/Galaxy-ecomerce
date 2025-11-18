import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import AllProduct from "./pages/allProduct";
import Nav from "./components/nav";
import Condactpage from "./pages/condactpage";
import Aboutpage from "./pages/aboutpage";
import CartPage from "./pages/cartpage";
import SingleProduct from "./pages/singleProduct";


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/allProduct" element={<AllProduct />} />
        <Route path="/contact" element={<Condactpage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/singleProduct" element={<SingleProduct />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
