'use client';

import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductSort } from '@/components/products/ProductSort';
import { ProductFilters } from '@/components/products/ProductFilters';

// Sample sale products - in a real app, fetch from API
const saleProducts = [
  {
    id: '1',
    name: 'Premium Headphones',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    category: 'Electronics',
    inStock: true,
    originalPrice: 199.99,
  },
  {
    id: '2',
    name: 'Wireless Speaker',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1589256469067-ea99122bbdc9',
    category: 'Electronics',
    inStock: true,
    originalPrice: 99.99,
  },
  {
    id: '3',
    name: 'Designer Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    category: 'Accessories',
    inStock: true,
    originalPrice: 299.99,
  },
];

export default function SalePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Sale</h1>
          <p className="text-gray-600 mt-2">Great deals on amazing products</p>
        </div>
        <ProductSort onSortChange={() => {}} />
      </div>

      <div className="flex gap-8">
        <div className="w-64 flex-shrink-0">
          <ProductFilters onFilterChange={() => {}} />
        </div>
        <div className="flex-1">
          <ProductGrid products={saleProducts} />
        </div>
      </div>
    </div>
  );
}