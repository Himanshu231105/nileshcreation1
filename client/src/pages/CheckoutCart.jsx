import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

export const CheckoutCart = () => {
  const { cart, placeOrder, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const order = placeOrder(formData);
      if (order) {
        setOrderDetails(order);
        setOrderPlaced(true);
        setSubmitting(false);
      }
    }, 1000);
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-secondary px-4">
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">Your cart is empty</p>
          <Link to="/services" className="btn btn-primary">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-lightgray py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-12 text-center">
            <CheckCircle2 size={80} className="mx-auto text-green-500 mb-6" />
            <h1 className="text-4xl font-bold text-primary mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your booking. Your order has been successfully placed.
            </p>

            <div className="bg-blue-50 rounded-lg p-8 mb-8 text-left">
              <h2 className="text-2xl font-bold text-primary mb-6">Order Details</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-700">Order ID:</span>
                  <span className="text-accent font-bold">{orderDetails.orderId}</span>
                </div>
                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-700">Total Amount:</span>
                  <span className="text-2xl font-bold text-accent">₹{orderDetails.total}</span>
                </div>
                <div className="flex justify-between border-b pb-3">
                  <span className="font-semibold text-gray-700">Items:</span>
                  <span className="font-bold">{orderDetails.items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Status:</span>
                  <span className="text-green-600 font-bold">{orderDetails.status}</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded border-2 border-blue-200">
                <h3 className="font-bold text-primary mb-4">Shipping To:</h3>
                <p>{orderDetails.customerInfo.name}</p>
                <p>{orderDetails.customerInfo.email}</p>
                <p>{orderDetails.customerInfo.phone}</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Link to="/my-orders" className="btn btn-primary">
                View My Orders
              </Link>
              <Link to="/services" className="btn btn-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-lightgray min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-primary">Checkout</h1>
            <p className="text-gray-600">Complete your booking</p>
          </div>
          <Link to="/my-cart" className="text-accent font-medium flex items-center gap-2">
            <ArrowLeft size={18} /> Back to cart
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-primary">Billing Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-primary">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-primary focus:border-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-primary">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-primary focus:border-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-primary">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-primary focus:border-accent outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary w-full"
              >
                {submitting ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 h-fit">
            <h3 className="text-2xl font-bold mb-6 text-primary">Order Summary</h3>
            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.name} x{item.quantity}</span>
                  <span className="font-semibold">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="mb-6">
              <div className="flex justify-between">
                <span className="font-bold text-primary">Total:</span>
                <span className="text-2xl font-bold text-accent">₹{getCartTotal()}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              This is a demo checkout. Payment processing is not enabled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
