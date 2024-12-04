import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb/connect';
import Stock from '@/lib/mongodb/models/Stock';

export async function GET() {
  try {
    await connectToDatabase();
    const stocks = await Stock.find({})
      .populate('product', 'name price')
      .sort({ lastUpdated: -1 });
    return NextResponse.json(stocks);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    );
  }
}