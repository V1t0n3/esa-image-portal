import { ApolloServer, gql } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import fs from 'fs'
const schema = JSON.parse(
  fs.readFileSync('./src/schema/image-schema.json', 'utf-8')
)

// Schema GraphQL (mocked)
const typeDefs = gql`
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
`

// Resolvers mock
const resolvers = {
  Query: {
    images: () => {
      console.log('Images are now managed in the frontend schema.')
      return schema.images
    },
  },
  Mutation: {
    likeImage: (_, { id }) => {
      const image = schema.images.find((img) => img.id === id)
      if (image) {
        image.likes = (image.likes || 0) + 1
        console.log(
          `Updated likes for image with id: ${id}, new likes: ${image.likes}`
        )
        return image
      }
      console.log(`Image with id: ${id} not found.`)
      return null
    },
    deleteImage: (_, { id }) => {
      console.log(`deleteImage called with id: ${id}`)
      return id
    },
    featureImage: (_, { id }) => {
      console.log(`featureImage called with id: ${id}`)
      return null
    },
  },
}

const corsOptions = {
  origin: '*', // Permette richieste da qualsiasi origine
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}

// Server Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  cors: corsOptions,
})

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server pronto su ${url}`)
})
