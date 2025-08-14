import { getBooks, getReviewsByBookId } from '@book-review/db';
import { Resolvers } from './__generated/types/graphql';
import { addReviewAndQueue } from './reviewService';

export const resolvers: Resolvers = {
  Query: {
    getBooks: async () => {
      try {
        return await getBooks();
      } catch (err) {
        console.error('Error fetching books:', err);
        throw new Error('Failed to fetch books');
      }
    },
  },
  Mutation: {
    addReview: async (_, { bookId, review }) => {
      if (!bookId || typeof bookId !== 'string') {
        throw new Error('Invalid book ID');
      }
      if (
        !review ||
        typeof review.content !== 'string' ||
        review.content.length < 3
      ) {
        throw new Error('Review text must be at least 3 characters');
      }

      try {
        return await addReviewAndQueue(bookId, review);
      } catch (err) {
        console.error('Error adding review:', err);
        throw new Error('Failed to add review');
      }
    },
  },
  Book: {
    reviews: async (parent) => {
      try {
        return await getReviewsByBookId(parent.id);
      } catch (err) {
        console.error(`Error fetching reviews for book ${parent.id}:`, err);
        return [];
      }
    },
  },
};
