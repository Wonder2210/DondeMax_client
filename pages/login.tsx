import * as React from "react";
import { useMutation, gql } from "@apollo/client";
import { Flex, Box, Image, useDisclosure, Alert, AlertIcon, useToast } from "@chakra-ui/react";
import { Login } from "@/organisms/Forms";
import { useRouter } from "next/router";
import { Header } from "@/atoms/Text";
import { useAppContext } from "@/utils/AppContext";
import Head from "next/head";
import Link from "next/link";
import Languages from "../locales";

const loginUserQuery = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      role
    }
  }
`;

const login = () => {
  const { setAuthToken } = useAppContext();
  const defaultState = {
    loading: false,
    error: false,
  };
  const { push, locale } = useRouter();
  const [state, setState] = React.useState(defaultState);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const t = Languages(locale);
  const [loginUser, { data, error, loading }] = useMutation(loginUserQuery, {
    onCompleted: (result) => {
      setAuthToken(result.loginUser.token);
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

  return (
    <>
      {state.error && (
        <Alert status="error" variant="solid" alignItems="center" justifyContent="center" textAlign="center">
          <AlertIcon />
          {t.login.badData}
        </Alert>
      )}
      <Flex width="100%" height="100vh">
        <Head>
          <title>Inicia sesion</title>
        </Head>
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
            <Header fontWeight="600" fontSize="1.5em">
              DondeMax
            </Header>
          </Flex>
          <Login onSubmit={onSubmit} isLoading={loading} lang={locale} />
        </Flex>
      </Flex>
    </>
  );
};

export default login;
