import * as React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import Cookies from "js-cookie";

const addPhoneQuery = gql`
  mutation AddPhone($phone: String!) {
    addCustomerPhone(phone: $phone)
  }
`;

const query = gql`
  query SessionUser {
    sessionUser {
      __typename
      ... on Customer {
        googleId
        id
        name
        lastName
        phone
        email
        image
      }
      ... on SessionUser {
        id
        phone
        name
        email
      }
    }
  }
`;

export const useAuth = () => {
  const defaultState = {
    customer: {
      googleId: "",
      id: null,
      name: "",
      lastName: "",
      phone: "",
      email: "",
      image: "",
    },
    employee: {
      id: null,
      name: "",
      phone: "",
      role: "",
      email: "",
    },
  };
  const [user, setUser] = React.useState(() => {
    const persistState = Cookies.getJSON("auth_info") ?? defaultState;
    return {
      ...persistState,
    };
  });
  const { data, loading, error, refetch } = useQuery(query);
  const [mutate, { data: result, loading: loadingRes }] = useMutation(addPhoneQuery, {
    onCompleted: (res) => {
      refetch();
    },
  });

  const addPhone = (phone: string) => {
    mutate({
      variables: {
        phone,
      },
    });
  };

  const closeSession = () => {
    setUser({ ...defaultState });
  };

  React.useEffect(() => {
    if (!loading && !error) {
      const { __typename, ...res } = data.sessionUser;
      if (__typename === "Customer") setUser({ ...user, customer: { ...res } });
      if (__typename === "SessionUser") setUser({ ...user, employee: { ...res } });
    }
  }, [data]);

  React.useEffect(() => {
    const stateJ = JSON.stringify(user);
    Cookies.set("auth_info", stateJ, { expires: 1 });
  }, [user]);

  return {
    customer: user.customer,
    employee: user.employee,
    closeSession,
    addPhone: {
      addPhone,
      loading: loadingRes,
      close: result ? result.addCustomerPhone : false,
    },
  };
};
