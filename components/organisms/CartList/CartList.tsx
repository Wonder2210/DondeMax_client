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
import shop from "@iconify/icons-dashicons/cart";
import { useRouter } from "next/router";
import ProductCard from "./ProductCard";
import { ShoppingCart, Button } from "../../atoms/Buttons";
import { useAppContext } from "../../../utils/AppContext";
import { useAuth } from "../../../utils/AuthHook";
import { TAKE_ORDER_CLIENT } from "../../../graphql/mutations";

const CartList: React.FC<{ color?: string }> = ({ color }) => {
  const router = useRouter();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const { user } = useAuth();
  const [takeOrder, { error }] = useMutation(TAKE_ORDER_CLIENT);
  const { onClose: onCloseModal, onOpen: onOpenModal, isOpen: isOpenModal } = useDisclosure();
  const { state: context, setState: setContext } = useAppContext();
  const buyButton = () => {
    router.push("/comprar");
  };
  const { productsCart, total } = context;

  const deleteFromCart = (id) => () =>
    setContext((last) => ({ ...last, productsCart: last.productsCart.filter((i) => id !== i.id) }));
  const onChange = (id) => (str, val) => {
    setContext({
      ...context,
      productsCart: productsCart.map((i) => {
        if (id === i.id) {
          return { ...i, quantity: val, total: val * i.price };
        }
        return i;
      }),
    });
  };
  const onSubmit = (data) => {
    if (productsCart.length === 0) {
      alert("debes de agregar productos primero");
      return;
    }
    takeOrder({
      variables: {
        ...data,
        client: Number(user.id),
        orderProducts: productsCart.map((i) => ({ id: Number(i.id), quantity: Number(i.quantity) })),
        total: context.total,
        monto: context.total,
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
  // eslint-disable-next-line react/destructuring-assignment
  const productsList = context.productsCart.map((i) => {
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
      <ShoppingCart itemsCount={productsCart.length} color={color ?? "black"} onClick={onOpen} />

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
                  <StatNumber>{total}$</StatNumber>
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
