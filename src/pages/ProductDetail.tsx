
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductImages from '@/components/product/ProductImages';
import ProductInfo from '@/components/product/ProductInfo';
import ProductBreadcrumbs from '@/components/product/ProductBreadcrumbs';
import ProductSpecifications from '@/components/product/ProductSpecifications';
import ProductReviews from '@/components/product/ProductReviews';
import ProductShipping from '@/components/product/ProductShipping';
import RelatedProducts from '@/components/product/RelatedProducts';
import { ProductData } from '@/types/product';

// Mock data for a single product
const productData: ProductData = {
  id: 1,
  name: 'Wireless Bluetooth Earbuds',
  description: 'Experience premium sound quality with these wireless Bluetooth earbuds. Featuring active noise cancellation, touch controls, and a compact charging case that provides up to 24 hours of battery life. Perfect for workouts, commuting, or everyday use.',
  price: 89.99,
  originalPrice: 129.99,
  discount: 30,
  images: [
    'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVhcmJ1ZHN8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGVhcmJ1ZHN8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGVhcmJ1ZHN8ZW58MHx8MHx8fDA%3D',
  ],
  store: 'TechWorld',
  storeId: 1,
  category: 'Electronics',
  rating: 4.8,
  reviews: 128,
  stock: 15,
  isNew: true,
  features: [
    'Active Noise Cancellation',
    'Touch Controls',
    'Bluetooth 5.0',
    'Waterproof (IPX7)',
    '24-Hour Battery Life',
    'Built-in Microphone',
    'Quick Charging'
  ],
  specifications: {
    'Connectivity': 'Bluetooth 5.0',
    'Battery Life': 'Up to 8 hours (24 hours with case)',
    'Charging': 'USB-C',
    'Water Resistance': 'IPX7',
    'Weight': '5.6g per earbud, 45g charging case',
    'Noise Cancellation': 'Active Noise Cancellation (ANC)',
    'Microphone': 'Built-in with noise reduction',
    'Controls': 'Touch sensitive',
    'Compatibility': 'iOS, Android, Windows'
  },
  colors: ['Black', 'White', 'Blue'],
  productReviews: [
    {
      id: 1,
      name: 'John D.',
      rating: 5,
      date: '2023-03-15',
      title: 'Incredible sound quality!',
      comment: 'These earbuds exceeded my expectations. The sound quality is crystal clear, and the noise cancellation works perfectly in noisy environments.',
    },
    {
      id: 2,
      name: 'Sarah M.',
      rating: 4,
      date: '2023-02-28',
      title: 'Great for workouts',
      comment: 'I use these during my daily runs, and they stay in place perfectly. The battery life is excellent, and they\'re comfortable for long periods.',
    },
    {
      id: 3,
      name: 'Michael T.',
      rating: 5,
      date: '2023-02-10',
      title: 'Worth every penny',
      comment: 'After trying several wireless earbuds, these are by far the best. The sound quality and comfort are unmatched at this price point.',
    }
  ]
};

// Related products
const relatedProducts = [
  { id: 2, name: 'Smart Watch Series 5', price: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D', store: 'GadgetHub', category: 'Electronics', rating: 4.5 },
  { id: 8, name: 'Noise Cancelling Headphones', price: 249.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D', store: 'TechWorld', category: 'Electronics', rating: 4.7 },
  { id: 15, name: 'Portable Bluetooth Speaker', price: 79.99, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D', store: 'AudioZone', category: 'Electronics', rating: 4.4 },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    // In a real app, this would fetch product by ID from an API
    window.scrollTo(0, 0);
  }, [id]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Breadcrumbs */}
        <ProductBreadcrumbs 
          category={productData.category}
          name={productData.name}
        />
        
        {/* Product detail section */}
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product images */}
              <ProductImages 
                images={productData.images}
                name={productData.name}
                isNew={productData.isNew}
                discount={productData.discount}
              />
              
              {/* Product information */}
              <ProductInfo product={productData} />
            </div>
          </div>
        </section>
        
        {/* Product tabs */}
        <section className="py-12 bg-gray-50">
          <div className="container">
            <Tabs defaultValue="specifications">
              <TabsList className="w-full flex justify-start mb-8 bg-white p-1 rounded-lg border border-gray-200">
                <TabsTrigger 
                  value="specifications" 
                  className="flex-1 md:flex-none data-[state=active]:text-goorder-600 data-[state=active]:bg-goorder-50"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="flex-1 md:flex-none data-[state=active]:text-goorder-600 data-[state=active]:bg-goorder-50"
                >
                  Reviews
                </TabsTrigger>
                <TabsTrigger 
                  value="shipping" 
                  className="flex-1 md:flex-none data-[state=active]:text-goorder-600 data-[state=active]:bg-goorder-50"
                >
                  Shipping & Returns
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="specifications" className="mt-0">
                <ProductSpecifications 
                  specifications={productData.specifications}
                />
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-0">
                <ProductReviews 
                  reviews={productData.productReviews}
                  rating={productData.rating}
                  totalReviews={productData.reviews}
                />
              </TabsContent>
              
              <TabsContent value="shipping" className="mt-0">
                <ProductShipping />
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Related products */}
        <RelatedProducts products={relatedProducts} />
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
