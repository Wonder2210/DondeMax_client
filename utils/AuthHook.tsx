import * as React from "react";
import { useQuery, gql } from "@apollo/client";

const query = gql`
  query SessionUser {
    sessionUser {
      id
      name
    }
  }
`;

export const useAuth = () => {
  const [user, setUser] = React.useState({
    id: null,
    name: null,
  });
  const { data, loading, error } = useQuery(query);

  React.useEffect(() => {
    if (!loading && !error) {
      setUser({
        id: data.sessionUser.id,
        name: data.sessionUser.name,
      });
    }
  }, [data]);

  return {
    user,
  };
};
