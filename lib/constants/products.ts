export const PRODUCTS_PER_PAGE = 12;

export const SORT_OPTIONS = {
  PRICE_ASC: 'price-asc',
  PRICE_DESC: 'price-desc',
  NAME_ASC: 'name-asc',
  NAME_DESC: 'name-desc',
  NEWEST: 'newest',
} as const;

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Fashion',
  'Accessories',
  'Home & Living',
] as const;