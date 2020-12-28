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
  const defaultState = {
    loading: false,
    error: false,
  };
  const { push } = useRouter();
  const toast = useToast();
  const [state, setState] = React.useState(defaultState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createClient] = useMutation(CREATE_CLIENT, {
    onError: () => alert("datos invalidos verifica y intenta de nuevo"),
    onCompleted: () => {
      setState({ ...defaultState });
      onClose();
      alert("usuario Exitosamente registrado");
    },
  });
  const [loginUser, { data, error }] = useMutation(loginUserQuery, {
    onCompleted: () => setState({ ...defaultState }),
    onError: () => {
      setState({ loading: false, error: true });
    },
  });
  const [logClient, { data: dataClient, error: errorClient }] = useMutation(loginClientQuery, {
    onCompleted: () => setState({ ...defaultState }),
    onError: () => setState({ loading: false, error: true }),
  });
  const onSubmit = (values) => {
    setState({ ...state, loading: true });
    loginUser({ variables: { ...values } });
  };
  const onSubmitClientSign = (values) => {
    setState({ ...state, loading: true });

    createClient({ variables: { ...values } });
  };
  const onSubmitClient = (values) => {
    setState({ ...state, loading: true });

    logClient({ variables: { ...values } });
  };

  if (data) {
    Cookies.set("auth", data.loginUser, { expires: 12 });
    push("/admin", "/admin", { shallow: true });
  }
  if (dataClient) {
    Cookies.set("auth", dataClient.loginClient, { expires: 1 });
    push("/client", "/client", { shallow: true });
  }

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
          <Login onSubmit={onSubmit} isLoading={state.loading} onOpen={onOpen} onSubmitClient={onSubmitClient} />
        </Flex>
      </Flex>
    </>
  );
};

export default login;
