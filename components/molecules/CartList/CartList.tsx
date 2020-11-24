import React from "react";
import {
  useDisclosure,
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerFooter,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/core";
import ProductCard from "./ProductCard";
import { ShoppingCart, Button } from "../../atoms/Buttons";
import { useAppContext } from "../../../utils/AppContext";
import { Icon } from "@iconify/react";
import shop from "@iconify/icons-cil/cart";
import { OrderClient } from "../../organisms/Forms";

const CartList = () => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const { onClose: onCloseModal, onOpen: onOpenModal, isOpen: isOpenModal } = useDisclosure();
  const { state: context, setState: setContext } = useAppContext();
  const [state, setState] = React.useState<{
    products: Array<{
      id: number;
      name: string;
      image: string;
      precio: number;
      total: number;
      quantity: number;
    }>;
    total: number;
  }>({ products: [], total: 0 });

  React.useEffect(() => {
    if (state.products.length == 0 || context.productsCart.length != state.products) {
      setState({ ...state, products: [...context.productsCart.map((i) => ({ ...i, total: i.precio, quantity: 1 }))] });
    }
  }, [context.productsCart]);
  React.useEffect(() => {
    if (state.products.length > 0) {
      setState({ ...state, total: state.products.reduce((prev, current) => prev + current.total, 0) });
    }
  }, [state.products]);
  const deleteFromCart = (id) => () =>
    setContext((last) => ({ ...last, productsCart: last.productsCart.filter((i) => id !== i.id) }));
  const onChange = (id) => (str, val) =>
    setState({
      ...state,
      products: state.products.map((i) => {
        if (id == i.id) {
          return { ...i, quantity: val, total: val * i.precio };
        }
        return i;
      }),
    });
  const productsList = state.products.map((i) => {
    return (
      <ProductCard
        onChange={onChange(i.id)}
        image={i.image}
        name={i.name}
        price={i.precio}
        uniteds={i.quantity}
        total={i.total}
        key={i.id}
        remove={deleteFromCart(i.id)}
      />
    );
  });
  return (
    <>
      <ShoppingCart itemsCount={0} onClick={onOpen} />
      <OrderClient
        values={{}}
        onClose={onCloseModal}
        isOpen={isOpenModal}
        onSubmit={(data) => console.log(data)}
        productsList={state.products}
        total={state.total}
      />
      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="sm">
        <DrawerOverlay>
          <DrawerContent>
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
                  onClick={onOpenModal}
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
