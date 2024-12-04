import { connectToDatabase } from './mongodb/connect';
import User from './mongodb/models/User';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

export async function signToken(payload: any) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
  return token;
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function login(email: string, password: string) {
  await connectToDatabase();
  const user = await User.findOne({ email });
  
  if (!user || !(await user.matchPassword(password))) {
    throw new Error('Invalid credentials');
  }

  const token = await signToken({
    id: user._id,
    email: user.email,
    role: user.role
  });

  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
}

export async function getCurrentUser() {
  const token = cookies().get('auth-token')?.value;
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  await connectToDatabase();
  const user = await User.findById(payload.id).select('-password');
  return user;
}