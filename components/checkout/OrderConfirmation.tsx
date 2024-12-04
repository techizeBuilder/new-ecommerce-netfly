import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function OrderConfirmation() {
  const orderNumber = Math.floor(Math.random() * 1000000);

  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
        <CheckCircle2 className="h-8 w-8 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold mb-2">Thank You for Your Order!</h2>
      <p className="text-gray-600 mb-4">
        Order #{orderNumber} has been successfully placed.
      </p>
      
      <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-6 mb-6">
        <p className="text-sm text-gray-600">
          We've sent a confirmation email with your order details.
          You can track your order status in your account dashboard.
        </p>
      </div>

      <div className="space-y-4">
        <Link href="/account/orders">
          <Button variant="outline" className="w-full">
            View Order Status
          </Button>
        </Link>
        <Link href="/">
          <Button className="w-full">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}