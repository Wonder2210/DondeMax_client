import * as React from "react";
import Cookies from "js-cookie";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import fetch from "cross-fetch";

const Client = (token) => {
  const setAuthorizationLink = setContext((request, previousContext) => ({
    headers: { authorization: token },
  }));

  const link = new createUploadLink({ uri: "http://localhost:4000/graphql", fetch });
  return new ApolloClient({
    link: setAuthorizationLink.concat(link),
    cache: new InMemoryCache(),
  });
};

const GraphqlProvider: React.FC = ({ children }) => {
  return <ApolloProvider client={Client(Cookies.get("auth"))}>{children}</ApolloProvider>;
};

export default GraphqlProvider;
