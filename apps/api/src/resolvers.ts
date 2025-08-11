import { addReview, getBooks, getReviewsByBookId } from '@book-review/db';
import { Resolvers } from './__generated/types/graphql';
import { addReviewAndQueue } from './reviewService';

export const resolvers: Resolvers = {
  Query: {
    getBooks,
  },
  Mutation: {
    addReview: async (_, { bookId, review }) =>
      addReviewAndQueue(bookId, review),
  },
  Book: {
    reviews: async (parent) => getReviewsByBookId(parent.id),
  },
};
