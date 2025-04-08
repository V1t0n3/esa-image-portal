import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import fs from 'fs';

const schema = JSON.parse(
  fs.readFileSync('./src/schema/image-schema.json', 'utf-8')
);

const typeDefs = `#graphql
  type Image {
    id: ID!
    src: String!
    alt: String!
    likes: Int
    isFeatured: Boolean
  }

  type Query {
    images: [Image!]!
  }

  type Mutation {
    likeImage(id: ID!): Image
    deleteImage(id: ID!): ID
    featureImage(id: ID!): Image
  }
`;

const resolvers = {
  Query: {
    images: () => schema.images,
  },
  Mutation: {
    likeImage: (_, { id }) => {
      const image = schema.images.find((img) => img.id === id);
      if (image) {
        image.likes = (image.likes || 0) + 1;
        return image;
      }
      return null;
    },
    deleteImage: (_, { id }) => id,
    featureImage: (_, { id }) => {
      const image = schema.images.find((img) => img.id === id);
      if (image) {
        image.isFeatured = true;
        return image;
      }
      return null;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server);