import { enqueueReviewJob } from '@book-review/queue';
import { addReview } from '@book-review/db';
import { ReviewInput } from './__generated/types/graphql';

export async function addReviewAndQueue(
  bookId: string,
  reviewInput: ReviewInput
) {
  const review = await addReview(bookId, reviewInput);

  await enqueueReviewJob(review.id);

  return review;
}
