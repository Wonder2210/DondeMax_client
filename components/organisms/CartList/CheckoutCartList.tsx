import React from "react";
import { Flex, Spacer, Stat, StatNumber } from "@chakra-ui/react";

import ProductCard from "./ProductCard";
import { SubHeader, Header } from "../../atoms/Text";
import { useAppContext } from "../../../utils/AppContext";
import Languages from "../../../locales";

type props = {
  onClickCheckout: () => void;
  lang: string;
};

const CartList: React.FC<props> = ({ lang }) => {
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
      </Flex>
    </>
  );
};

export default CartList;
