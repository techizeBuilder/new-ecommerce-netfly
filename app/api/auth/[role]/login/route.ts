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
    const { email, password } = await request.json();
    await connectToDatabase();

    // Find user and verify role
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)) || user.role !== params.role) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

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
    return NextResponse.json(userWithoutPassword);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 401 }
    );
  }
}