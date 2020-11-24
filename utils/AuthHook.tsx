import * as React from "react";
import { useQuery, gql } from "@apollo/client";

const query = gql`
  query SessionUser {
    sessionUser
  }
`;

export const useAuth = () => {
  const [user, setUser] = React.useState("");
  const { data, loading, error } = useQuery(query);

  React.useEffect(() => {
    if (!loading && !error) {
      setUser(data.sessionUser);
    }
  }, [data]);

  return {
    user: user ? JSON.parse(user) : user,
  };
};
