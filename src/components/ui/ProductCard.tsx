
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Store } from 'lucide-react';

export interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  store: string;
  category: string;
  rating: number;
  isNew?: boolean;
  isSale?: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  store,
  category,
  rating,
  isNew = false,
  isSale = false
}: ProductProps) => {
  return (
    <div 
      className="group relative bg-white rounded-xl overflow-hidden product-shadow transition-all duration-300 hover:shadow-lg animate-hover"
    >
      {/* Status Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isNew && (
          <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
        )}
        {isSale && (
          <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>
        )}
      </div>
      
      {/* Product Image */}
      <Link to={`/products/${id}`} className="block relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </Link>
      
      {/* Product Info */}
      <div className="p-4 space-y-2">
        {/* Category & Store */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{category}</span>
          <div className="flex items-center">
            <Store className="w-3 h-3 mr-1" />
            <span>{store}</span>
          </div>
        </div>
        
        {/* Name */}
        <Link to={`/products/${id}`}>
          <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-goorder-600 transition-colors">
            {name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i}
              className={cn(
                "w-3 h-3", 
                i < rating 
                  ? "text-yellow-400 fill-yellow-400" 
                  : "text-gray-300"
              )}
            />
          ))}
          <span className="ml-1 text-xs text-gray-500">{rating.toFixed(1)}</span>
        </div>
        
        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold text-gray-900">${price.toFixed(2)}</span>
          
          <Button 
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 rounded-full bg-goorder-50 text-goorder-600 hover:bg-goorder-100"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
