import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';
import { Checkout } from './pages/Checkout';
import { MyCart } from './pages/MyCart';
import { MyOrders } from './pages/MyOrders';
import { CheckoutCart } from './pages/CheckoutCart';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <CartProvider>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/checkout-cart" element={<CheckoutCart />} />
            <Route path="/my-cart" element={<MyCart />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
