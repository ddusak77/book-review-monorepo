import prisma from '../src/client';
import dotenvFlow from 'dotenv-flow';
import path from 'path';

dotenvFlow.config({
  path: path.resolve(__dirname, '../../..'),
});

async function main() {
  const env = (process.env.NODE_ENV || '').toLowerCase();

  if (env !== 'development') {
    console.error(`❌ Seeding blocked. NODE_ENV="${process.env.NODE_ENV}"`);
    process.exit(1);
  }

  await prisma.review.deleteMany();
  await prisma.book.deleteMany();

  const book1 = await prisma.book.create({
    data: {
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: 'Clean Code',
      author: 'Robert C. Martin',
    },
  });

  await prisma.review.createMany({
    data: [
      {
        bookId: book1.id,
        content: 'Fantastic read for any developer!',
      },
      {
        bookId: book2.id,
        content: 'A must-have for software engineers.',
      },
    ],
  });

  console.log('✅ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
