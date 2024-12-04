'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { AuthForm } from '@/components/auth/AuthForm';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');

  const handleLoginSuccess = () => {
    router.push(returnUrl || '/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <AuthForm 
        type="login" 
        role="admin" 
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
}