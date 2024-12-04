import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function EmptyCart() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
        <h2 className="mt-4 text-2xl font-bold">Your cart is empty</h2>
        <p className="mt-2 text-gray-600">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link href="/products">
          <Button className="mt-8">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </main>
  );
}