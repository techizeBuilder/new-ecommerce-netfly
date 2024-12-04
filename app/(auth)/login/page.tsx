'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthForm } from '@/components/auth/AuthForm';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');

  const handleLoginSuccess = () => {
    router.push(returnUrl || '/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <AuthForm 
        type="login" 
        role="user" 
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
}