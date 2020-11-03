import React from "react";
import { Flex, Tabs, TabList, Tab } from "@chakra-ui/core";
import { useQuery } from "@apollo/client";
import { Standard } from "@/layouts/Standard";
import { Header } from "@/atoms/Text";
import { Products } from "@/organisms/CardsContainer";
import { GET_BASE_PRODUCTS } from "../utils/queries";

type state = {
  types: string;
  preservations: string;
  showTypes: boolean;
  showPreservations: boolean;
  page: number;
};

const products = () => {
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

  if (loading) {
    return "loading bro";
  }
  return (
    <Standard>
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
      <Tabs margin="1em auto" width={{ base: "80%", sm: "100%", md: "75%", lg: "70%" }}>
        <TabList>
          <Tab>Todos</Tab>
          <Tab>Tortas</Tab>
          <Tab>Galletas</Tab>
          <Tab>Dulces frios</Tab>
          <Tab>Pasapalos</Tab>
        </TabList>
      </Tabs>
      <Products data={data.products.results} action={(e) => alert(e)} />
    </Standard>
  );
};

export default products;
