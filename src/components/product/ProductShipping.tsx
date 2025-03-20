
import React from 'react';

const ProductShipping = () => {
  return (
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
  );
};

export default ProductShipping;
