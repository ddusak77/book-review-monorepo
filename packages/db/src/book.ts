import prisma from './client';

export async function getBooks() {
  return prisma.book.findMany();
}
