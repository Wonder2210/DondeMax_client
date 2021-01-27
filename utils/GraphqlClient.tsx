import * as React from "react";
import Cookies from "js-cookie";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink as CreateUploadLink } from "apollo-upload-client";
import fetch from "cross-fetch";

export const Client = (token) => {
  const setAuthorizationLink = setContext((request, previousContext) => ({
    headers: { authorization: `Bearer ${token}` },
  }));

  const link = new CreateUploadLink({ uri: "https://dondemax.herokuapp.com/graphql", fetch });
  return new ApolloClient({
    link: setAuthorizationLink.concat(link),
    cache: new InMemoryCache(),
  });
};

const GraphqlProvider: React.FC = ({ children }) => {
  return <ApolloProvider client={Client(Cookies.get("auth"))}>{children}</ApolloProvider>;
};

export default GraphqlProvider;
