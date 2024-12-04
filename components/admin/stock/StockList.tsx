'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface StockListProps {
  onSelect: (stock: any) => void;
}

export function StockList({ onSelect }: StockListProps) {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await fetch('/api/admin/stock');
      const data = await response.json();
      setStocks(data);
    } catch (error) {
      toast.error('Failed to fetch stock data');
    }
  };

  const getStockStatus = (quantity: number, threshold: number) => {
    if (quantity <= 0) return { label: 'Out of Stock', color: 'destructive' };
    if (quantity <= threshold) return { label: 'Low Stock', color: 'warning' };
    return { label: 'In Stock', color: 'success' };
  };

  const filteredStocks = stocks.filter((stock: any) =>
    stock.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search inventory..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStocks.map((stock: any) => {
            const status = getStockStatus(stock.quantity, stock.lowStockThreshold);
            return (
              <TableRow key={stock._id}>
                <TableCell>{stock.product.name}</TableCell>
                <TableCell>{stock.quantity}</TableCell>
                <TableCell>{stock.location}</TableCell>
                <TableCell>
                  <Badge variant={status.color as any}>
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(stock.lastUpdated).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelect(stock)}
                  >
                    Adjust Stock
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {filteredStocks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No stock items found
        </div>
      )}
    </div>
  );
}