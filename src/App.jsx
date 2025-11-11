import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import AllProduct from "./pages/allProduct";
import Nav from "./components/nav";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/allProduct" element={<AllProduct />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
