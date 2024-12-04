'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface ProductInfoProps {
  product: {
    name: string;
    price: number;
    description: string;
    inStock: boolean;
    features: string[];
  };
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    toast.success('Added to cart!');
  };

  const addToWishlist = () => {
    toast.success('Added to wishlist!');
  };

  const shareProduct = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
      </div>

      <div>
        <Badge variant={product.inStock ? 'default' : 'destructive'}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </Badge>
      </div>

      <p className="text-gray-600">{product.description}</p>

      <div className="space-y-2">
        <h3 className="font-semibold">Key Features:</h3>
        <ul className="list-disc list-inside space-y-1">
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-24">
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
        <Button onClick={addToCart} disabled={!product.inStock} className="flex-1">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={addToWishlist}>
          <Heart className="mr-2 h-4 w-4" />
          Add to Wishlist
        </Button>
        <Button variant="outline" onClick={shareProduct}>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  );
}