import { Prisma } from '@prisma/client';
import prisma from './client';

export async function getReviewsByBookId(bookId: string) {
  return prisma.review.findMany({
    where: { bookId },
  });
}

export async function addReview(
  bookId: string,
  review: Prisma.ReviewCreateWithoutBookInput
) {
  return prisma.review.create({
    data: {
      ...review,
      book: { connect: { id: bookId } },
    },
  });
}

export async function updateReviewText(id: string, appendText: string) {
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) return;

  await prisma.review.update({
    where: { id },
    data: { content: review.content + appendText },
  });
}
