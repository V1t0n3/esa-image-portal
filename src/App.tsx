import { ApolloProvider } from '@apollo/client'
import client from './apollo/client'
import { Home } from './pages/Home'

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Home />
      </div>
    </ApolloProvider>
  )
}

export default App
