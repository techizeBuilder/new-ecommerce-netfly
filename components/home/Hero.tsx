import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <div className="relative bg-gray-900 h-[500px]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
          alt="Hero background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col justify-center h-full">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Spring Collection <br />
            <span className="text-yellow-400">2024</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-lg">
            Discover our latest collection with up to 50% off on selected items.
          </p>
          <div className="space-x-4">
            <Link href="/category/new-arrivals">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Shop Now
              </Button>
            </Link>
            <Link href="/category/sale">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                View Sale
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}