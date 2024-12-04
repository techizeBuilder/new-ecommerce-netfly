'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { OrderHistory } from '@/components/user/OrderHistory';
import { UserProfile } from '@/components/user/UserProfile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Fetch user data
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/users/me');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-6">
            <UserProfile user={user} />
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card className="p-6">
            <OrderHistory />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}