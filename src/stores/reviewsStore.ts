import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { venezuelaStates, type Review } from '@/data/map';

interface ReviewsState {
  reviews: Record<string, Review[]>;
  addReview: (locationId: string, review: Review) => void;
  getReviews: (locationId: string) => Review[];
}

function buildInitialReviews(): Record<string, Review[]> {
  const initial: Record<string, Review[]> = {};
  venezuelaStates.forEach((state) => {
    state.locations.forEach((loc) => {
      const key = `${state.id}-${loc.name}`;
      initial[key] = loc.reviews;
    });
  });
  return initial;
}

export const useReviewsStore = create<ReviewsState>()(
  persist(
    (set, get) => ({
      reviews: buildInitialReviews(),

      addReview: (locationId: string, review: Review) => {
        const current = get().reviews[locationId] || [];
        set({
          reviews: {
            ...get().reviews,
            [locationId]: [...current, review],
          },
        });
      },

      getReviews: (locationId: string) => {
        return get().reviews[locationId] || [];
      },
    }),
    {
      name: 'latazanomada-reviews',
      partialize: (state) => ({ reviews: state.reviews }),
    }
  )
);
