import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';


const httpLink = new HttpLink({
  //http://localhost:5000
})

const wsLink = new WebSocketLink({
    uri: `ws://localhost:5000/subscriptions`,
    options: {
        reconnect: true
    }
})

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
)

const AplloClient = new ApolloClient({ link, cache: new InMemoryCache() })

// const AplloClient = new ApolloClient({
//     uri: 'http://localhost:5000/graphql'
// })

export {
    ApolloProvider,
    AplloClient
} 
