'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';

interface AdminStatsProps {
  stats: {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    totalCustomers: number;
  } | null;
}

export function AdminStats({ stats }: AdminStatsProps) {
  if (!stats) return null;

  const items = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      description: 'Total revenue this month',
    },
    {
      title: 'Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      description: 'Total orders this month',
    },
    {
      title: 'Products',
      value: stats.totalProducts,
      icon: Package,
      description: 'Total active products',
    },
    {
      title: 'Customers',
      value: stats.totalCustomers,
      icon: Users,
      description: 'Total registered customers',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {item.title}
            </CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">
              {item.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}