
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
import { useProduct } from '@/hooks/useProduct';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    product,
    productLoading,
    productError,
    relatedProducts,
    relatedLoading,
    isError
  } = useProduct(id);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (isError) {
      toast({
        title: "Error",
        description: "Failed to load product details. Please try again later.",
        variant: "destructive",
      });
    }
  }, [id, isError]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Breadcrumbs */}
        {productLoading ? (
          <div className="container py-4">
            <Skeleton className="h-6 w-64" />
          </div>
        ) : product && (
          <ProductBreadcrumbs 
            category={product.category}
            name={product.name}
          />
        )}
        
        {/* Product detail section */}
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product images */}
              {productLoading ? (
                <div className="space-y-4">
                  <Skeleton className="aspect-square w-full rounded-lg" />
                  <div className="grid grid-cols-3 gap-4">
                    <Skeleton className="aspect-square w-full rounded-md" />
                    <Skeleton className="aspect-square w-full rounded-md" />
                    <Skeleton className="aspect-square w-full rounded-md" />
                  </div>
                </div>
              ) : product && (
                <ProductImages 
                  images={product.images}
                  name={product.name}
                  isNew={product.isNew}
                  discount={product.discount}
                />
              )}
              
              {/* Product information */}
              {productLoading ? (
                <div className="space-y-6">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-10 w-1/2" />
                  <div className="grid grid-cols-3 gap-4">
                    <Skeleton className="h-10 w-full rounded-full" />
                    <Skeleton className="h-10 w-full rounded-full" />
                    <Skeleton className="h-10 w-full rounded-full" />
                  </div>
                  <Skeleton className="h-12 w-full" />
                  <div className="flex gap-4">
                    <Skeleton className="h-12 w-1/2" />
                    <Skeleton className="h-12 w-1/2" />
                  </div>
                </div>
              ) : product && (
                <ProductInfo product={product} />
              )}
            </div>
          </div>
        </section>
        
        {/* Product tabs */}
        <section className="py-12 bg-gray-50">
          <div className="container">
            {productLoading ? (
              <div className="space-y-6">
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
            ) : product && (
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
                    specifications={product.specifications}
                  />
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-0">
                  <ProductReviews 
                    reviews={product.productReviews}
                    rating={product.rating}
                    totalReviews={product.reviews}
                  />
                </TabsContent>
                
                <TabsContent value="shipping" className="mt-0">
                  <ProductShipping />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </section>
        
        {/* Related products */}
        {relatedLoading ? (
          <section className="py-12">
            <div className="container">
              <Skeleton className="h-8 w-64 mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="h-80 w-full rounded-xl" />
                <Skeleton className="h-80 w-full rounded-xl" />
                <Skeleton className="h-80 w-full rounded-xl" />
              </div>
            </div>
          </section>
        ) : relatedProducts && (
          <RelatedProducts products={relatedProducts} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
