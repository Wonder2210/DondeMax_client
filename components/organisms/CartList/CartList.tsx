import React from "react";
import {
  useDisclosure,
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerFooter,
  DrawerCloseButton,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/core";
import { Icon } from "@iconify/react";
import { useMutation } from "@apollo/client";
import shop from "@iconify/icons-cil/cart";
import ProductCard from "./ProductCard";
import { ShoppingCart, Button } from "../../atoms/Buttons";
import { useAppContext } from "../../../utils/AppContext";
import { useAuth } from "../../../utils/AuthHook";
import { OrderClient } from "../Forms";
import { TAKE_ORDER_CLIENT } from "../../../graphql/mutations";

type state = {
  products: Array<{
    id: number;
    name: string;
    image: string;
    price: number;
    total: number;
    quantity: number;
  }>;
  total: number;
};

const CartList: React.FC<{ color?: string }> = ({ color }) => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const { user } = useAuth();
  const [takeOrder, { error }] = useMutation(TAKE_ORDER_CLIENT);
  const { onClose: onCloseModal, onOpen: onOpenModal, isOpen: isOpenModal } = useDisclosure();
  const { state: context, setState: setContext } = useAppContext();
  const [state, setState] = React.useState<state>({ products: [], total: 0 });
  const buyButton = () => {
    if (user.role !== "CLIENT") {
      alert("debes iniciar sesion primero");
      return;
    }
    onOpenModal();
  };
  function arrayEquals(a, b) {
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
  }
  const { productsCart } = context;
  React.useEffect(() => {
    setState({ ...state, products: [...context.productsCart] });
  }, [productsCart, state.products]);
  React.useEffect(() => {
    if (state.products.length) {
      setState({ ...state, total: state.products.reduce((prev, current) => prev + current.total, 0) });
    }
    if (context.productsCart.length === 0) {
      setState({ ...state, total: 0 });
    }
    if (!arrayEquals(context.productsCart, state.products)) {
      setContext({ ...context, productsCart: state.products });
    }
  }, [state.products]);
  const deleteFromCart = (id) => () =>
    setContext((last) => ({ ...last, productsCart: last.productsCart.filter((i) => id !== i.id) }));
  const onChange = (id) => (str, val) => {
    setState({
      ...state,
      products: state.products.map((i) => {
        if (id === i.id) {
          return { ...i, quantity: val, total: val * i.price };
        }
        return i;
      }),
    });
  };
  const onSubmit = (data) => {
    if (state.products.length === 0) {
      alert("debes de agregar productos primero");
      return;
    }
    takeOrder({
      variables: {
        ...data,
        client: Number(user.id),
        orderProducts: state.products.map((i) => ({ id: Number(i.id), quantity: Number(i.quantity) })),
        total: state.total,
        monto: state.total,
      },
    });
    alert("pedido tomado con exito");
    setContext((lastState) => ({ ...lastState, productsCart: [] }));
    onClose();
  };
  if (error) {
    console.log(JSON.stringify(error.networkError, null, 2));
    console.log(error.graphQLErrors);
  }
  const productsList = state.products.map((i) => {
    return (
      <ProductCard
        onChange={onChange(i.id)}
        image={i.image}
        name={i.name}
        price={i.price}
        uniteds={i.quantity}
        total={i.total}
        key={i.id}
        remove={deleteFromCart(i.id)}
      />
    );
  });
  return (
    <>
      <ShoppingCart itemsCount={state.products.length} color={color ?? "black"} onClick={onOpen} />
      <OrderClient
        values={{}}
        onClose={onCloseModal}
        isOpen={isOpenModal}
        onSubmit={onSubmit}
        productsList={state.products}
        total={state.total}
      />
      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="sm">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Compras</DrawerHeader>
            <DrawerBody>{productsList}</DrawerBody>
            <DrawerFooter>
              <Flex width="100%" justifyContent="space-between" alignItems="flex-end">
                <Stat>
                  <StatLabel>Total:</StatLabel>
                  <StatNumber>{state.total}$</StatNumber>
                </Stat>
                <Button
                  backgroundColor="colors.rose.600"
                  size="sm"
                  width="10em"
                  height="2.5em"
                  onClick={buyButton}
                  rightIcon={<Icon icon={shop} width="1.7em" height="auto" />}
                >
                  comprar
                </Button>
              </Flex>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default CartList;
