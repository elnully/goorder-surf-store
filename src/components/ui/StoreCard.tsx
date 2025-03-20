
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface StoreProps {
  id: number;
  name: string;
  image: string;
  address: string;
  phone: string;
  hours: string;
  categories: string[];
  distance?: string;
}

const StoreCard = ({
  id,
  name,
  image,
  address,
  phone,
  hours,
  categories,
  distance
}: StoreProps) => {
  return (
    <Link 
      to={`/stores/${id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-soft transition-all duration-300 hover:shadow-lg flex flex-col h-full animate-hover"
    >
      {/* Store Image */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {distance && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-white/90 backdrop-blur-sm text-gray-800 font-medium">
              <MapPin className="w-3 h-3 mr-1 text-goorder-600" />
              {distance}
            </Badge>
          </div>
        )}
      </div>
      
      {/* Store Info */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-goorder-600 transition-colors">
          {name}
        </h3>
        
        <div className="space-y-2 flex-1">
          <div className="flex items-start">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0 mr-2" />
            <span className="text-sm text-gray-600">{address}</span>
          </div>
          
          <div className="flex items-start">
            <Phone className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0 mr-2" />
            <span className="text-sm text-gray-600">{phone}</span>
          </div>
          
          <div className="flex items-start">
            <Clock className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0 mr-2" />
            <span className="text-sm text-gray-600">{hours}</span>
          </div>
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant="secondary"
              className="bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;
