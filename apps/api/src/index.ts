import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { createSchema, createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import path from 'path';
import { resolvers } from './resolvers';

const typeDefs = loadSchemaSync(path.join(__dirname, './schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const schema = createSchema({
  typeDefs,
  resolvers: resolvers,
});

const yoga = createYoga({ schema });

const server = createServer(yoga);

const PORT = 4000;
server.listen(PORT, () => {
  console.log(
    `🚀 GraphQL Yoga server running at http://localhost:${PORT}/graphql`
  );
});
