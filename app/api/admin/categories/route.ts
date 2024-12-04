import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb/connect';
import Category from '@/lib/mongodb/models/Category';

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    
    // Create slug from name
    const slug = body.name.toLowerCase().replace(/\s+/g, '-');
    const category = await Category.create({ ...body, slug });
    
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}