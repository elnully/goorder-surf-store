
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Track scrolling for navbar appearance change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  const NavLinks = () => (
    <>
      <NavLink to="/" label="Home" />
      <NavLink to="/products" label="Products" />
      <NavLink to="/stores" label="Stores" />
    </>
  );
  
  const NavLink = ({ to, label }: { to: string; label: string }) => {
    const isActive = location.pathname === to;
    
    return (
      <Link 
        to={to} 
        className={cn(
          "relative py-2 px-1 font-medium text-base animate-hover",
          isActive 
            ? "text-goorder-600" 
            : "text-gray-700 hover:text-goorder-600"
        )}
      >
        {label}
        {isActive && (
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-goorder-600 rounded-full animate-fade-in" />
        )}
      </Link>
    );
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "py-3 bg-white/90 backdrop-blur-md shadow-sm" 
        : "py-5 bg-transparent"
    )}>
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="relative w-10 h-10 mr-2 rounded-full bg-goorder-600 flex items-center justify-center">
            <img
              src="/lovable-uploads/f4855330-cbbd-4a6a-b987-2afe895fc11e.png"
              alt="GoOrder"
              className="w-8 h-8 object-contain"
            />
          </div>
          <span className="text-xl font-bold text-gray-900">GoOrder</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <NavLinks />
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="w-5 h-5" />
          </Button>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </Link>
          
          <Link to="/auth">
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="w-5 h-5" />
            </Button>
          </Link>
          
          <Link to="/cart">
            <Button className="bg-goorder-600 hover:bg-goorder-700 text-white">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
            </Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-3">
          <Link to="/cart">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen 
              ? <X className="w-5 h-5" /> 
              : <Menu className="w-5 h-5" />
            }
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out pt-20",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="container flex flex-col items-center space-y-6 py-8">
          <NavLinks />
          
          <div className="w-full pt-4 border-t border-gray-100">
            <Link to="/auth">
              <Button 
                variant="outline" 
                className="w-full justify-start mb-3"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In / Register
              </Button>
            </Link>
            
            <Link to="/cart">
              <Button 
                className="w-full justify-start bg-goorder-600 hover:bg-goorder-700 text-white"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                View Cart
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
