import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb/connect';
import User from '@/lib/mongodb/models/User';
import { getCurrentUser } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function PUT(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    await connectToDatabase();

    const updateData: any = {
      name: body.name,
      email: body.email,
    };

    if (body.newPassword) {
      const user = await User.findById(currentUser._id);
      const isMatch = await user.matchPassword(body.currentPassword);
      if (!isMatch) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        );
      }
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(body.newPassword, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}