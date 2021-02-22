import React from "react";
import { Flex, Spacer, Stat, StatNumber } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import shop from "@iconify/icons-cil/cart";
import ProductCard from "./ProductCard";
import { SubHeader, Header } from "../../atoms/Text";
import { Button } from "../../atoms/Buttons";
import { useAppContext } from "../../../utils/AppContext";

type props = {
  onClickCheckout: () => void;
  isLoading: boolean;
};

const CartList: React.FC<props> = ({ onClickCheckout, isLoading }) => {
  const { state: context, setState: setContext } = useAppContext();
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
        boxShadow="md"
      />
    );
  });
  return (
    <>
      <Flex maxHeight="min(80vh,80em)" height="min(80vh,80em)" flexDirection="column">
        <Header>Compras:</Header>
        <Flex flexGrow={1} overflowY="auto" flexDirection="column">
          {productsList}
        </Flex>
        <Flex width="100%" justify="space-between" align="center" marginBottom="1em">
          <SubHeader>Total:</SubHeader>
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
          comprar
        </Button>
      </Flex>
    </>
  );
};

export default CartList;
