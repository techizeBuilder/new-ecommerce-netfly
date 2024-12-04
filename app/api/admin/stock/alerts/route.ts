import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb/connect';
import Stock from '@/lib/mongodb/models/Stock';

export async function GET() {
  try {
    await connectToDatabase();
    const lowStockItems = await Stock.find({
      $expr: {
        $lte: ['$quantity', '$lowStockThreshold']
      }
    }).populate('product', 'name');
    
    return NextResponse.json(lowStockItems);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stock alerts' },
      { status: 500 }
    );
  }
}