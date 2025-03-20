
import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
}

interface ProductReviewsProps {
  reviews: Review[];
  rating: number;
  totalReviews: number;
}

const ProductReviews = ({ reviews, rating, totalReviews }: ProductReviewsProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
        <Button variant="outline">Write a Review</Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-baseline mb-4">
            <span className="text-5xl font-bold text-gray-900 mr-2">{rating.toFixed(1)}</span>
            <span className="text-lg text-gray-600">out of 5</span>
          </div>
          
          <div className="flex mb-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(rating) 
                    ? "text-yellow-400 fill-yellow-400" 
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          
          <p className="text-sm text-gray-600 mb-4">Based on {totalReviews} reviews</p>
          
          {/* Rating bars - simplified for the example */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center">
                <span className="text-sm text-gray-600 w-8">{star} star</span>
                <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full" 
                    style={{ 
                      width: star === 5 ? '70%' : 
                             star === 4 ? '20%' : 
                             star === 3 ? '5%' : 
                             star === 2 ? '3%' : '2%' 
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">
                  {star === 5 ? '70%' : 
                   star === 4 ? '20%' : 
                   star === 3 ? '5%' : 
                   star === 2 ? '3%' : '2%'
                  }
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-base font-medium text-gray-900 mb-4">Recent Reviews</h4>
          
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                <div className="flex justify-between mb-1">
                  <h5 className="font-medium text-gray-900">{review.title}</h5>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating 
                            ? "text-yellow-400 fill-yellow-400" 
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{review.name}</span>
                </div>
                
                <p className="text-gray-700 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
          
          <Button variant="ghost" className="mt-4 text-goorder-600 hover:text-goorder-700 hover:bg-goorder-50 px-0">
            View all reviews <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
