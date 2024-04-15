import { ApolloClient, InMemoryCache } from '@apollo/client';
const BASE_URL = 'http://192.168.1.104:4000/graphql';

const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
});

export default client;

// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// const client = new ApolloClient({
//   uri: 'http://172.23.208.1:4000/graphql',
//   cache: new InMemoryCache()
// });r