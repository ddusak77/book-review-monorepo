import { addReview, getBooks, getReviewsByBookId } from '@book-review/db';
import { Resolvers } from './__generated/types/graphql';

export const resolvers: Resolvers = {
  Query: {
    getBooks,
  },
  Mutation: {
    addReview: async (_, { bookId, review }) => addReview(bookId, review),
  },
  Book: {
    reviews: async (parent) => getReviewsByBookId(parent.id),
  },
};
