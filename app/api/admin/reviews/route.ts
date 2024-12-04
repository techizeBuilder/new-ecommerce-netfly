import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb/connect';
import Review from '@/lib/mongodb/models/Review';

export async function GET() {
  try {
    await connectToDatabase();
    const reviews = await Review.find({})
      .populate('product', 'name')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}