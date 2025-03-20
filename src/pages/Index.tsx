
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Package, MapPin, Shield, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/ui/ProductCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Mock data
const categories = [
  { id: 1, name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D' },
  { id: 2, name: 'Clothing', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D' },
  { id: 3, name: 'Home', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww' },
  { id: 4, name: 'Groceries', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JvY2VyaWVzfGVufDB8fDB8fHww' },
];

const featuredProducts = [
  { id: 1, name: 'Wireless Bluetooth Earbuds', price: 89.99, image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVhcmJ1ZHN8ZW58MHx8MHx8fDA%3D', store: 'TechWorld', category: 'Electronics', rating: 4.8, isNew: true },
  { id: 2, name: 'Smart Watch Series 5', price: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D', store: 'GadgetHub', category: 'Electronics', rating: 4.5 },
  { id: 3, name: 'Premium Cotton T-Shirt', price: 29.99, image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D', store: 'FashionFiesta', category: 'Clothing', rating: 4.2 },
  { id: 4, name: 'Professional Chef Knife Set', price: 149.99, image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGtuaWZlJTIwc2V0fGVufDB8fDB8fHww', store: 'KitchenPlus', category: 'Home', rating: 4.6 },
  { id: 5, name: 'Organic Fresh Fruit Basket', price: 34.99, image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZydWl0JTIwYmFza2V0fGVufDB8fDB8fHww', store: 'OrganicMart', category: 'Groceries', rating: 4.7, isSale: true },
  { id: 6, name: 'Scented Soy Candle Set', price: 42.99, image: 'https://images.unsplash.com/photo-1599446794254-16bbeb59499e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhbmRsZXN8ZW58MHx8MHx8fDA%3D', store: 'HomeDecor', category: 'Home', rating: 4.3 },
];

const testimonials = [
  { id: 1, text: "GoOrder has completely changed the way I shop! The variety of products and quick delivery make it my go-to app.", name: "Sarah Johnson", role: "Regular Customer" },
  { id: 2, text: "I love how easy it is to find products from multiple stores in one place. The interface is so intuitive and beautiful.", name: "Michael Chen", role: "Tech Enthusiast" },
  { id: 3, text: "Being able to track my orders in real-time gives me peace of mind. GoOrder is simply the best shopping app I've used.", name: "Emma Rodriguez", role: "Busy Professional" },
];

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative bg-gray-50 overflow-hidden">
          <div className="container py-20 lg:py-32 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-block px-3 py-1 rounded-full bg-goorder-100 text-goorder-700 text-sm font-medium">
                  Simplified Shopping Experience
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Your favorite products, <span className="text-goorder-600">delivered fast</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-lg">
                  GoOrder connects you with thousands of products from your favorite stores. 
                  Shop easily, pay securely, and get everything delivered to your doorstep.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    className="bg-goorder-600 hover:bg-goorder-700 text-white h-12 px-6"
                    size="lg"
                  >
                    Shop Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-12 px-6 border-gray-300"
                    size="lg"
                  >
                    Find Stores
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-goorder-500/20 to-goorder-300/20 rounded-2xl transform -rotate-3"></div>
                <img 
                  src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8b25saW5lJTIwc2hvcHBpbmd8ZW58MHx8MHx8fDA%3D" 
                  alt="Online shopping" 
                  className="relative rounded-2xl shadow-lg w-full object-cover aspect-[4/3]"
                />
              </motion.div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-goorder-100 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-goorder-200 rounded-full opacity-50 blur-3xl"></div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Package className="h-6 w-6" />, title: "Quality Products", description: "Curated selection of premium products from trusted brands" },
                { icon: <Truck className="h-6 w-6" />, title: "Fast Delivery", description: "Get your orders delivered to your doorstep in record time" },
                { icon: <Shield className="h-6 w-6" />, title: "Secure Payments", description: "Multiple secure payment options for peace of mind" },
                { icon: <MapPin className="h-6 w-6" />, title: "Local Stores", description: "Support your local businesses while shopping online" },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-soft"
                >
                  <div className="w-12 h-12 bg-goorder-50 rounded-lg flex items-center justify-center text-goorder-600 mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Browse by Category
              </h2>
              <p className="text-gray-600">
                Explore our wide range of products across various categories to find exactly what you need
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    to={`/products?category=${category.name.toLowerCase()}`}
                    className="group relative block rounded-xl overflow-hidden aspect-[5/3] shadow-sm"
                  >
                    {/* Background Image */}
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent group-hover:from-black/80 transition-colors duration-300"></div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:translate-x-2 transition-transform duration-300">
                        {category.name}
                      </h3>
                      <p className="text-white/70 text-sm font-medium flex items-center opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                        Shop now <ArrowRight className="ml-1 w-4 h-4" />
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Link to="/products">
                <Button variant="outline" className="h-11 px-6">
                  View All Categories <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Featured Products
                </h2>
                <p className="text-gray-600 max-w-xl">
                  Discover our handpicked selection of top-rated products that customers love
                </p>
              </div>
              
              <Link to="/products">
                <Button variant="ghost" className="text-goorder-600 hover:text-goorder-700 hover:bg-goorder-50">
                  View All <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Our Customers Say
              </h2>
              <p className="text-gray-600">
                Don't just take our word for it — see what customers love about GoOrder
              </p>
            </div>
            
            <div className="relative max-w-3xl mx-auto">
              <div className="h-64">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: currentTestimonial === index ? 1 : 0,
                      scale: currentTestimonial === index ? 1 : 0.9,
                      x: currentTestimonial === index ? 0 : (currentTestimonial > index ? -100 : 100)
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <div className="bg-white p-8 rounded-xl shadow-soft text-center">
                      <div className="flex justify-center mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg 
                            key={star} 
                            className="w-5 h-5 text-yellow-400 fill-yellow-400" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      
                      <p className="text-gray-700 text-lg mb-6">
                        "{testimonial.text}"
                      </p>
                      
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      currentTestimonial === index ? 'bg-goorder-600' : 'bg-gray-300'
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-16 bg-goorder-600">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Stay Updated with GoOrder
              </h2>
              <p className="text-goorder-100 mb-8">
                Subscribe to our newsletter for exclusive deals, new arrivals, and more!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-white"
                />
                <Button className="h-12 bg-white text-goorder-600 hover:bg-goorder-50">
                  Subscribe
                </Button>
              </div>
              
              <p className="mt-4 text-sm text-white/70">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
