'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface OrderReviewProps {
  formData: {
    shipping: {
      firstName: string;
      lastName: string;
      email: string;
      address: string;
      city: string;
      state: string;
      zipCode: string;
      phone: string;
    };
    payment: {
      cardNumber: string;
      cardHolder: string;
      expiryDate: string;
    };
  };
  onConfirm: () => void;
  onBack: () => void;
}

export function OrderReview({ formData, onConfirm, onBack }: OrderReviewProps) {
  // Sample cart items - in a real app, this would come from your cart state
  const cartItems = [
    {
      name: 'Wireless Headphones',
      price: 199.99,
      quantity: 1,
    },
    {
      name: 'Smart Watch',
      price: 299.99,
      quantity: 2,
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2} className="font-medium">
                Subtotal
              </TableCell>
              <TableCell className="text-right">${subtotal.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} className="font-medium">
                Shipping
              </TableCell>
              <TableCell className="text-right">
                {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} className="font-medium">
                Tax
              </TableCell>
              <TableCell className="text-right">${tax.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} className="font-bold text-lg">
                Total
              </TableCell>
              <TableCell className="text-right font-bold text-lg">
                ${total.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Name</p>
            <p>{formData.shipping.firstName} {formData.shipping.lastName}</p>
          </div>
          <div>
            <p className="font-medium">Email</p>
            <p>{formData.shipping.email}</p>
          </div>
          <div>
            <p className="font-medium">Phone</p>
            <p>{formData.shipping.phone}</p>
          </div>
          <div>
            <p className="font-medium">Address</p>
            <p>
              {formData.shipping.address}<br />
              {formData.shipping.city}, {formData.shipping.state} {formData.shipping.zipCode}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
        <div>
          <p className="font-medium">Card Number</p>
          <p>**** **** **** {formData.payment.cardNumber.slice(-4)}</p>
        </div>
        <div className="mt-2">
          <p className="font-medium">Card Holder</p>
          <p>{formData.payment.cardHolder}</p>
        </div>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onConfirm} className="flex-1">
          Place Order
        </Button>
      </div>
    </div>
  );
}