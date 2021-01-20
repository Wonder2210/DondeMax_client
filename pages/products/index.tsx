import * as React from "react";
import { Flex, Grid, Tabs, Tab, TabList } from "@chakra-ui/core";
import { useQuery } from "@apollo/client";
import { Standard } from "@/layouts/Standard";
import { Pagination } from "@/molecules/Pagination";
import { ProductCard } from "@/components/organisms/Cards";
import { Header } from "@/atoms/Text";
import { GET_DATA_STORE } from "@/graphql";
import Animation from "@/molecules/Loader/Animation";
import Head from "next/head";

type state = {
  types: string;
  preservations: string;
  showTypes: boolean;
  showPreservations: boolean;
  page: number;
  total: number;
};

const store = () => {
  const [state, setState] = React.useState<state>({
    types: "",
    preservations: "",
    showTypes: false,
    showPreservations: false,
    page: 1,
    total: 1,
  });

  const { loading, error, data } = useQuery(GET_DATA_STORE, {
    variables: { preservation: state.preservations, type: state.types, cursor: state.page - 1 },
    onCompleted: (result) => {
      setState({ ...state, total: result.searchProducts.results.length });
    },
  });
  const next = () => setState((last) => ({ ...last, page: last.page + 1 }));

  const lastItem = () => setState((last) => ({ ...last, page: last.page - 1 }));

  const onClick = (e: number) => setState((last) => ({ ...last, page: e }));

  const onChangeTabs = (index) => {
    switch (index) {
      case 0:
        setState((last) => ({ ...last, types: "" }));
        break;
      case 1:
        setState((last) => ({ ...last, types: "Tortas" }));
        break;
      case 2:
        setState((last) => ({ ...last, types: "Porcion de torta" }));
        break;
      case 3:
        setState((last) => ({ ...last, types: "Galleta" }));
        break;
      default:
        break;
    }
  };

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
        <Header size="4xl">Pe</Header>
        <Header size="4xl" color="colors.rose.600">
          d
        </Header>
        <Header size="4xl">i</Header>
        <Header size="4xl" color="colors.rose.600">
          d
        </Header>
        <Header size="4xl">os</Header>
      </Flex>
      <Tabs
        margin="1em auto"
        overflow="auto"
        width={{ base: "100%", sm: "100%", md: "75%", lg: "70%" }}
        paddingX="1em"
        onChange={onChangeTabs}
      >
        <TabList>
          <Tab>Todos</Tab>
          <Tab>Tortas</Tab>
          <Tab>Porciones de torta</Tab>
          <Tab>Galletas</Tab>
        </TabList>
      </Tabs>
      <Grid
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gridTemplateRows="minmax(300px, auto)"
        gridAutoRows="auto"
        gridAutoFlow="dense"
        justifyItems="center"
        minHeight="25vh"
        marginY="2em"
      >
        {loading ? (
          <Animation />
        ) : (
          data.searchProducts.results.map((i) => (
            <ProductCard
              id={i.id}
              key={i.id}
              rating={i.rate.value}
              timesValued={i.rate.times_valued}
              alt="image-test"
              src={i.image}
              price={`${i.precio}$`}
              name={i.name}
            />
          ))
        )}
      </Grid>
      <Flex align="center" justify="center" height="min-content">
        <Pagination
          pageItems={12}
          numberItems={state.total}
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
