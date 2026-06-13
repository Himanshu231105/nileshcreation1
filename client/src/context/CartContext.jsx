import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (service, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === service._id);
      if (existing) {
        return prevCart.map((item) =>
          item._id === service._id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...service, quantity }];
    });
  };

  const removeFromCart = (serviceId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== serviceId));
  };

  const updateQuantity = (serviceId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(serviceId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === serviceId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (customerInfo) => {
    if (cart.length === 0) return null;

    const order = {
      orderId: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      customerInfo,
      status: 'Confirmed',
    };

    setOrders((prevOrders) => [order, ...prevOrders]);
    clearCart();
    return order;
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
