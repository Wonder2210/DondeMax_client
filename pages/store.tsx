import * as React from "react";
import { Flex, Grid, Box } from "@chakra-ui/core";
import { useQuery } from "@apollo/client";
import { Standard } from "@/layouts/Standard";
import { Pagination } from "@/molecules/Pagination";
import { FilterBar } from "@/organisms/FilterBar";
import ProductCard from "@/components/organisms/Cards/ProductCardShop";
import { Header } from "@/atoms/Text";
import { useAppContext } from "@/utils/AppContext";
import { GET_DATA_STORE } from "@/graphql";
import Animation from "@/molecules/Loader/Animation";
import Head from "next/head";

type state = {
  types: string;
  preservations: string;
  showTypes: boolean;
  showPreservations: boolean;
  page: number;
  products?: {
    total: number;
    results?: Array<{
      id: number;
      name: string;
      image: string;
      precio: number;
    }>;
  };
};
type ProductsCart = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
};

const store = () => {
  const { state: context, setState: setContext } = useAppContext();
  const [state, setState] = React.useState<state>({
    types: "",
    preservations: "",
    showTypes: false,
    showPreservations: false,
    page: 1,
    products: {
      total: 0,
      results: [],
    },
  });

  const { loading, error, data } = useQuery(GET_DATA_STORE, {
    variables: { preservation: state.preservations, type: state.types, cursor: state.page - 1 },
  });

  const onChangePreservations = (e) => {
    setState((lastState) => ({ ...lastState, preservations: e }));
  };
  React.useEffect(() => {
    if (data) setState({ ...state, products: { ...data.searchProducts, onCart: false } });
  }, [data, context.productsCart]);

  const onChangeTypes = (e) => setState((lastState) => ({ ...lastState, types: e }));

  const toggleTypes = () => setState((lastState) => ({ ...lastState, showTypes: !lastState.showTypes }));

  const togglePreservations = () =>
    setState((lastState) => ({ ...lastState, showPreservations: !lastState.showPreservations }));

  const next = () => setState((last) => ({ ...last, page: last.page + 1 }));

  const lastItem = () => setState((last) => ({ ...last, page: last.page - 1 }));

  const onClick = (e: number) => setState((last) => ({ ...last, page: e }));

  const addToCart = (item) => {
    setState({
      ...state,
      products: {
        ...state.products,
        results: state.products.results.map((i) => (i.id === item.id ? { ...i, onCart: true } : i)),
      },
    });
    setContext((last) => ({
      ...last,
      productsCart: [...last.productsCart, item],
    }));
  };

  const removeFromCart = (id) => {
    setState({
      ...state,
      products: {
        ...state.products,
        results: state.products.results.map((i) => (i.id === id ? { ...i, onCart: false } : i)),
      },
    });
    setContext((last) => ({ ...last, productsCart: last.productsCart.filter((i) => id !== i.id) }));
  };

  let { total } = state.products;
  if (error) {
    return <h1>Error </h1>;
  }
  if (loading) {
    return <Animation />;
  }

  const products = state.products.results.map((i) => {
    const isInCart = context.productsCart.find((item) => i.id === item.id);

    return (
      <ProductCard
        key={i.id}
        alt="image-test"
        src={i.image}
        price={`${i.precio}$`}
        name={i.name}
        onClick={() => (isInCart ? removeFromCart(i.id) : addToCart(i))}
        isInCart={isInCart}
      />
    );
  });
  total = state.products.total;

  return (
    <Standard>
      <Head>
        <title>Pedidos</title>
      </Head>
      <Flex
        justify="center"
        align="center"
        height="75vh"
        bgSize="cover"
        backgroundRepeat="no-repeat"
        bgPos="center"
        bgImage="url('/images/header-2.png')"
      >
        <Header>Pe</Header>
        <Header color="colors.rose.600">d</Header>
        <Header>i</Header>
        <Header color="colors.rose.600">d</Header>
        <Header>os</Header>
      </Flex>
      <FilterBar
        preservations={{
          list: data.productPreservation,
          onChange: onChangePreservations,
          show: state.showPreservations,
          toggle: togglePreservations,
          value: state.preservations,
        }}
        types={{
          list: data.productTypes,
          onChange: onChangeTypes,
          show: state.showTypes,
          toggle: toggleTypes,
          value: state.types,
        }}
      />
      <Grid
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gridTemplateRows="minmax(300px, auto)"
        gridAutoRows="auto"
        gridAutoFlow="dense"
        justifyContent="center"
        minHeight="25vh"
        marginTop="4em"
      >
        {products}
      </Grid>
      <Flex align="center" justify="center" height="min-content">
        <Pagination
          pageItems={12}
          numberItems={total}
          page={state.page}
          next={next}
          last={lastItem}
          onClick={onClick}
        />
      </Flex>
    </Standard>
  );
};

export default store;
