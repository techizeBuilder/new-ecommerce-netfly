'use client';

import { useState } from 'react';
import { ReviewList } from '@/components/admin/reviews/ReviewList';
import { ReviewDetails } from '@/components/admin/reviews/ReviewDetails';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function ReviewsPage() {
  const [selectedReview, setSelectedReview] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reviews</h1>
      </div>

      <ReviewList onViewDetails={setSelectedReview} />

      <Dialog open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
          </DialogHeader>
          {selectedReview && <ReviewDetails review={selectedReview} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}