
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const ProductCardSkeleton = () => {
  return (
    <Card className="product-shadow animate-pulse">
      {/* Product Image Skeleton */}
      <Skeleton className="aspect-square w-full rounded-t-xl" />
      
      {/* Product Info Skeleton */}
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
        
        <Skeleton className="h-5 w-3/4" />
        
        <Skeleton className="h-3 w-24" />
        
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCardSkeleton;
