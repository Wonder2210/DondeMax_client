/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { Flex, createStandaloneToast } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { useGoogleLogin } from "react-google-login";
import GoogleButton from "react-google-button";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Standard } from "@/layouts/Standard";
import { CheckoutCartList } from "@/organisms/CartList";
import { OrderClient } from "@/organisms/Forms";
import { Header } from "@/atoms/Text";
import { useAuth } from "@/utils/AuthHook";
import { useAppContext } from "@/utils/AppContext";
import { TAKE_ORDER_CLIENT } from "@/graphql";
import Languages from "../locales";

const AddPhone = dynamic(() => import("@/organisms/Forms/AddPhone"));

const CheckoutCart = () => {
  const router = useRouter();
  const toast = createStandaloneToast();
  const { locale } = router;
  const t = Languages(locale);
  const clientId = "1080660100211-q183khnmnj2rlnbtpvjn9e1o2fo2590v.apps.googleusercontent.com";
  const { state: context, setState: setContext, setAuthToken } = useAppContext();
  const { productsCart } = context;
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

  const { customer, addPhone } = useAuth();

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
  const responseGoogle = (response) => {
    console.log(response);
  };
  const onSuccess = (data) => {
    setAuthToken(data.tokenId);
  };
  const { signIn } = useGoogleLogin({
    clientId,
    cookiePolicy: "single_host_origin",
    isSignedIn: true,
    onFailure: responseGoogle,
    onSuccess,
  });
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
          {customer.id ? (
            <>
              <Header>{t.checkout.info}</Header>
              {!customer.phone ?? (
                <AddPhone
                  lang={locale}
                  onSubmit={addPhone.addPhone}
                  completed={addPhone.close}
                  loading={addPhone.loading}
                />
              )}
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
          ) : (
            <>
              <Header fontSize="2.5em" marginBottom="2em">
                {t.checkout.logIn}
              </Header>
              <Flex align="center" justify="flex-start" margin="3em 0">
                <GoogleButton onClick={signIn} />
              </Flex>
            </>
          )}
        </Flex>

        <CheckoutCartList lang={locale} />
      </Flex>
    </Standard>
  );
};

export default CheckoutCart;
