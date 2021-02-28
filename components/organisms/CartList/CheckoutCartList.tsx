import React from "react";
import { Flex, Spacer, Stat, StatNumber } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import shop from "@iconify/icons-cil/cart";
import ProductCard from "./ProductCard";
import { SubHeader, Header } from "../../atoms/Text";
import { Button } from "../../atoms/Buttons";
import { useAppContext } from "../../../utils/AppContext";
import Languages from "../../../locales";

type props = {
  onClickCheckout: () => void;
  isLoading: boolean;
  lang: string;
};

const CartList: React.FC<props> = ({ onClickCheckout, isLoading, lang }) => {
  const { state: context, setState: setContext } = useAppContext();
  const { productsCart, total } = context;
  const t = Languages(lang);
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
        total={i.total}
        key={i.id}
        lang={lang}
        remove={deleteFromCart(i.id)}
      />
    );
  });
  return (
    <>
      <Flex maxHeight="min(80vh,80em)" height="min(80vh,80em)" flexDirection="column">
        <Header>{t.cart.items}:</Header>
        <Flex flexGrow={1} overflowY="auto" flexDirection="column">
          {productsList}
        </Flex>
        <Flex width="100%" justify="space-between" align="center" marginBottom="1em">
          <SubHeader>{t.cart.total}:</SubHeader>
          <Spacer />
          <Stat textAlign="right">
            <StatNumber>{total}$</StatNumber>
          </Stat>
        </Flex>
        <Button
          backgroundColor="colors.rose.600"
          size="xl"
          width="100%"
          height="2.5em"
          borderRadius="12px"
          onClick={onClickCheckout}
          rightIcon={<Icon icon={shop} width="1.7em" height="1.7em" />}
          isLoading={isLoading}
          disabled={!(productsCart.length >= 0)}
        >
          {t.cart.buy}
        </Button>
      </Flex>
    </>
  );
};

export default CartList;
