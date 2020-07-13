import fetch from "node-fetch";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000/graphql";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: SERVER_URL,
    fetch,
  }),
});

export default apolloClient;
