import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb/connect';
import User from '@/lib/mongodb/models/User';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(
  request: Request,
  { params }: { params: { role: string } }
) {
  try {
    const body = await request.json();
    await connectToDatabase();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Create user with specified role
    const user = await User.create({
      ...body,
      role: params.role
    });

    // Generate token
    const token = await signToken({
      id: user._id,
      email: user.email,
      role: user.role
    });

    // Set cookie
    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    const { password: _, ...userWithoutPassword } = user.toObject();
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}