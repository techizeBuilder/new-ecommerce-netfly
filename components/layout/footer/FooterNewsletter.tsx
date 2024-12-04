'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function FooterNewsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the newsletter subscription
    toast.success('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Newsletter</h3>
      <p className="text-sm">
        Subscribe to receive updates, access to exclusive deals, and more.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-800 border-gray-700"
          required
        />
        <Button type="submit">Subscribe</Button>
      </form>
    </div>
  );
}