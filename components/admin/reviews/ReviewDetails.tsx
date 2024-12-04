'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface ReviewDetailsProps {
  review: any;
}

export function ReviewDetails({ review }: ReviewDetailsProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Product Information</h3>
            <p className="text-sm">{review.product.name}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Review Status</h3>
            <Badge>{review.status}</Badge>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Rating</h3>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < review.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Title</h3>
            <p>{review.title}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Comment</h3>
            <p>{review.comment}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Reviewer</h3>
            <p className="text-sm">{review.user.name}</p>
            <p className="text-sm text-gray-500">{review.user.email}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Date</h3>
            <p className="text-sm">{formatDate(review.createdAt)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}