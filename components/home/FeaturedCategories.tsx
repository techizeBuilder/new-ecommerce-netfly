import { Layers, Shirt, Watch, Laptop, Home } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const categories = [
  { name: 'Electronics', icon: Laptop },
  { name: 'Fashion', icon: Shirt },
  { name: 'Accessories', icon: Watch },
  { name: 'Home & Living', icon: Home },
  { name: 'All Categories', icon: Layers },
];

export function FeaturedCategories() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link href={`/category/${category.name.toLowerCase()}`} key={category.name}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Icon className="h-8 w-8 mb-2" />
                    <span className="font-medium">{category.name}</span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}