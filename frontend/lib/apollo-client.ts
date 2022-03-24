import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

export default function getClient() {
  return new ApolloClient({
    link: createHttpLink({
      uri: `${process.env.WORDPRESS_URL}/graphql`
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "no-cache"
      }
    }
  });
}
