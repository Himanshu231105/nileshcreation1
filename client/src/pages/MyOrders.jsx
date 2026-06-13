import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Package, ArrowLeft } from 'lucide-react';

export const MyOrders = () => {
  const { orders } = useContext(CartContext);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-lightgray">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-primary mb-8">My Orders</h1>
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Package size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-2xl text-gray-600 mb-6">No orders yet</p>
            <Link to="/services" className="btn btn-primary">
              Browse Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightgray">
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-primary">My Orders</h1>
          <Link to="/services" className="text-accent font-medium flex items-center gap-2">
            <ArrowLeft size={18} /> Continue shopping
          </Link>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.orderId} className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="text-xl font-bold text-primary">{order.orderId}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="text-lg font-semibold">
                    {new Date(order.date).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-lg font-semibold text-green-600">{order.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-accent">₹{order.total}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-primary mb-4">Items</h3>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-primary">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-primary">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <h4 className="font-bold text-primary mb-2">Delivery Address</h4>
                <p className="text-gray-700">{order.customerInfo.name}</p>
                <p className="text-gray-700">{order.customerInfo.email}</p>
                <p className="text-gray-700">{order.customerInfo.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
