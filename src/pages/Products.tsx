
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Check,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ProductCard from '@/components/ui/ProductCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Mock data
const allProducts = [
  { id: 1, name: 'Wireless Bluetooth Earbuds', price: 89.99, image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVhcmJ1ZHN8ZW58MHx8MHx8fDA%3D', store: 'TechWorld', category: 'Electronics', rating: 4.8, isNew: true },
  { id: 2, name: 'Smart Watch Series 5', price: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D', store: 'GadgetHub', category: 'Electronics', rating: 4.5 },
  { id: 3, name: 'Premium Cotton T-Shirt', price: 29.99, image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D', store: 'FashionFiesta', category: 'Clothing', rating: 4.2 },
  { id: 4, name: 'Professional Chef Knife Set', price: 149.99, image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGtuaWZlJTIwc2V0fGVufDB8fDB8fHww', store: 'KitchenPlus', category: 'Home', rating: 4.6 },
  { id: 5, name: 'Organic Fresh Fruit Basket', price: 34.99, image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZydWl0JTIwYmFza2V0fGVufDB8fDB8fHww', store: 'OrganicMart', category: 'Groceries', rating: 4.7, isSale: true },
  { id: 6, name: 'Scented Soy Candle Set', price: 42.99, image: 'https://images.unsplash.com/photo-1599446794254-16bbeb59499e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhbmRsZXN8ZW58MHx8MHx8fDA%3D', store: 'HomeDecor', category: 'Home', rating: 4.3 },
  { id: 7, name: 'Premium Coffee Beans 1kg', price: 24.99, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvZmZlZSUyMGJlYW5zfGVufDB8fDB8fHww', store: 'BeanBrew', category: 'Groceries', rating: 4.9 },
  { id: 8, name: 'Noise Cancelling Headphones', price: 249.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D', store: 'TechWorld', category: 'Electronics', rating: 4.7 },
  { id: 9, name: 'Skincare Gift Set', price: 79.99, image: 'https://images.unsplash.com/photo-1570194065650-d99416341b13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2tpbmNhcmV8ZW58MHx8MHx8fDA%3D', store: 'BeautyBox', category: 'Beauty', rating: 4.4, isSale: true },
  { id: 10, name: 'Ceramic Dinner Set', price: 119.99, image: 'https://images.unsplash.com/photo-1607875393339-c78dcdd4231c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGRpbm5lciUyMHNldHxlbnwwfHwwfHx8MA%3D%3D', store: 'HomeDecor', category: 'Home', rating: 4.5 },
  { id: 11, name: 'Organic Vitamin Supplements', price: 34.99, image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VwcGxlbWVudHN8ZW58MHx8MHx8fDA%3D', store: 'HealthFirst', category: 'Health', rating: 4.2 },
  { id: 12, name: 'Leather Crossbody Bag', price: 89.99, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGFuZGJhZ3xlbnwwfHwwfHx8MA%3D%3D', store: 'FashionFiesta', category: 'Clothing', rating: 4.6, isNew: true },
];

const categories = ['All', 'Electronics', 'Clothing', 'Home', 'Groceries', 'Health', 'Beauty'];
const stores = ['All', 'TechWorld', 'GadgetHub', 'FashionFiesta', 'KitchenPlus', 'OrganicMart', 'HomeDecor', 'BeanBrew', 'BeautyBox', 'HealthFirst'];
const priceRanges = ['All', 'Under $50', '$50 - $100', '$100 - $200', 'Over $200'];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
];

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(queryParams.get('category') || 'All');
  const [selectedStores, setSelectedStores] = useState<string[]>(['All']);
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  
  // Handle filter changes
  useEffect(() => {
    let filtered = [...allProducts];
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.store.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Store filter
    if (!selectedStores.includes('All')) {
      filtered = filtered.filter(product => 
        selectedStores.includes(product.store)
      );
    }
    
    // Price range filter
    if (selectedPriceRange !== 'All') {
      if (selectedPriceRange === 'Under $50') {
        filtered = filtered.filter(product => product.price < 50);
      } else if (selectedPriceRange === '$50 - $100') {
        filtered = filtered.filter(product => product.price >= 50 && product.price <= 100);
      } else if (selectedPriceRange === '$100 - $200') {
        filtered = filtered.filter(product => product.price > 100 && product.price <= 200);
      } else if (selectedPriceRange === 'Over $200') {
        filtered = filtered.filter(product => product.price > 200);
      }
    }
    
    // Sort products
    switch (sortBy) {
      case 'newest':
        // In a real app, you'd sort by date
        filtered = [...filtered].reverse();
        break;
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured - default sort
        break;
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, selectedStores, selectedPriceRange, sortBy]);
  
  // Update URL when category changes
  useEffect(() => {
    if (selectedCategory === 'All') {
      navigate('/products');
    } else {
      navigate(`/products?category=${selectedCategory.toLowerCase()}`);
    }
  }, [selectedCategory, navigate]);
  
  // Update category from URL if it changes
  useEffect(() => {
    const categoryParam = queryParams.get('category');
    if (categoryParam) {
      // Capitalize first letter for display
      const formattedCategory = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
      if (categories.includes(formattedCategory)) {
        setSelectedCategory(formattedCategory);
      }
    } else {
      setSelectedCategory('All');
    }
  }, [location.search, queryParams]);
  
  // Toggle store selection
  const toggleStore = (store: string) => {
    if (store === 'All') {
      setSelectedStores(['All']);
      return;
    }
    
    const updatedStores = selectedStores.includes(store)
      ? selectedStores.filter(s => s !== store)
      : [...selectedStores.filter(s => s !== 'All'), store];
    
    setSelectedStores(updatedStores.length ? updatedStores : ['All']);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStores(['All']);
    setSelectedPriceRange('All');
    setSortBy('featured');
    navigate('/products');
  };
  
  // Check if any filter is active
  const isAnyFilterActive = () => {
    return selectedCategory !== 'All' || 
           !selectedStores.includes('All') || 
           selectedPriceRange !== 'All' || 
           searchQuery !== '';
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Header */}
        <section className="bg-gray-50 py-12">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {selectedCategory === 'All' ? 'All Products' : selectedCategory}
              </h1>
              <p className="text-gray-600">
                Browse through our carefully selected products from top brands and local stores.
              </p>
            </div>
          </div>
        </section>
        
        {/* Products Section */}
        <section className="py-12">
          <div className="container">
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
              {/* Search input */}
              <div className="relative w-full md:w-72">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <div className="flex items-center space-x-4 w-full md:w-auto">
                {/* Filter button (mobile) */}
                <Button 
                  variant="outline" 
                  className="md:hidden flex items-center"
                  onClick={() => setIsFilterMobileOpen(true)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                
                {/* Sort dropdown */}
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700 hidden sm:inline">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Active filters */}
            {isAnyFilterActive() && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                
                {selectedCategory !== 'All' && (
                  <button 
                    className="inline-flex items-center bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm"
                    onClick={() => setSelectedCategory('All')}
                  >
                    Category: {selectedCategory}
                    <X className="ml-1 w-3 h-3" />
                  </button>
                )}
                
                {!selectedStores.includes('All') && selectedStores.map(store => (
                  <button 
                    key={store}
                    className="inline-flex items-center bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm"
                    onClick={() => toggleStore(store)}
                  >
                    Store: {store}
                    <X className="ml-1 w-3 h-3" />
                  </button>
                ))}
                
                {selectedPriceRange !== 'All' && (
                  <button 
                    className="inline-flex items-center bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm"
                    onClick={() => setSelectedPriceRange('All')}
                  >
                    Price: {selectedPriceRange}
                    <X className="ml-1 w-3 h-3" />
                  </button>
                )}
                
                {searchQuery && (
                  <button 
                    className="inline-flex items-center bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm"
                    onClick={() => setSearchQuery('')}
                  >
                    Search: "{searchQuery}"
                    <X className="ml-1 w-3 h-3" />
                  </button>
                )}
                
                <button 
                  className="text-sm text-goorder-600 hover:text-goorder-700 ml-2"
                  onClick={resetFilters}
                >
                  Clear all
                </button>
              </div>
            )}
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filters (desktop) */}
              <div className="hidden md:block w-64 flex-shrink-0">
                <div className="bg-white rounded-xl p-5 shadow-soft sticky top-24">
                  <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                  
                  <div className="space-y-2 mb-6">
                    {categories.map((category) => (
                      <div 
                        key={category}
                        className="flex items-center"
                      >
                        <button
                          className="group flex items-center w-full p-1 rounded hover:bg-gray-50"
                          onClick={() => setSelectedCategory(category)}
                        >
                          <div className={`w-4 h-4 rounded mr-3 flex items-center justify-center border ${
                            selectedCategory === category 
                              ? 'bg-goorder-600 border-goorder-600' 
                              : 'border-gray-300 group-hover:border-gray-400'
                          }`}>
                            {selectedCategory === category && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className={`text-sm ${
                            selectedCategory === category 
                              ? 'font-medium text-gray-900' 
                              : 'text-gray-700'
                          }`}>
                            {category}
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-4">Stores</h3>
                  
                  <div className="space-y-2 mb-6">
                    {stores.map((store) => (
                      <div 
                        key={store}
                        className="flex items-center"
                      >
                        <button
                          className="group flex items-center w-full p-1 rounded hover:bg-gray-50"
                          onClick={() => toggleStore(store)}
                        >
                          <div className={`w-4 h-4 rounded mr-3 flex items-center justify-center border ${
                            selectedStores.includes(store) 
                              ? 'bg-goorder-600 border-goorder-600' 
                              : 'border-gray-300 group-hover:border-gray-400'
                          }`}>
                            {selectedStores.includes(store) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className={`text-sm ${
                            selectedStores.includes(store) 
                              ? 'font-medium text-gray-900' 
                              : 'text-gray-700'
                          }`}>
                            {store}
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                  
                  <div className="space-y-2 mb-6">
                    {priceRanges.map((range) => (
                      <div 
                        key={range}
                        className="flex items-center"
                      >
                        <button
                          className="group flex items-center w-full p-1 rounded hover:bg-gray-50"
                          onClick={() => setSelectedPriceRange(range)}
                        >
                          <div className={`w-4 h-4 rounded mr-3 flex items-center justify-center border ${
                            selectedPriceRange === range 
                              ? 'bg-goorder-600 border-goorder-600' 
                              : 'border-gray-300 group-hover:border-gray-400'
                          }`}>
                            {selectedPriceRange === range && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className={`text-sm ${
                            selectedPriceRange === range 
                              ? 'font-medium text-gray-900' 
                              : 'text-gray-700'
                          }`}>
                            {range}
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
              
              {/* Products grid */}
              <div className="flex-1">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <ProductCard {...product} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                      <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">No products found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your search or filter to find what you're looking for.</p>
                    <Button
                      variant="outline"
                      onClick={resetFilters}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Mobile filter drawer */}
      <div className={`fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity duration-300 ${
        isFilterMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className={`absolute right-0 top-0 bottom-0 w-4/5 max-w-md bg-white shadow-xl transform transition-transform duration-300 ${
          isFilterMobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Filters</h3>
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => setIsFilterMobileOpen(false)}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <div className="p-4 h-[calc(100vh-70px)] overflow-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="categories">
                <AccordionTrigger className="text-sm font-semibold text-gray-900">
                  Categories
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-2">
                    {categories.map((category) => (
                      <div 
                        key={category}
                        className="flex items-center"
                      >
                        <button
                          className="group flex items-center w-full p-1 rounded hover:bg-gray-50"
                          onClick={() => setSelectedCategory(category)}
                        >
                          <div className={`w-4 h-4 rounded mr-3 flex items-center justify-center border ${
                            selectedCategory === category 
                              ? 'bg-goorder-600 border-goorder-600' 
                              : 'border-gray-300 group-hover:border-gray-400'
                          }`}>
                            {selectedCategory === category && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className={`text-sm ${
                            selectedCategory === category 
                              ? 'font-medium text-gray-900' 
                              : 'text-gray-700'
                          }`}>
                            {category}
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="stores">
                <AccordionTrigger className="text-sm font-semibold text-gray-900">
                  Stores
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-2">
                    {stores.map((store) => (
                      <div 
                        key={store}
                        className="flex items-center"
                      >
                        <button
                          className="group flex items-center w-full p-1 rounded hover:bg-gray-50"
                          onClick={() => toggleStore(store)}
                        >
                          <div className={`w-4 h-4 rounded mr-3 flex items-center justify-center border ${
                            selectedStores.includes(store) 
                              ? 'bg-goorder-600 border-goorder-600' 
                              : 'border-gray-300 group-hover:border-gray-400'
                          }`}>
                            {selectedStores.includes(store) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className={`text-sm ${
                            selectedStores.includes(store) 
                              ? 'font-medium text-gray-900' 
                              : 'text-gray-700'
                          }`}>
                            {store}
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="price">
                <AccordionTrigger className="text-sm font-semibold text-gray-900">
                  Price Range
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-2">
                    {priceRanges.map((range) => (
                      <div 
                        key={range}
                        className="flex items-center"
                      >
                        <button
                          className="group flex items-center w-full p-1 rounded hover:bg-gray-50"
                          onClick={() => setSelectedPriceRange(range)}
                        >
                          <div className={`w-4 h-4 rounded mr-3 flex items-center justify-center border ${
                            selectedPriceRange === range 
                              ? 'bg-goorder-600 border-goorder-600' 
                              : 'border-gray-300 group-hover:border-gray-400'
                          }`}>
                            {selectedPriceRange === range && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className={`text-sm ${
                            selectedPriceRange === range 
                              ? 'font-medium text-gray-900' 
                              : 'text-gray-700'
                          }`}>
                            {range}
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-8 space-y-4">
              <Button
                className="w-full bg-goorder-600 hover:bg-goorder-700 text-white"
                onClick={() => setIsFilterMobileOpen(false)}
              >
                Apply Filters
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  resetFilters();
                  setIsFilterMobileOpen(false);
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
