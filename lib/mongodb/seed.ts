import { connectToDatabase } from './connect';
import Product from './models/Product';

const sampleProducts = [
  {
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with noise cancellation',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    category: 'Electronics',
    inStock: true,
  },
  {
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    category: 'Electronics',
    inStock: true,
  },
  {
    name: 'Premium Backpack',
    description: 'Durable and stylish backpack for everyday use',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    category: 'Fashion',
    inStock: true,
  },
  {
    name: 'Sunglasses',
    description: 'Classic design sunglasses with UV protection',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
    category: 'Accessories',
    inStock: true,
  },
];

export async function seedProducts() {
  try {
    await connectToDatabase();
    
    // Only seed if the collection is empty
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(sampleProducts);
      console.log('Sample products seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}