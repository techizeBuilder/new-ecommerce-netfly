import { z } from 'zod';
import { PRODUCT_CATEGORIES } from '../constants/products';

export const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be positive'),
  image: z.string().url('Invalid image URL'),
  category: z.enum(PRODUCT_CATEGORIES, {
    errorMap: () => ({ message: 'Invalid category' }),
  }),
  inStock: z.boolean().default(true),
});

export type ProductFormData = z.infer<typeof productSchema>;