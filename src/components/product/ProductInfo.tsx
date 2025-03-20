
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Shield,
  Star,
  Store,
  Truck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface ProductInfoProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    category: string;
    store: string;
    storeId: number;
    rating: number;
    reviews: number;
    stock: number;
    features: string[];
    colors: string[];
  };
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} (${selectedColor}) added to your cart.`,
    });
  };
  
  return (
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
          
          {product.discount && product.discount > 0 && (
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
  );
};

export default ProductInfo;
