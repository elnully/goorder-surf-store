
import { useQuery } from '@tanstack/react-query';
import { fetchProduct, fetchRelatedProducts } from '@/lib/api';
import { ProductData } from '@/types/product';

export const useProduct = (id: string | undefined) => {
  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

  const {
    data: relatedProducts,
    isLoading: relatedLoading,
    error: relatedError,
  } = useQuery({
    queryKey: ['relatedProducts', id],
    queryFn: () => fetchRelatedProducts(id),
    enabled: !!id,
  });

  return {
    product,
    productLoading,
    productError,
    relatedProducts,
    relatedLoading,
    relatedError,
    isLoading: productLoading || relatedLoading,
    isError: !!productError || !!relatedError,
  };
};
