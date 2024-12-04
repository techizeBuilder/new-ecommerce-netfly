'use client';

import { useState, useEffect } from 'react';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductSort } from '@/components/products/ProductSort';
import { ProductGrid } from '@/components/products/ProductGrid';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (filters?: any, sort?: string) => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      
      if (filters?.categories?.length) {
        params.append('category', filters.categories.join(','));
      }
      
      if (sort) {
        params.append('sort', sort);
      }

      const response = await fetch(`/api/products?${params.toString()}`);
      const data = await response.json();
      
      let filteredProducts = data;
      
      if (filters?.priceRange) {
        filteredProducts = filteredProducts.filter((product: any) =>
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1]
        );
      }

      if (filters?.inStockOnly) {
        filteredProducts = filteredProducts.filter((product: any) =>
          product.inStock
        );
      }

      setProducts(filteredProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filters: any) => {
    fetchProducts(filters);
  };

  const handleSortChange = (sortValue: string) => {
    fetchProducts(undefined, sortValue);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        <ProductSort onSortChange={handleSortChange} />
      </div>
      <div className="flex gap-8">
        <div className="w-64 flex-shrink-0">
          <ProductFilters onFilterChange={handleFilterChange} />
        </div>
        <div className="flex-1">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}