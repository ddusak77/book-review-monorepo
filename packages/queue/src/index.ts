import { Queue, Worker, Job } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  maxRetriesPerRequest: null,
});

export const REVIEW_QUEUE_NAME = 'reviewQueue';

export const reviewQueue = new Queue(REVIEW_QUEUE_NAME, { connection });

export type ReviewJobData = {
  reviewId: string;
};

export async function enqueueReviewJob(reviewId: string) {
  await reviewQueue.add('appendString', { reviewId });
}

export function createReviewWorker(
  processor: (job: Job<ReviewJobData>) => Promise<void>
) {
  return new Worker<ReviewJobData>(REVIEW_QUEUE_NAME, processor, {
    connection,
  });
}
