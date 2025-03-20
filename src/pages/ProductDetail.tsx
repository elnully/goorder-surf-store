
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Store,
  Truck,
  Shield,
  ArrowRight,
  Package,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/ui/ProductCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from '@/components/ui/use-toast';

// Mock data for a single product
const productData = {
  id: 1,
  name: 'Wireless Bluetooth Earbuds',
  description: 'Experience premium sound quality with these wireless Bluetooth earbuds. Featuring active noise cancellation, touch controls, and a compact charging case that provides up to 24 hours of battery life. Perfect for workouts, commuting, or everyday use.',
  price: 89.99,
  originalPrice: 129.99,
  discount: 30,
  images: [
    'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVhcmJ1ZHN8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGVhcmJ1ZHN8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGVhcmJ1ZHN8ZW58MHx8MHx8fDA%3D',
  ],
  store: 'TechWorld',
  storeId: 1,
  category: 'Electronics',
  rating: 4.8,
  reviews: 128,
  stock: 15,
  isNew: true,
  features: [
    'Active Noise Cancellation',
    'Touch Controls',
    'Bluetooth 5.0',
    'Waterproof (IPX7)',
    '24-Hour Battery Life',
    'Built-in Microphone',
    'Quick Charging'
  ],
  specifications: {
    'Connectivity': 'Bluetooth 5.0',
    'Battery Life': 'Up to 8 hours (24 hours with case)',
    'Charging': 'USB-C',
    'Water Resistance': 'IPX7',
    'Weight': '5.6g per earbud, 45g charging case',
    'Noise Cancellation': 'Active Noise Cancellation (ANC)',
    'Microphone': 'Built-in with noise reduction',
    'Controls': 'Touch sensitive',
    'Compatibility': 'iOS, Android, Windows'
  },
  colors: ['Black', 'White', 'Blue'],
  reviews: [
    {
      id: 1,
      name: 'John D.',
      rating: 5,
      date: '2023-03-15',
      title: 'Incredible sound quality!',
      comment: 'These earbuds exceeded my expectations. The sound quality is crystal clear, and the noise cancellation works perfectly in noisy environments.',
    },
    {
      id: 2,
      name: 'Sarah M.',
      rating: 4,
      date: '2023-02-28',
      title: 'Great for workouts',
      comment: 'I use these during my daily runs, and they stay in place perfectly. The battery life is excellent, and they're comfortable for long periods.',
    },
    {
      id: 3,
      name: 'Michael T.',
      rating: 5,
      date: '2023-02-10',
      title: 'Worth every penny',
      comment: 'After trying several wireless earbuds, these are by far the best. The sound quality and comfort are unmatched at this price point.',
    }
  ]
};

// Related products
const relatedProducts = [
  { id: 2, name: 'Smart Watch Series 5', price: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D', store: 'GadgetHub', category: 'Electronics', rating: 4.5 },
  { id: 8, name: 'Noise Cancelling Headphones', price: 249.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D', store: 'TechWorld', category: 'Electronics', rating: 4.7 },
  { id: 15, name: 'Portable Bluetooth Speaker', price: 79.99, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D', store: 'AudioZone', category: 'Electronics', rating: 4.4 },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(productData);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  
  useEffect(() => {
    // In a real app, this would fetch product by ID from an API
    window.scrollTo(0, 0);
  }, [id]);
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} (${selectedColor}) added to your cart.`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-4">
          <div className="container">
            <nav className="flex text-sm">
              <Link to="/" className="text-gray-500 hover:text-goorder-600">Home</Link>
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              <Link to="/products" className="text-gray-500 hover:text-goorder-600">Products</Link>
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              <Link to={`/products?category=${product.category.toLowerCase()}`} className="text-gray-500 hover:text-goorder-600">{product.category}</Link>
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              <span className="text-gray-700 font-medium">{product.name}</span>
            </nav>
          </div>
        </div>
        
        {/* Product detail section */}
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product images */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="sticky top-24">
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-gray-100">
                    {product.isNew && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          New
                        </span>
                      </div>
                    )}
                    {product.discount > 0 && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          {product.discount}% OFF
                        </span>
                      </div>
                    )}
                    <img 
                      src={product.images[selectedImage]} 
                      alt={product.name}
                      className="w-full h-full object-contain transform transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        className={`aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                          selectedImage === index 
                            ? 'border-goorder-600' 
                            : 'border-transparent hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedImage(index)}
                      >
                        <img 
                          src={image} 
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              {/* Product information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Link 
                    to={`/products?category=${product.category.toLowerCase()}`}
                    className="hover:text-goorder-600"
                  >
                    {product.category}
                  </Link>
                  <span className="mx-2">•</span>
                  <Link 
                    to={`/stores/${product.storeId}`}
                    className="flex items-center hover:text-goorder-600"
                  >
                    <Store className="w-3.5 h-3.5 mr-1" />
                    {product.store}
                  </Link>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                
                <div className="flex items-center mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? "text-yellow-400 fill-yellow-400" 
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-700">{product.rating.toFixed(1)}</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <Link to="#reviews" className="text-sm text-gray-500 hover:text-goorder-600">
                    {product.reviews} customer reviews
                  </Link>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    
                    {product.originalPrice && (
                      <span className="ml-3 text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                    )}
                    
                    {product.discount > 0 && (
                      <span className="ml-3 text-red-500 font-medium">Save {product.discount}%</span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-1">
                    Price includes tax
                  </p>
                </div>
                
                <p className="text-gray-700 mb-6">
                  {product.description}
                </p>
                
                {/* Color selector */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                  <div className="flex space-x-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`group relative flex items-center justify-center rounded-full w-9 h-9 border ${
                          selectedColor === color 
                            ? 'ring-2 ring-goorder-600 ring-offset-1' 
                            : 'ring-1 ring-gray-200 hover:ring-gray-300'
                        }`}
                        onClick={() => setSelectedColor(color)}
                      >
                        <span className="sr-only">{color}</span>
                        <span 
                          className={`w-7 h-7 rounded-full ${
                            color === 'Black' ? 'bg-gray-900' :
                            color === 'White' ? 'bg-white' :
                            color === 'Blue' ? 'bg-blue-500' :
                            'bg-gray-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quantity selector */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
                  <div className="flex">
                    <button
                      type="button"
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-50"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="w-14 h-10 flex items-center justify-center border-t border-b border-gray-300 text-gray-900">
                      {quantity}
                    </div>
                    <button
                      type="button"
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-50"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    
                    <p className="ml-4 text-sm text-gray-500 flex items-center">
                      <Package className="w-4 h-4 mr-1" />
                      {product.stock} in stock
                    </p>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    className="bg-goorder-600 hover:bg-goorder-700 h-12 flex-1"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="h-12 border-gray-300 hover:bg-gray-50"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Add to Wishlist
                  </Button>
                </div>
                
                {/* Features */}
                <div className="border-t border-gray-200 pt-6 space-y-6">
                  <div className="flex space-x-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Truck className="w-5 h-5 mr-2 text-goorder-600" />
                      Fast Delivery
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Shield className="w-5 h-5 mr-2 text-goorder-600" />
                      1-Year Warranty
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Key Features</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-goorder-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Product tabs */}
        <section className="py-12 bg-gray-50">
          <div className="container">
            <Tabs defaultValue="specifications">
              <TabsList className="w-full flex justify-start mb-8 bg-white p-1 rounded-lg border border-gray-200">
                <TabsTrigger 
                  value="specifications" 
                  className="flex-1 md:flex-none data-[state=active]:text-goorder-600 data-[state=active]:bg-goorder-50"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="flex-1 md:flex-none data-[state=active]:text-goorder-600 data-[state=active]:bg-goorder-50"
                >
                  Reviews
                </TabsTrigger>
                <TabsTrigger 
                  value="shipping" 
                  className="flex-1 md:flex-none data-[state=active]:text-goorder-600 data-[state=active]:bg-goorder-50"
                >
                  Shipping & Returns
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="specifications" className="mt-0">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Technical Specifications</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="border-b border-gray-100 pb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">{key}</h4>
                        <p className="text-gray-900">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-0">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                    <Button variant="outline">Write a Review</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-baseline mb-4">
                        <span className="text-5xl font-bold text-gray-900 mr-2">{product.rating.toFixed(1)}</span>
                        <span className="text-lg text-gray-600">out of 5</span>
                      </div>
                      
                      <div className="flex mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating) 
                                ? "text-yellow-400 fill-yellow-400" 
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4">Based on {product.reviews} reviews</p>
                      
                      {/* Rating bars - simplified for the example */}
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center">
                            <span className="text-sm text-gray-600 w-8">{star} star</span>
                            <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full" 
                                style={{ 
                                  width: star === 5 ? '70%' : 
                                         star === 4 ? '20%' : 
                                         star === 3 ? '5%' : 
                                         star === 2 ? '3%' : '2%' 
                                }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-8">
                              {star === 5 ? '70%' : 
                               star === 4 ? '20%' : 
                               star === 3 ? '5%' : 
                               star === 2 ? '3%' : '2%'
                              }
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-4">Recent Reviews</h4>
                      
                      <div className="space-y-6">
                        {product.reviews.map((review) => (
                          <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                            <div className="flex justify-between mb-1">
                              <h5 className="font-medium text-gray-900">{review.title}</h5>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            
                            <div className="flex items-center mb-2">
                              <div className="flex mr-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i}
                                    className={`w-3.5 h-3.5 ${
                                      i < review.rating 
                                        ? "text-yellow-400 fill-yellow-400" 
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">{review.name}</span>
                            </div>
                            
                            <p className="text-gray-700 text-sm">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                      
                      <Button variant="ghost" className="mt-4 text-goorder-600 hover:text-goorder-700 hover:bg-goorder-50 px-0">
                        View all reviews <ArrowRight className="ml-1 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="mt-0">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Shipping & Returns Information</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-2">Shipping Policy</h4>
                      <p className="text-gray-700">
                        We offer fast shipping options to meet your needs. Standard shipping typically takes 3-5 business days, while express shipping is available for 1-2 business day delivery. International shipping is available to select countries. All orders are processed within 24 hours during business days.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-2">Return Policy</h4>
                      <p className="text-gray-700">
                        We accept returns within 30 days of delivery for a full refund or exchange. Products must be in original condition with all packaging and accessories. Return shipping is free for defective items. Please contact our customer service team to initiate a return.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-2">Warranty</h4>
                      <p className="text-gray-700">
                        This product comes with a 1-year manufacturer's warranty covering defects in materials and workmanship. Extended warranty options are available at checkout. The warranty does not cover damage from misuse, accidents, or normal wear and tear.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Related products */}
        <section className="py-12">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">You May Also Like</h3>
              
              <Link to="/products">
                <Button variant="ghost" className="text-goorder-600 hover:text-goorder-700 hover:bg-goorder-50">
                  View All <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
