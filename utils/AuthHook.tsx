import * as React from "react";
import { useQuery, gql } from "@apollo/client";
import { useAppContext } from "./AppContext";

const query = gql`
  query SessionUser {
    sessionUser {
      id
      phone
      name
      role
      email
    }
  }
`;

export const useAuth = () => {
  const { state } = useAppContext();
  const [user, setUser] = React.useState({
    id: 0,
    name: "",
    role: "",
    email: "",
  });

  const { data, loading, error } = useQuery(query);

  React.useEffect(() => {
    if (!loading && !error) {
      setUser({
        id: data.sessionUser.id,
        name: data.sessionUser.name,
        role: data.sessionUser.role,
        email: data.sessionUser.email,
      });
    }
  }, [data]);

  return {
    user,
  };
};
