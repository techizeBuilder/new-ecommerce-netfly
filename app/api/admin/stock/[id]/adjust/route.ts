import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb/connect';
import Stock from '@/lib/mongodb/models/Stock';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { quantity, type, reason } = await request.json();
    await connectToDatabase();

    const stock = await Stock.findById(params.id);
    if (!stock) {
      return NextResponse.json(
        { error: 'Stock not found' },
        { status: 404 }
      );
    }

    const adjustment = parseInt(quantity);
    const newQuantity = type === 'addition'
      ? stock.quantity + adjustment
      : stock.quantity - adjustment;

    if (newQuantity < 0) {
      return NextResponse.json(
        { error: 'Insufficient stock for reduction' },
        { status: 400 }
      );
    }

    stock.quantity = newQuantity;
    stock.stockHistory.push({
      quantity: adjustment,
      type,
      reason,
    });

    await stock.save();

    return NextResponse.json(stock);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}