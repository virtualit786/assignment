import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Routes from "./routes";
const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
const client = new ApolloClient({
  uri: `${SERVER_URL}/graphql`,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById("root")
);
