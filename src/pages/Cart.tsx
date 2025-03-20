
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ChevronRight, ShoppingCart, CreditCard, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: 'Wireless Bluetooth Earbuds',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVhcmJ1ZHN8ZW58MHx8MHx8fDA%3D',
    quantity: 1,
    color: 'Black',
    store: 'TechWorld',
    maxQuantity: 10
  },
  {
    id: 5,
    name: 'Organic Fresh Fruit Basket',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZydWl0JTIwYmFza2V0fGVufDB8fDB8fHww',
    quantity: 1,
    color: null,
    store: 'OrganicMart',
    maxQuantity: 5
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = isPromoApplied ? subtotal * 0.1 : 0; // 10% discount
  const shipping = subtotal > 100 ? 0 : 5.99;
  const tax = (subtotal - discount) * 0.07; // 7% tax
  const total = subtotal - discount + shipping + tax;
  
  // Update quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.maxQuantity)) } : item
    ));
  };
  
  // Remove item
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setIsPromoApplied(true);
    } else {
      alert('Invalid promo code');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Header */}
        <section className="bg-gray-50 py-8">
          <div className="container">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Cart</h1>
              
              <nav className="hidden sm:flex items-center text-sm">
                <span className="flex items-center text-goorder-600 font-medium">
                  <span className="w-6 h-6 rounded-full bg-goorder-600 text-white flex items-center justify-center mr-2">1</span>
                  Cart
                </span>
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                <span className="flex items-center text-gray-500">
                  <span className="w-6 h-6 rounded-full border border-gray-300 text-gray-500 flex items-center justify-center mr-2">2</span>
                  Checkout
                </span>
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                <span className="flex items-center text-gray-500">
                  <span className="w-6 h-6 rounded-full border border-gray-300 text-gray-500 flex items-center justify-center mr-2">3</span>
                  Confirmation
                </span>
              </nav>
            </div>
          </div>
        </section>
        
        {/* Cart Content */}
        <section className="py-12">
          <div className="container">
            {cartItems.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">
                          Cart Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                        </h2>
                        
                        <Link to="/products" className="text-sm text-goorder-600 hover:text-goorder-700 flex items-center">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                    
                    <ul>
                      {cartItems.map((item, index) => (
                        <motion.li 
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-6 border-b border-gray-100 last:border-0"
                        >
                          <div className="flex flex-col sm:flex-row">
                            {/* Product Image */}
                            <div className="sm:w-24 sm:h-24 mb-4 sm:mb-0 sm:mr-6">
                              <Link to={`/products/${item.id}`}>
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-full h-full object-cover rounded-md"
                                />
                              </Link>
                            </div>
                            
                            {/* Product Details */}
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:justify-between">
                                <div>
                                  <Link 
                                    to={`/products/${item.id}`}
                                    className="font-medium text-gray-900 hover:text-goorder-600"
                                  >
                                    {item.name}
                                  </Link>
                                  
                                  <div className="mt-1 flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 gap-y-1 sm:gap-x-4">
                                    {item.color && <span>Color: {item.color}</span>}
                                    <span>Store: {item.store}</span>
                                  </div>
                                </div>
                                
                                <div className="mt-2 sm:mt-0 text-right">
                                  <span className="font-semibold text-gray-900">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </span>
                                  
                                  {item.quantity > 1 && (
                                    <div className="text-xs text-gray-500 mt-1">
                                      ${item.price.toFixed(2)} each
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="mt-4 flex flex-wrap justify-between items-center">
                                {/* Quantity Selector */}
                                <div className="flex items-center mb-2 sm:mb-0">
                                  <span className="text-sm text-gray-600 mr-3">Qty:</span>
                                  <div className="flex">
                                    <button
                                      type="button"
                                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-50"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      aria-label="Decrease quantity"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <div className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300 text-gray-900">
                                      {item.quantity}
                                    </div>
                                    <button
                                      type="button"
                                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-50"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      aria-label="Increase quantity"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                                
                                {/* Remove Button */}
                                <button
                                  type="button"
                                  className="text-sm text-gray-500 hover:text-red-500 flex items-center"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <X className="w-3.5 h-3.5 mr-1" />
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Order Summary */}
                <div>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
                    <div className="p-6 border-b border-gray-100">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Order Summary
                      </h2>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
                        </div>
                        
                        {isPromoApplied && (
                          <div className="flex justify-between text-red-500">
                            <span>Discount (10%)</span>
                            <span>-${discount.toFixed(2)}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span className="text-gray-900 font-medium">
                            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax (7%)</span>
                          <span className="text-gray-900 font-medium">${tax.toFixed(2)}</span>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex justify-between">
                          <span className="text-lg font-semibold text-gray-900">Total</span>
                          <span className="text-lg font-semibold text-gray-900">${total.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      {/* Promo Code */}
                      <div className="mt-6">
                        <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-2">
                          Promo Code
                        </label>
                        
                        <div className="flex">
                          <Input
                            id="promo"
                            type="text"
                            placeholder="Enter code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            disabled={isPromoApplied}
                            className="rounded-r-none"
                          />
                          <Button
                            onClick={applyPromoCode}
                            disabled={!promoCode || isPromoApplied}
                            className="rounded-l-none bg-goorder-600 hover:bg-goorder-700 disabled:bg-gray-300"
                          >
                            Apply
                          </Button>
                        </div>
                        
                        {isPromoApplied && (
                          <p className="mt-2 text-sm text-green-600">
                            Promo code applied successfully!
                          </p>
                        )}
                        
                        <p className="mt-2 text-xs text-gray-500">
                          Try code "SAVE10" for 10% off
                        </p>
                      </div>
                      
                      {/* Checkout Button */}
                      <div className="mt-6">
                        <Button className="w-full bg-goorder-600 hover:bg-goorder-700 h-12">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Proceed to Checkout
                        </Button>
                        
                        <p className="mt-4 text-xs text-center text-gray-500">
                          By proceeding, you agree to our Terms of Service and Privacy Policy
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center max-w-md mx-auto py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-8">
                  Looks like you haven't added any products to your cart yet.
                </p>
                <Link to="/products">
                  <Button className="bg-goorder-600 hover:bg-goorder-700">
                    Start Shopping <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
        
        {/* Product Recommendations */}
        {cartItems.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { id: 2, name: 'Smart Watch Series 5', price: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D' },
                  { id: 3, name: 'Premium Cotton T-Shirt', price: 29.99, image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D' },
                  { id: 4, name: 'Professional Chef Knife Set', price: 149.99, image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGtuaWZlJTIwc2V0fGVufDB8fDB8fHww' },
                  { id: 6, name: 'Scented Soy Candle Set', price: 42.99, image: 'https://images.unsplash.com/photo-1599446794254-16bbeb59499e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhbmRsZXN8ZW58MHx8MHx8fDA%3D' },
                ].map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link to={`/products/${product.id}`} className="group block">
                      <div className="bg-white rounded-xl overflow-hidden shadow-sm transition-shadow group-hover:shadow-md">
                        <div className="aspect-square overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-medium text-gray-900 group-hover:text-goorder-600 transition-colors mb-1 line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
