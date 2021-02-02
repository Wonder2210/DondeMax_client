import * as React from "react";
import { useMutation, gql } from "@apollo/client";
import { Flex, Box, Image, useDisclosure, Alert, AlertIcon, useToast } from "@chakra-ui/core";
import { Login, CreateClient as Client } from "@/organisms/Forms";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Header } from "@/atoms/Text";
import Head from "next/head";
import Link from "next/link";

const loginUserQuery = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      role
    }
  }
`;
const CREATE_USER = gql`
  mutation(
    $name: String!
    $email: String!
    $last_name: String!
    $password: String!
    $phone: String!
    $role: UserRole!
  ) {
    createUser(
      user: { name: $name, email: $email, last_name: $last_name, password: $password, phone: $phone, role: $role }
    ) {
      id
    }
  }
`;

const login = () => {
  const defaultState = {
    loading: false,
    error: false,
  };
  const { push } = useRouter();
  const toast = useToast();
  const [state, setState] = React.useState(defaultState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createUser] = useMutation(CREATE_USER, {
    onError: () => alert("datos invalidos verifica y intenta de nuevo"),
    onCompleted: () => {
      setState({ ...defaultState });
      onClose();
      alert("usuario Exitosamente registrado");
    },
  });
  const [loginUser, { data, error, loading }] = useMutation(loginUserQuery, {
    onCompleted: (result) => {
      Cookies.set("auth", result.loginUser.token, { expires: 12 });
      if (result.loginUser.role === "CLIENTE") push("/client", "/client", { shallow: true });
      else if (result.loginUser.role !== "CLIENTE") push("/admin", "/admin", { shallow: true });
    },
    onError: () => {
      setState({ loading: false, error: true });
    },
  });
  if (error) {
    console.log(JSON.stringify(error.networkError, null, 2));
    console.log(error.graphQLErrors);
  }

  const onSubmit = (values) => {
    setState({ ...state, loading: true });
    loginUser({ variables: { ...values } });
  };
  const onSubmitClientSign = (values) => {
    setState({ ...state, loading: true });

    createUser({ variables: { ...values } });
  };

  return (
    <>
      {state.error && (
        <Alert status="error" variant="solid" alignItems="center" justifyContent="center" textAlign="center">
          <AlertIcon />
          El correo o la contraseña que usastes es incorrecta
        </Alert>
      )}
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

        <Flex
          width={{ base: "100%", sm: "100%", md: "70%", lg: "70%", xl: "70%" }}
          position="relative"
          align="center"
          justify="center"
        >
          <Flex
            w="100%"
            display={{
              base: "none",
              sm: "none",
              md: "flex",
              lg: "flex",
              xl: "flex",
            }}
            justifyContent="flex-start"
            alignItems="center"
            position="absolute"
            top="1em"
          >
            <div
              style={{
                padding: "1em",
                display: "inline",
              }}
            >
              <Link href="/">
                <Image _hover={{ cursor: "pointer" }} src="/images/logo.jpg" width="5em" height="auto" />
              </Link>
            </div>
            <Header fontSize="1.2em">DondeMax</Header>
          </Flex>
          <Login onSubmit={onSubmit} isLoading={loading} onOpen={onOpen} />
        </Flex>
      </Flex>
    </>
  );
};

export default login;
