
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Filter, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import StoreCard from '@/components/ui/StoreCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Mock data
const allStores = [
  { 
    id: 1, 
    name: 'TechWorld', 
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D', 
    address: '123 Tech Avenue, San Francisco, CA 94107', 
    phone: '(415) 555-1234', 
    hours: 'Mon-Sat: 10:00 AM - 9:00 PM, Sun: 11:00 AM - 6:00 PM', 
    categories: ['Electronics', 'Computers', 'Accessories'],
    distance: '1.2 miles'
  },
  { 
    id: 2, 
    name: 'FashionFiesta', 
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZhc2hpb258ZW58MHx8MHx8fDA%3D', 
    address: '456 Style Street, New York, NY 10001', 
    phone: '(212) 555-5678', 
    hours: 'Mon-Sun: 9:00 AM - 9:00 PM', 
    categories: ['Clothing', 'Shoes', 'Accessories'],
    distance: '0.8 miles'
  },
  { 
    id: 3, 
    name: 'HomeDecor', 
    image: 'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvbWUlMjBkZWNvcnxlbnwwfHwwfHx8MA%3D%3D', 
    address: '789 Furnish Lane, Chicago, IL 60601', 
    phone: '(312) 555-9012', 
    hours: 'Mon-Fri: 10:00 AM - 8:00 PM, Sat-Sun: 10:00 AM - 6:00 PM', 
    categories: ['Home', 'Furniture', 'Decor'],
    distance: '2.5 miles'
  },
  { 
    id: 4, 
    name: 'GadgetHub', 
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGVjaHxlbnwwfHwwfHx8MA%3D%3D', 
    address: '101 Gadget Boulevard, Seattle, WA 98101', 
    phone: '(206) 555-3456', 
    hours: 'Mon-Sat: 9:00 AM - 9:00 PM, Sun: 10:00 AM - 7:00 PM', 
    categories: ['Electronics', 'Gadgets', 'Smart Home'],
    distance: '3.1 miles'
  },
  { 
    id: 5, 
    name: 'OrganicMart', 
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JvY2VyaWVzfGVufDB8fDB8fHww', 
    address: '202 Organic Way, Portland, OR 97201', 
    phone: '(503) 555-7890', 
    hours: 'Mon-Sun: 7:00 AM - 10:00 PM', 
    categories: ['Groceries', 'Organic', 'Health Foods'],
    distance: '1.5 miles'
  },
  { 
    id: 6, 
    name: 'KitchenPlus', 
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGtpdGNoZW58ZW58MHx8MHx8fDA%3D', 
    address: '303 Culinary Court, Austin, TX 78701', 
    phone: '(512) 555-2345', 
    hours: 'Mon-Fri: 10:00 AM - 8:00 PM, Sat: 10:00 AM - 7:00 PM, Sun: 11:00 AM - 6:00 PM', 
    categories: ['Home', 'Kitchen', 'Appliances'],
    distance: '4.2 miles'
  },
  { 
    id: 7, 
    name: 'BeanBrew', 
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlfGVufDB8fDB8fHww', 
    address: '404 Coffee Lane, Denver, CO 80202', 
    phone: '(303) 555-6789', 
    hours: 'Mon-Sun: 6:00 AM - 8:00 PM', 
    categories: ['Groceries', 'Coffee', 'Beverages'],
    distance: '0.5 miles'
  },
  { 
    id: 8, 
    name: 'BeautyBox', 
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D', 
    address: '505 Glamour Street, Miami, FL 33101', 
    phone: '(305) 555-0123', 
    hours: 'Mon-Sat: 9:00 AM - 9:00 PM, Sun: 10:00 AM - 7:00 PM', 
    categories: ['Beauty', 'Skincare', 'Cosmetics'],
    distance: '2.8 miles'
  },
  { 
    id: 9, 
    name: 'HealthFirst', 
    image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VwcGxlbWVudHN8ZW58MHx8MHx8fDA%3D', 
    address: '606 Wellness Road, Boston, MA 02108', 
    phone: '(617) 555-4567', 
    hours: 'Mon-Fri: 8:00 AM - 9:00 PM, Sat-Sun: 9:00 AM - 7:00 PM', 
    categories: ['Health', 'Supplements', 'Wellness'],
    distance: '1.9 miles'
  }
];

const allCategories = Array.from(
  new Set(allStores.flatMap(store => store.categories))
).sort();

const Stores = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredStores, setFilteredStores] = useState(allStores);
  const [showMap, setShowMap] = useState(false);
  
  // Handle search and filter
  useEffect(() => {
    let filtered = [...allStores];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(store => 
        store.name.toLowerCase().includes(query) ||
        store.address.toLowerCase().includes(query) ||
        store.categories.some(category => category.toLowerCase().includes(query))
      );
    }
    
    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(store => 
        store.categories.some(category => selectedCategories.includes(category))
      );
    }
    
    setFilteredStores(filtered);
  }, [searchQuery, selectedCategories]);
  
  // Toggle category selection
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Header */}
        <section className="relative py-16 bg-gradient-to-r from-goorder-600 to-goorder-500 overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Find Stores Near You
              </h1>
              <p className="text-goorder-100 text-lg mb-8">
                Discover local and online stores offering a wide range of products through GoOrder.
              </p>
              
              <div className="bg-white p-1 rounded-lg shadow-lg flex flex-col sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search for stores by name or location"
                    className="border-0 pl-10 h-12 w-full focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex mt-2 sm:mt-0">
                  <Button
                    className="bg-goorder-600 hover:bg-goorder-700 h-12 sm:rounded-l-none"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Find Stores
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-goorder-400 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-goorder-300 rounded-full opacity-30 blur-3xl"></div>
        </section>
        
        {/* Stores section */}
        <section className="py-12">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters */}
              <div className="w-full lg:w-72">
                <div className="bg-white p-5 rounded-lg shadow-sm sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-900">Filters</h3>
                    
                    {(selectedCategories.length > 0 || searchQuery) && (
                      <button
                        className="text-sm text-goorder-600 hover:text-goorder-700"
                        onClick={resetFilters}
                      >
                        Reset all
                      </button>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Categories</h4>
                    
                    <div className="space-y-2">
                      {allCategories.map((category) => (
                        <div
                          key={category}
                          className="flex items-center"
                        >
                          <button
                            className="group flex items-center w-full p-1 rounded hover:bg-gray-50"
                            onClick={() => toggleCategory(category)}
                          >
                            <div className={`w-4 h-4 rounded mr-3 flex items-center justify-center border ${
                              selectedCategories.includes(category)
                                ? 'bg-goorder-600 border-goorder-600'
                                : 'border-gray-300 group-hover:border-gray-400'
                            }`}>
                              {selectedCategories.includes(category) && (
                                <Check className="w-3 h-3 text-white" />
                              )}
                            </div>
                            <span className={`text-sm ${
                              selectedCategories.includes(category)
                                ? 'font-medium text-gray-900'
                                : 'text-gray-700'
                            }`}>
                              {category}
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Distance</h4>
                    
                    <div className="space-y-2">
                      {['Within 5 miles', 'Within 10 miles', 'Within 25 miles', 'Within 50 miles'].map((option) => (
                        <div
                          key={option}
                          className="flex items-center"
                        >
                          <button
                            className="group flex items-center w-full p-1 rounded hover:bg-gray-50"
                          >
                            <div className="w-4 h-4 rounded-full mr-3 border border-gray-300 group-hover:border-gray-400">
                            </div>
                            <span className="text-sm text-gray-700">
                              {option}
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center"
                      onClick={() => setShowMap(!showMap)}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {showMap ? 'Hide Map' : 'Show Map'}
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Stores list */}
              <div className="flex-1">
                {showMap && (
                  <div className="mb-8 bg-gray-100 rounded-lg overflow-hidden h-80">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d34015.07651618799!2d-122.41941661651754!3d37.77492951262124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1637087667039!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      title="Store locations"
                    ></iframe>
                  </div>
                )}
                
                {/* Active filters */}
                {(selectedCategories.length > 0 || searchQuery) && (
                  <div className="mb-6 flex flex-wrap items-center gap-2">
                    <span className="text-sm text-gray-500">Active filters:</span>
                    
                    {searchQuery && (
                      <div className="inline-flex items-center bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm">
                        Search: "{searchQuery}"
                        <button 
                          className="ml-1 text-gray-500 hover:text-gray-700"
                          onClick={() => setSearchQuery('')}
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                    
                    {selectedCategories.map((category) => (
                      <div 
                        key={category} 
                        className="inline-flex items-center bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm"
                      >
                        Category: {category}
                        <button 
                          className="ml-1 text-gray-500 hover:text-gray-700"
                          onClick={() => toggleCategory(category)}
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {filteredStores.length} Stores {selectedCategories.length > 0 && 'in Selected Categories'}
                  </h2>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select className="text-sm border-gray-300 rounded-md">
                      <option>Nearest</option>
                      <option>A-Z</option>
                      <option>Most Popular</option>
                    </select>
                  </div>
                </div>
                
                {filteredStores.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStores.map((store, index) => (
                      <motion.div
                        key={store.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <StoreCard {...store} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                      <MapPin className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">No stores found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your search or filter to find stores.</p>
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
        
        {/* Become a partner */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Become a GoOrder Partner
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Join our network of stores and reach more customers. GoOrder helps businesses like yours grow by connecting you with shoppers looking for your products.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Expand your customer base',
                      'Simple integration with your existing systems',
                      'Fast payments and transparent fees',
                      'Dedicated support for partners'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-goorder-600 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="bg-goorder-600 hover:bg-goorder-700 h-11">
                    Apply to Become a Partner
                  </Button>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-goorder-500/20 to-goorder-300/20 rounded-xl transform rotate-3"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0b3JlfGVufDB8fDB8fHww" 
                    alt="Store partner" 
                    className="relative rounded-xl shadow-lg w-full object-cover aspect-[4/3]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Stores;
