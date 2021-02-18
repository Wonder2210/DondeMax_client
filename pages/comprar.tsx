import * as React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { Standard } from "@/layouts/Standard";
import { CheckoutCartList } from "@/organisms/CartList";
import { LoginClient, OrderClient } from "@/organisms/Forms";
import { SubHeader, Header } from "@/atoms/Text";
import { useAuth } from "@/utils/AuthHook";
import { useAppContext } from "@/utils/AppContext";
import { TAKE_ORDER_CLIENT } from "@/graphql";

const loginClientQuery = gql`
  mutation LogIn($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      token
    }
  }
`;

const CheckoutCart = () => {
  const router = useRouter();
  const { state: context, setState: setContext, setAuthToken } = useAppContext();
  const [isSubmitting, dispatchSubmit] = React.useState(false);
  const [takeOrder, { loading: isTakingOrder }] = useMutation(TAKE_ORDER_CLIENT, {
    onCompleted: () => {
      setContext((lastState) => ({ ...lastState, productsCart: [] }));
      router.push("/products");
    },
  });
  const { user } = useAuth();
  const [logClient, { loading }] = useMutation(loginClientQuery, {
    onCompleted: (data) => {
      setAuthToken(data.loginUser.token);
    },
  });

  const onSubmit = (data) => {
    takeOrder({
      variables: {
        ...data,
        orderProducts: context.productsCart.map((i) => ({ id: Number(i.id), quantity: Number(i.quantity) })),
        total: context.total,
        monto: context.total,
      },
    });
  };
  const onClickSubmit = () => dispatchSubmit(true);
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
              <Header>Datos de la compra</Header>
              <Flex marginTop="2.5em" maxHeight="min(80vh,80em)" height="min(80vh,80em)">
                <OrderClient
                  isSubmiting={isSubmitting}
                  total={12}
                  onSubmit={onSubmit}
                  productsList={context.productsCart}
                />
              </Flex>
            </>
          ) : (
            <>
              <SubHeader fontSize="2.5em">Iniciar Sesion</SubHeader>
              <LoginClient onLogin={onLogin} isLoading={loading} />
            </>
          )}
        </Flex>

        <CheckoutCartList onClickCheckout={onClickSubmit} isLoading={isTakingOrder} />
      </Flex>
    </Standard>
  );
};

export default CheckoutCart;
