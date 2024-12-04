'use client';

import { useState } from 'react';
import { StockList } from '@/components/admin/stock/StockList';
import { StockAdjustment } from '@/components/admin/stock/StockAdjustment';
import { StockAlerts } from '@/components/admin/stock/StockAlerts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

export default function StockManagementPage() {
  const [selectedStock, setSelectedStock] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Stock Management</h1>
      </div>

      <StockAlerts />

      <Tabs defaultValue="inventory">
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="adjustments">Stock Adjustments</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory">
          <Card className="p-6">
            <StockList onSelect={setSelectedStock} />
          </Card>
        </TabsContent>

        <TabsContent value="adjustments">
          <Card className="p-6">
            <StockAdjustment selectedStock={selectedStock} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}