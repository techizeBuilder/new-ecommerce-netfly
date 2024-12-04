import { ProductGrid } from '@/components/products/ProductGrid';
import { CategoryContent } from '@/components/category/CategoryContent';
import { PRODUCT_CATEGORIES } from '@/lib/constants/products';

interface CategoryPageProps {
  params: { slug: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryContent slug={params.slug} />;
}

export function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((category) => ({
    slug: category.toLowerCase().replace(/\s+/g, '-'),
  }));
}