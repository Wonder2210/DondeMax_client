import React from "react";
import {
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
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import shop from "@iconify/icons-dashicons/cart";
import { useRouter } from "next/router";
import ProductCard from "./ProductCard";
import { ShoppingCart, Button } from "../../atoms/Buttons";
import { useAppContext } from "../../../utils/AppContext";
import Languages from "../../../locales";

const CartList: React.FC<{ lang: string }> = ({ lang }) => {
  const router = useRouter();
  const { state: context, setState: setContext, openCart, closeCart } = useAppContext();
  const { productsCart, total, cart } = context;
  const { cart: t } = Languages(lang);

  const buyButton = () => {
    closeCart();
    router.push("/comprar");
  };

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

  // eslint-disable-next-line react/destructuring-assignment
  const productsList = context.productsCart.map((i) => {
    return (
      <ProductCard
        onChange={onChange(i.id)}
        image={i.image}
        name={i.name}
        price={i.price}
        uniteds={i.quantity}
        lang={lang}
        total={i.total}
        key={i.id}
        remove={deleteFromCart(i.id)}
      />
    );
  });
  return (
    <>
      <ShoppingCart itemsCount={productsCart.length} color="black" onClick={openCart} />

      <Drawer placement="right" onClose={closeCart} isOpen={cart} size="sm">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">{t.items}</DrawerHeader>
            <DrawerBody>{productsList}</DrawerBody>
            <DrawerFooter>
              <Flex width="100%" justifyContent="space-between" alignItems="flex-end">
                <Stat>
                  <StatLabel>{t.total}</StatLabel>
                  <StatNumber>{total}$</StatNumber>
                </Stat>
                <Button
                  backgroundColor="colors.rose.600"
                  size="md"
                  borderRadius="12px"
                  width="11em"
                  paddingX="1em"
                  height="2.5em"
                  onClick={buyButton}
                  rightIcon={<Icon icon={shop} width="1.7em" height="auto" />}
                >
                  {t.buy}
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
