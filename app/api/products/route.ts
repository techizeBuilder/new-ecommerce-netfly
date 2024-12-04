import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb/connect';
import Product from '@/lib/mongodb/models/Product';
import { seedProducts } from '@/lib/mongodb/seed';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    await seedProducts();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    const limit = searchParams.get('limit');

    let query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    let sortOptions: any = {};
    if (sort) {
      switch (sort) {
        case 'price-asc':
          sortOptions.price = 1;
          break;
        case 'price-desc':
          sortOptions.price = -1;
          break;
        case 'name-asc':
          sortOptions.name = 1;
          break;
        case 'name-desc':
          sortOptions.name = -1;
          break;
        case 'newest':
          sortOptions.createdAt = -1;
          break;
      }
    }

    let productsQuery = Product.find(query).sort(sortOptions);
    
    if (limit) {
      productsQuery = productsQuery.limit(parseInt(limit));
    }

    const products = await productsQuery;
    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}