import React from "react";
import { useMutation, gql } from "@apollo/client";
import { Flex, Box, Image, useDisclosure, Alert, AlertIcon, useToast } from "@chakra-ui/react";
import { CreateClient } from "@/organisms/Forms";
import { useRouter } from "next/router";
import { Header } from "@/atoms/Text";
import Head from "next/head";
import Link from "next/link";
import Languages from "../locales";

const CREATE_USER = gql`
  mutation(
    $name: String!
    $email: String!
    $last_name: String!
    $password: String!
    $phone: String!
    $role: UserRole = CLIENTE
  ) {
    createUser(
      user: { name: $name, email: $email, last_name: $last_name, password: $password, phone: $phone, role: $role }
    ) {
      id
    }
  }
`;

const SignUp = () => {
  const router = useRouter();
  const { locale } = router;
  const {
    forms: { signUpClient },
  } = Languages(locale);
  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onError: (error) => {
      alert("datos invalidos verifica y intenta de nuevo");
      console.log(JSON.stringify(error.networkError, null, 2));
      console.log(error.graphQLErrors);
    },
    onCompleted: () => {
      alert("usuario Exitosamente registrado");
    },
  });
  const submitData = (data: object) => {
    createUser({ variables: { ...data } });
  };
  return (
    <Flex width="100%" height="100vh">
      <Head>
        <title>{signUpClient.signUp}</title>
      </Head>
      <Box
        bgImage="url('/images/register.jpg')"
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
        <CreateClient onSubmit={submitData} lang={locale} isLoading={loading} values={{}} />
      </Flex>
    </Flex>
  );
};

export default SignUp;
