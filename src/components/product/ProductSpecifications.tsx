
import React from 'react';

interface ProductSpecificationsProps {
  specifications: Record<string, string>;
}

const ProductSpecifications = ({ specifications }: ProductSpecificationsProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Technical Specifications</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(specifications).map(([key, value]) => (
          <div key={key} className="border-b border-gray-100 pb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-1">{key}</h4>
            <p className="text-gray-900">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSpecifications;
