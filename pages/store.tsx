import * as React from "react";
import { Flex, Grid, Box } from "@chakra-ui/core";
import { useQuery } from "@apollo/client";
import { Standard } from "@/layouts/Standard";
import { Pagination } from "@/molecules/Pagination";
import { FilterBar } from "@/organisms/FilterBar";
import ProductCard from "@/components/organisms/Cards/ProductCardShop";
import { Header } from "@/atoms/Text";
import { GET_TYPES, GET_DATA } from "../utils/queries";

type state = {
  types: string;
  preservations: string;
  showTypes: boolean;
  showPreservations: boolean;
  page: number;
};

const store = () => {
  const [state, setState] = React.useState<state>({
    types: "",
    preservations: "",
    showTypes: false,
    showPreservations: false,
    page: 1,
  });
  const { loading, error, data } = useQuery(GET_TYPES);
  const { loading: LoadingProducts, error: ErrorProducts, data: ProductsData } = useQuery(GET_DATA, {
    variables: { preservation: state.preservations, type: state.types, cursor: state.page - 1 },
  });
  const onChangePreservations = (e) => setState((lastState) => ({ ...lastState, preservations: e }));
  const onChangeTypes = (e) => setState((lastState) => ({ ...lastState, types: e }));
  const toggleTypes = () => setState((lastState) => ({ ...lastState, showTypes: !lastState.showTypes }));
  const togglePreservations = () =>
    setState((lastState) => ({ ...lastState, showPreservations: !lastState.showPreservations }));
  const next = () => setState((last) => ({ ...last, page: last.page + 1 }));
  const last = () => setState((last) => ({ ...last, page: last.page - 1 }));
  const onClick = (e: number) => setState((last) => ({ ...last, page: e }));
  let total = 1;
  if (error) {
    return <h1>Error papu</h1>;
  }
  if (loading) {
    return <h1>Cargando papu awanta</h1>;
  }
  let products = <p>Nada bro</p>;

  if (LoadingProducts) {
    products = <h1>Cargando</h1>;
  }
  if (ErrorProducts) {
    products = <h1>algo anda mal bro o</h1>;
  }
  if (ProductsData) {
    total = ProductsData.products.total;
    products = ProductsData.products.results.map((i) => {
      return <ProductCard key={i.id} alt="image-test" src={i.image} price={i.price} name={i.name} isInCart />;
    });
  }

  return (
    <Standard>
      <Flex
        justify="center"
        align="center"
        height="75vh"
        bgSize="cover"
        backgroundRepeat="no-repeat"
        bgPos="center"
        bgImage="url('/images/header-2.png')"
      >
        <Header>Catalogo</Header>
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
        <Pagination pageItems={12} numberItems={total} page={state.page} next={next} last={last} onClick={onClick} />
      </Flex>
    </Standard>
  );
};

export default store;
