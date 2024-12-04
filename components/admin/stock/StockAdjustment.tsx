'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface StockAdjustmentProps {
  selectedStock: any;
}

export function StockAdjustment({ selectedStock }: StockAdjustmentProps) {
  const [formData, setFormData] = useState({
    quantity: '',
    type: 'addition',
    reason: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStock) {
      toast.error('Please select a stock item');
      return;
    }

    try {
      const response = await fetch(`/api/admin/stock/${selectedStock._id}/adjust`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to adjust stock');

      toast.success('Stock adjusted successfully');
      setFormData({ quantity: '', type: 'addition', reason: '' });
    } catch (error) {
      toast.error('Failed to adjust stock');
    }
  };

  if (!selectedStock) {
    return (
      <div className="text-center py-8 text-gray-500">
        Please select a stock item from the inventory list
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <h2 className="text-lg font-semibold mb-4">
          Adjust Stock: {selectedStock.product.name}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Current Quantity: {selectedStock.quantity}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Adjustment Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="addition">Add Stock</SelectItem>
            <SelectItem value="reduction">Remove Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          min="1"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Reason</Label>
        <Textarea
          id="reason"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          placeholder="Enter reason for adjustment"
          required
        />
      </div>

      <Button type="submit">Submit Adjustment</Button>
    </form>
  );
}