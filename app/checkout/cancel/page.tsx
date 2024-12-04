import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
          <XCircle className="h-8 w-8 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-bold">Payment Cancelled</h1>
        <p className="text-gray-600 mt-2">
          Your payment was cancelled. If you have any questions, please contact our support team.
        </p>
        
        <div className="mt-8 space-y-4">
          <Link href="/checkout">
            <Button variant="outline" className="w-full">
              Try Again
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}