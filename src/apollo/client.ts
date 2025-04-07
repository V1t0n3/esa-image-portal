import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // URL del mock server
  cache: new InMemoryCache(),
})

export default client
