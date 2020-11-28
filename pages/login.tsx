import * as React from "react";
import { useMutation, gql } from "@apollo/client";
import { Flex, Box, useDisclosure } from "@chakra-ui/core";
import { Login } from "@/organisms/Forms";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Button } from "@/atoms/Buttons";
import { Icon } from "@iconify/react";
import sign from "@iconify/icons-cil/group";
import { CreateClient as Client } from "@/organisms/Forms";
import  Head from "next/head";

const loginUserQuery = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;
const CREATE_CLIENT = gql`
  mutation CreateClient($nationality: String!, $name: String!, $cedula: String!, $phone: String!) {
    createClient(client: { name: $name, cedula: $cedula, phone: $phone, nationality: $nationality }) {
      id
      name
    }
  }
`;

const loginClientQuery = gql`
  mutation LoginUser($cedula: String!) {
    loginClient(cedula: $cedula)
  }
`;

const login = () => {
  const { push } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createClient, { error }] = useMutation(CREATE_CLIENT, { onCompleted: onClose });
  const [loginUser, { data }] = useMutation(loginUserQuery);
  const [logClient, { data: dataClient, error: errorClient }] = useMutation(loginClientQuery);
  const onSubmit = (data) => {
    loginUser({ variables: { ...data } });
  };
  const onSubmitClientSign = (data) => {
    createClient({ variables: { ...data } });
    alert("registrado con exito");
  };
  const onSubmitClient = (data) => {
    logClient({ variables: { ...data } });
  };
  if (error) {
    console.log(JSON.stringify(error.networkError, null, 2));
    console.log(error.graphQLErrors);
  }
  if (errorClient) {
    console.log(JSON.stringify(errorClient.networkError, null, 2));
    console.log(errorClient.graphQLErrors);
  }
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
           <Head>
            <title>Inicia sesion</title>
            </Head>
      <Client
        isEditing={false}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmitClientSign}
        onEdit={() => console.log("nada")}
        values={{}}
      />
      <Box
        bgImage="url('/images/login.jpg')"
        bgPosition="center"
        bgSize="cover"
        width={{ base: "0", sm: "0", md: "30%", lg: "30%", xl: "30%" }}
        height="100vh"
      />

      <Flex width={{ base: "100%", sm: "100%", md: "70%", lg: "70%", xl: "70%" }} align="center" justify="center">
        <Box position="absolute" top="1em" right="1em">
          <Button
            leftIcon={<Icon icon={sign} color="black" />}
            color="black"
            backgroundColor="#E5E6E2"
            onClick={onOpen}
          >
            Registrarse Cliente
          </Button>
        </Box>
        <Login onSubmit={onSubmit} onSubmitClient={onSubmitClient} />
        {error || errorClient ? "Cedula incorrecta" : ""}
      </Flex>
    </Flex>
  );
};

export default login;
