import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { fetchProducts } from '@/lib/services/productService';
import { PRODUCTS_PER_PAGE } from '@/lib/constants/products';

interface UseProductsOptions {
  category?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
}

export function useProducts({
  category,
  search,
  sort,
  page = 1,
  limit = PRODUCTS_PER_PAGE,
}: UseProductsOptions = {}): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchProducts({
          category,
          search,
          sort,
          page: currentPage,
          limit,
        });
        setProducts(data);
        // In a real app, total pages would come from the API
        setTotalPages(Math.ceil(data.length / limit));
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [category, search, sort, currentPage, limit]);

  return {
    products,
    isLoading,
    error,
    totalPages,
    currentPage,
    setPage: setCurrentPage,
  };
}