import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createSchema, createYoga } from 'graphql-yoga';
import fs from 'fs';
import path from 'path';

vi.mock('@book-review/db', () => ({
  getBooks: vi.fn(() =>
    Promise.resolve([
      { id: '1', title: '1984', author: 'George Orwell' },
      { id: '2', title: 'Brave New World', author: 'Aldous Huxley' },
    ])
  ),
  getReviewsByBookId: vi.fn(() => Promise.resolve([])),
}));

const schemaPath = path.join(__dirname, '../schema.graphql');
const typeDefs = fs.readFileSync(schemaPath, 'utf-8');

import { resolvers } from '../resolvers';

describe('getBooks query (in-memory)', () => {
  let yoga: ReturnType<typeof createYoga>;

  beforeEach(() => {
    yoga = createYoga({
      schema: createSchema({
        typeDefs,
        resolvers,
      }),
    });
  });

  it('should return the list of books from mocked DB', async () => {
    const response = await yoga.fetch('graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            getBooks {
              id
              title
              author
            }
          }
        `,
      }),
    });

    const result = await response.json();

    expect(result.data?.getBooks).toEqual([
      { id: '1', title: '1984', author: 'George Orwell' },
      { id: '2', title: 'Brave New World', author: 'Aldous Huxley' },
    ]);
  });
});
