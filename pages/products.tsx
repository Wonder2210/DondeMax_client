import React from "react";
import { Flex, Tabs, TabList, Tab } from "@chakra-ui/core";
import { useQuery } from "@apollo/client";
import { Standard } from "@/layouts/Standard";
import { Header } from "@/atoms/Text";
import { Products } from "@/organisms/CardsContainer";
import { GET_BASE_PRODUCTS } from "@/graphql";
import { useRouter } from "next/router";
import Head from "next/head";

type state = {
  types: string;
  preservations: string;
  showTypes: boolean;
  showPreservations: boolean;
  page: number;
};

const products = () => {
  const router = useRouter();
  const [state, setState] = React.useState<state>({
    types: "",
    preservations: "",
    showTypes: false,
    showPreservations: false,
    page: 1,
  });
  const { data, error, loading } = useQuery(GET_BASE_PRODUCTS, {
    variables: { preservation: state.preservations, type: state.types, cursor: state.page - 1 },
  });

  return (
    <Standard>
      <Head>
        <title>Donde Max - productos</title>
      </Head>
      <Flex
        justify="center"
        width="100%"
        align="center"
        height="85%"
        backgroundImage="url('/images/cupcakes-inline.jpg')"
        backgroundPosition="center"
        backgroundSize="cover"
      >
        <Header color="#E91E63">Nuestros </Header>
        <br />
        <Header color="#E91E63">Productos</Header>
      </Flex>
      <Tabs
        margin="1em auto"
        overflow="auto"
        width={{ base: "100%", sm: "100%", md: "75%", lg: "70%" }}
        paddingX="1em"
        onChange={(index) => {
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
          }
        }}
      >
        <TabList>
          <Tab>Todos</Tab>
          <Tab>Tortas</Tab>
          <Tab>Porciones de torta</Tab>
          <Tab>Galletas</Tab>
        </TabList>
      </Tabs>
      {loading ? "Cargando" : <Products data={data.products.results} action={(e) => router.push("/store")} />}
    </Standard>
  );
};

export default products;
