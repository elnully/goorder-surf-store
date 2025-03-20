
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductImagesProps {
  images: string[];
  name: string;
  isNew?: boolean;
  discount?: number;
}

const ProductImages = ({ images, name, isNew, discount }: ProductImagesProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sticky top-24">
        <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-gray-100">
          {isNew && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                New
              </span>
            </div>
          )}
          {discount && discount > 0 && (
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                {discount}% OFF
              </span>
            </div>
          )}
          <img 
            src={images[selectedImage]} 
            alt={name}
            className="w-full h-full object-contain transform transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
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
                alt={`${name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductImages;
