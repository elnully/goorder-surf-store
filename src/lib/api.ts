
import { ProductData } from '@/types/product';

// Mock API data
const mockProductData: Record<string, ProductData> = {
  "1": {
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
  }
};

// Mock related products
const mockRelatedProducts = [
  { id: 2, name: 'Smart Watch Series 5', price: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D', store: 'GadgetHub', category: 'Electronics', rating: 4.5 },
  { id: 8, name: 'Noise Cancelling Headphones', price: 249.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D', store: 'TechWorld', category: 'Electronics', rating: 4.7 },
  { id: 15, name: 'Portable Bluetooth Speaker', price: 79.99, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D', store: 'AudioZone', category: 'Electronics', rating: 4.4 },
];

// Simulate API fetch with delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchProduct = async (id: string | undefined): Promise<ProductData> => {
  if (!id) throw new Error('Product ID is required');
  
  // Simulate API request delay
  await delay(800);
  
  const product = mockProductData[id];
  
  if (!product) {
    throw new Error(`Product with ID ${id} not found`);
  }
  
  return product;
};

export const fetchRelatedProducts = async (id: string | undefined) => {
  // Simulate API request delay
  await delay(600);
  
  return mockRelatedProducts;
};
