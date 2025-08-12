import { Queue, Worker, Job, QueueOptions, WorkerOptions } from 'bullmq';
import IORedis from 'ioredis';

export const REVIEW_QUEUE_NAME = 'reviewQueue';

let reviewQueue: Queue | null = null;

function createRedisConnection() {
  return new IORedis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    maxRetriesPerRequest: null,
  });
}

export function getReviewQueue(): Queue | null {
  if (process.env.DISABLE_QUEUE === 'true') {
    return null; // for tests or non-queue environments
  }

  if (!reviewQueue) {
    reviewQueue = new Queue(REVIEW_QUEUE_NAME, {
      connection: createRedisConnection(),
    } as QueueOptions);
  }
  return reviewQueue;
}

export type ReviewJobData = {
  reviewId: string;
};

export async function enqueueReviewJob(reviewId: string) {
  const queue = getReviewQueue();
  if (!queue) {
    console.warn('[enqueueReviewJob] Queue is disabled. Skipping job.');
    return;
  }
  await queue.add('appendString', { reviewId });
}

export function createReviewWorker(
  processor: (job: Job<ReviewJobData>) => Promise<void>
) {
  if (process.env.DISABLE_QUEUE === 'true') {
    console.warn('[createReviewWorker] Queue is disabled. Worker not started.');
    return;
  }

  return new Worker<ReviewJobData>(REVIEW_QUEUE_NAME, processor, {
    connection: createRedisConnection(),
  } as WorkerOptions);
}
