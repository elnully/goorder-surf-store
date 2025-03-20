
export interface ProductReview {
  id: number;
  name: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
}

export interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  store: string;
  storeId: number;
  category: string;
  rating: number;
  reviews: number;
  stock: number;
  isNew?: boolean;
  features: string[];
  specifications: Record<string, string>;
  colors: string[];
  productReviews: ProductReview[];
}
