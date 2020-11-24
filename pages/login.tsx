import * as React from "react";
import { useMutation, gql } from "@apollo/client";
import { Flex, Box } from "@chakra-ui/core";
import { Login } from "@/organisms/Forms";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const loginUserQuery = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;

const loginClientQuery = gql`
  mutation LoginUser($cedula: String!) {
    loginClient(cedula: $cedula)
  }
`;

const login = () => {
  const { push } = useRouter();
  const [loginUser, { data, error }] = useMutation(loginUserQuery);
  const [logClient, { data: dataClient, error: errorClient }] = useMutation(loginClientQuery);
  const onSubmit = (data) => {
    loginUser({ variables: { ...data } });
  };
  const onSubmitClient = (data) => {
    logClient({ variables: { ...data } });
  };
  if (data) {
    Cookies.set("auth", data.loginUser, { expires: 12 });
    push("/admin", "/admin", { shallow: true });
  }
  if (dataClient) {
    Cookies.set("auth", dataClient.loginClient, { expires: 1 });
    push("/client", "/client", { shallow: true });
  }
  if (errorClient) {
    console.log(JSON.stringify(errorClient.networkError, null, 2));
  }
  if (error) {
    console.log(JSON.stringify(error.networkError, null, 2));
  }
  return (
    <Flex width="100%" height="100vh">
      <Box
        bgImage="url('/images/login.jpg')"
        bgPosition="center"
        bgSize="cover"
        width={{ base: "0", sm: "0", md: "30%", lg: "30%", xl: "30%" }}
        height="100vh"
      />
      <Flex width={{ base: "100%", sm: "100%", md: "70%", lg: "70%", xl: "70%" }} align="center" justify="center">
        <Login onSubmit={onSubmit} onSubmitClient={onSubmitClient} />
        {error ? "Mal login bro" : ""}
      </Flex>
    </Flex>
  );
};

export default login;
