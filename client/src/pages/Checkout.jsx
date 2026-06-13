import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, placeOrder } = useContext(CartContext);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/services/${id}`);
        if (!response.ok) throw new Error('Service not found');
        const data = await response.json();
        setService(data);
      } catch (error) {
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');

    setTimeout(() => {
      // Add service to cart
      addToCart(service, 1);

      // Place order
      const order = placeOrder(formData);

      setSubmitting(false);
      setOrderPlaced(true);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-secondary">
        <p className="text-xl">Loading checkout...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-secondary px-4">
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">Service not found</p>
          <Link to="/services" className="btn btn-primary">
            Back to Services
          </Link>
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
            <p className="text-gray-600 max-w-2xl">
              Complete your booking for <span className="font-semibold text-accent">{service.name}</span>.
            </p>
          </div>
          <Link to="/services" className="text-accent font-medium flex items-center gap-2">
            <ArrowLeft size={18} /> Back to services
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl overflow-hidden">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-96 object-cover"
            />
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4">{service.name}</h2>
              <p className="text-gray-700 leading-relaxed mb-8">{service.description}</p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-3xl border border-gray-200 p-5">
                  <p className="text-sm uppercase text-gray-500 mb-2">Price</p>
                  <p className="text-2xl font-bold text-accent">₹{service.price}</p>
                </div>
                <div className="rounded-3xl border border-gray-200 p-5">
                  <p className="text-sm uppercase text-gray-500 mb-2">Category</p>
                  <p className="text-lg font-semibold">{service.category}</p>
                </div>
                <div className="rounded-3xl border border-gray-200 p-5">
                  <p className="text-sm uppercase text-gray-500 mb-2">Delivery</p>
                  <p className="text-lg font-semibold">{service.deliveryTime || 'Flexible'}</p>
                </div>
              </div>

              {service.features?.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">What’s included</h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="rounded-3xl border border-gray-200 p-4 text-gray-700">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="bg-primary text-secondary rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-5">Book your session</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-3xl border border-gray-300 text-primary focus:border-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-3xl border border-gray-300 text-primary focus:border-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-3xl border border-gray-300 text-primary focus:border-accent outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-secondary w-full"
              >
                {submitting ? 'Processing...' : 'Confirm Booking'}
              </button>
            </form>

            {message && (
              <div className="mt-6 rounded-3xl bg-green-100 text-green-800 p-5 flex items-center gap-3">
                <CheckCircle2 size={24} />
                <div>
                  <p className="font-semibold">Booking submitted</p>
                  <p className="text-sm">{message}</p>
                </div>
              </div>
            )}

            {orderPlaced && (
              <div className="mt-6 rounded-3xl bg-green-100 text-green-800 p-5 flex flex-col items-start gap-3">
                <div className="flex items-center gap-3 w-full">
                  <CheckCircle2 size={24} />
                  <div>
                    <p className="font-semibold">Order Confirmed!</p>
                    <p className="text-sm">Your booking has been successfully placed.</p>
                  </div>
                </div>
                <Link to="/my-orders" className="btn btn-primary text-white mt-2">
                  View My Orders
                </Link>
              </div>
            )}

            <p className="mt-6 text-sm text-gray-300">
              This checkout is a demo only. Payment processing is not enabled yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
