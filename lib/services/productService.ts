import { Product } from '@/types/product';
import { PRODUCTS_PER_PAGE } from '../constants/products';

interface FetchProductsParams {
  category?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export async function fetchProducts({
  category,
  search,
  sort,
  page = 1,
  limit = PRODUCTS_PER_PAGE,
}: FetchProductsParams = {}): Promise<Product[]> {
  const queryParams = new URLSearchParams();
  
  if (category) queryParams.append('category', category);
  if (search) queryParams.append('search', search);
  if (sort) queryParams.append('sort', sort);
  if (limit) queryParams.append('limit', limit.toString());
  if (page > 1) queryParams.append('page', page.toString());

  const response = await fetch(`/api/products?${queryParams.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
}

export async function fetchProductById(id: string): Promise<Product> {
  const response = await fetch(`/api/products/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  return response.json();
}