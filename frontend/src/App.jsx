import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonateProduct from "./pages/DonateProduct";
import AllProducts from "./pages/AllProducts";
import Footer from "./components/Footer";
import BecomeVolunteer from "./pages/BecomeVolunteer";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import DonateDropdown from "./pages/DonateDropdown";
import DonateMoney from "./pages/DonateMoney";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/donate" element={<DonateProduct />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/volunteer" element={<BecomeVolunteer />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/donate-money" element={<DonateMoney />} />;
          <Route path="*" element={<NotFound />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
