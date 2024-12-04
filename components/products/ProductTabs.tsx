'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

interface ProductTabsProps {
  product: {
    description: string;
    specifications: Record<string, string>;
  };
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="mt-12">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="shipping">Shipping</TabsTrigger>
      </TabsList>
      
      <TabsContent value="description" className="mt-6">
        <div className="prose max-w-none">
          <p>{product.description}</p>
        </div>
      </TabsContent>
      
      <TabsContent value="specifications" className="mt-6">
        <Table>
          <TableBody>
            {Object.entries(product.specifications).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell className="font-medium">{key}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
      
      <TabsContent value="shipping" className="mt-6">
        <div className="prose max-w-none">
          <h3>Shipping Information</h3>
          <ul>
            <li>Free shipping on orders over $50</li>
            <li>Standard delivery: 3-5 business days</li>
            <li>Express delivery: 1-2 business days</li>
            <li>International shipping available</li>
          </ul>
        </div>
      </TabsContent>
    </Tabs>
  );
}