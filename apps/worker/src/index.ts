import { createReviewWorker } from '@book-review/queue';
import { updateReviewText } from '@book-review/db';

const APPEND_TEXT = ' [processed by worker]';

createReviewWorker(async (job) => {
  console.log(`Processing review ${job.data.reviewId}...`);
  await updateReviewText(job.data.reviewId, APPEND_TEXT);
  console.log(`Updated review ${job.data.reviewId}`);
});

console.log('Worker listening for jobs...');
