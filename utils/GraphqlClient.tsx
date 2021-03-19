import * as React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink as CreateUploadLink } from "apollo-upload-client";
import fetch from "cross-fetch";
import fragments from "../graphql/fragmentTypes";
import { useAppContext } from "./AppContext";

export const Client = (token) => {
  const setAuthorizationLink = setContext((request, previousContext) => ({
    headers: { authorization: token },
  }));

  const link = new CreateUploadLink({ uri: "http://localhost:4000/graphql", fetch });
  return new ApolloClient({
    link: setAuthorizationLink.concat(link),
    cache: new InMemoryCache({
      possibleTypes: fragments.possibleTypes,
    }),
  });
};

const GraphqlProvider: React.FC = ({ children }) => {
  const { state } = useAppContext();

  return <ApolloProvider client={Client(state.authToken)}>{children}</ApolloProvider>;
};

export default GraphqlProvider;
