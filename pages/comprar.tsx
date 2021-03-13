/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Link from "next/link";
import { Flex, createStandaloneToast } from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { Standard } from "@/layouts/Standard";
import { CheckoutCartList } from "@/organisms/CartList";
import { LoginClient, OrderClient, RegisterCheckout } from "@/organisms/Forms";
import { Header } from "@/atoms/Text";
import { useAuth } from "@/utils/AuthHook";
import { useAppContext } from "@/utils/AppContext";
import { TAKE_ORDER_CLIENT } from "@/graphql";
import Languages from "../locales";

const loginClientQuery = gql`
  mutation LogIn($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      token
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
    $role: UserRole = CLIENTE
  ) {
    createUser(
      user: { name: $name, email: $email, last_name: $last_name, password: $password, phone: $phone, role: $role }
    ) {
      id
      authToken
    }
  }
`;

const CheckoutCart = () => {
  const router = useRouter();
  const toast = createStandaloneToast();
  const {
    locale,
    query: { register },
  } = router;
  const t = Languages(locale);
  const { state: context, setState: setContext, setAuthToken } = useAppContext();
  const { productsCart, authToken } = context;
  const [takeOrder, { loading: isTakingOrder }] = useMutation(TAKE_ORDER_CLIENT, {
    onCompleted: () => {
      setContext((lastState) => ({ ...lastState, productsCart: [] }));
      router.push("/client");
      toast({
        id: "failOrder",
        title: " Succes",
        description: "Order taked",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        id: "failOrder",
        title: "An error occurred.",
        description: "Unable to create order.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log(JSON.stringify(error.networkError, null, 2));
      console.log(error.graphQLErrors);
    },
  });
  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onError: (error) => {
      toast({
        id: "failSignUp",
        title: "An error occurred.",
        description: "Unable to create user account.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log(JSON.stringify(error.networkError, null, 2));
      console.log(error.graphQLErrors);
    },
    onCompleted: (data) => {
      toast({
        id: "successSignUp",
        title: "User sign up",
        description: "User account succesfully created",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setAuthToken(data.createUser.authToken);
      router.push("/comprar");
    },
  });
  const { user } = useAuth();
  const [logClient, { loading: loginLoading }] = useMutation(loginClientQuery, {
    onCompleted: (data) => {
      setAuthToken(data.loginUser.token);
    },
  });

  const submitRegister = (data: object) => {
    createUser({ variables: { ...data } });
  };

  const onSubmitOrder = (data) => {
    takeOrder({
      variables: {
        ...data,
        orderProducts: context.productsCart.map((i) => ({ id: Number(i.id), quantity: Number(i.quantity) })),
        total: context.total,
        monto: context.total,
      },
    });
  };
  const onLogin: (values: { email: string; password: string }) => void = ({ email, password }) => {
    logClient({
      variables: {
        password,
        email,
      },
    });
  };
  return (
    <Standard>
      <Flex
        justifyContent="space-evenly"
        marginY="5em"
        marginX="1.5em"
        flexDirection={{
          base: "column",
          md: "row",
        }}
      >
        <Flex width="min(24em, 100%)" marginBottom="2em" flexDirection="column">
          {user.id ? (
            <>
              <Header>{t.checkout.info}</Header>
              <Flex marginTop="2.5em" maxHeight="min(80vh,80em)" height="min(80vh,80em)" boxShadow="md">
                <OrderClient
                  isLoading={isTakingOrder}
                  total={12}
                  onSubmit={onSubmitOrder}
                  lang={locale}
                  productsList={productsCart}
                />
              </Flex>
            </>
          ) : register === "true" ? (
            <>
              <Header fontSize="2.5em" marginBottom="2em">
                {t.forms.signUpClient.signUp}
              </Header>
              <RegisterCheckout lang={locale} onSubmit={submitRegister} isLoading={loading} values={{}} />
              <p
                style={{
                  textAlign: "center",
                }}
              >
                {t.register.haveAccount}
                <br />
                <Link
                  passHref
                  href={{
                    pathname: "/comprar",
                  }}
                >
                  <a
                    style={{
                      color: "#fe4674",
                    }}
                  >
                    {t.register.loginHere}
                  </a>
                </Link>
              </p>
            </>
          ) : (
            <>
              <Header fontSize="2.5em" marginBottom="2em">
                {t.checkout.logIn}
              </Header>
              <LoginClient onLogin={onLogin} lang={locale} isLoading={loginLoading} />
              <p
                style={{
                  textAlign: "center",
                }}
              >
                {t.login.noAccount}
                <br />
                <Link
                  passHref
                  href={{
                    pathname: "/comprar",
                    query: {
                      register: true,
                    },
                  }}
                >
                  <a
                    style={{
                      color: "#fe4674",
                    }}
                  >
                    {t.login.signUpHere}
                  </a>
                </Link>
              </p>
            </>
          )}
        </Flex>

        <CheckoutCartList lang={locale} />
      </Flex>
    </Standard>
  );
};

export default CheckoutCart;
