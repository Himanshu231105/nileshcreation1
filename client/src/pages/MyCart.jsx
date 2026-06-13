import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, ArrowLeft, ShoppingCart } from 'lucide-react';

export const MyCart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-lightgray">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-primary mb-8">My Cart</h1>
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-2xl text-gray-600 mb-6">Your cart is empty</p>
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
          <h1 className="text-4xl font-bold text-primary">My Cart</h1>
          <Link to="/services" className="text-accent font-medium flex items-center gap-2">
            <ArrowLeft size={18} /> Continue shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow p-6 flex items-center gap-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary">{item.name}</h3>
                  <p className="text-gray-600 mb-2">{item.category}</p>
                  <p className="text-accent font-semibold">₹{item.price}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <p className="text-xl font-bold text-primary w-24 text-right">
                  ₹{item.price * item.quantity}
                </p>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 h-fit">
            <h2 className="text-2xl font-bold text-primary mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Items:</span>
                <span className="font-semibold">{cart.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">₹{getCartTotal()}</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-lg mb-4">
                <span className="font-bold">Total:</span>
                <span className="text-2xl font-bold text-accent">₹{getCartTotal()}</span>
              </div>
            </div>

            <Link to="/checkout-cart" className="btn btn-primary w-full text-center block">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
