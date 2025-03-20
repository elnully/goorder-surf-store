
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface ProductBreadcrumbsProps {
  category: string;
  name: string;
}

const ProductBreadcrumbs = ({ category, name }: ProductBreadcrumbsProps) => {
  return (
    <div className="bg-gray-50 py-4">
      <div className="container">
        <nav className="flex text-sm">
          <Link to="/" className="text-gray-500 hover:text-goorder-600">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <Link to="/products" className="text-gray-500 hover:text-goorder-600">Products</Link>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <Link to={`/products?category=${category.toLowerCase()}`} className="text-gray-500 hover:text-goorder-600">{category}</Link>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <span className="text-gray-700 font-medium">{name}</span>
        </nav>
      </div>
    </div>
  );
};

export default ProductBreadcrumbs;
