'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

interface OrderDetailsProps {
  order: any;
}

export function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Order Information</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Order Number:</span> {order.orderNumber}</p>
            <p><span className="font-medium">Date:</span> {formatDate(order.createdAt)}</p>
            <p>
              <span className="font-medium">Status:</span>{' '}
              <Badge>{order.status}</Badge>
            </p>
            <p>
              <span className="font-medium">Payment Status:</span>{' '}
              <Badge variant={order.paymentStatus === 'paid' ? 'default' : 'destructive'}>
                {order.paymentStatus}
              </Badge>
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-2">Customer Information</h3>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">Name:</span>{' '}
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </p>
            <p>
              <span className="font-medium">Address:</span>{' '}
              {order.shippingAddress.address}
            </p>
            <p>
              <span className="font-medium">City:</span>{' '}
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
            <p>
              <span className="font-medium">Country:</span>{' '}
              {order.shippingAddress.country}
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Order Items</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} className="text-right font-medium">
                Subtotal
              </TableCell>
              <TableCell className="text-right">
                ${order.subtotal.toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="text-right font-medium">
                Shipping
              </TableCell>
              <TableCell className="text-right">
                ${order.shipping.toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="text-right font-medium">
                Tax
              </TableCell>
              <TableCell className="text-right">
                ${order.tax.toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="text-right font-bold">
                Total
              </TableCell>
              <TableCell className="text-right font-bold">
                ${order.total.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      {order.notes && (
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Order Notes</h3>
          <p className="text-sm">{order.notes}</p>
        </Card>
      )}
    </div>
  );
}