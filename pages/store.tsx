import * as React from "react";
import { Flex } from "@chakra-ui/core";
import { Navbar } from "../components/microOrganisms/Navbar";
import { FilterBar } from "../components/microOrganisms/FilterBar";
import { Header } from "../components/atoms/Text";
import { useQuery, gql } from "@apollo/client";

const GET_DATA = gql`
  query ProductsData {
    productTypes {
      type
    }
    productPreservation {
      type
    }
  }
`;

const store = () => {
  const { loading, error, data } = useQuery(GET_DATA);
  const [state, setstate] = React.useState({
    types: "",
    preservations: "",
    showTypes: false,
    showPreservations: false,
  });
  const onChangePreservations = (e) => setstate((lastState) => ({ ...lastState, preservations: e }));
  const onChangeTypes = (e) => setstate((lastState) => ({ ...lastState, types: e }));
  const toggleTypes = () => setstate((lastState) => ({ ...lastState, showTypes: !lastState.showTypes }));
  const togglePreservations = () =>
    setstate((lastState) => ({ ...lastState, showPreservations: !lastState.showPreservations }));

  if (error) {
    console.log(error);
    return <h1>Error papu</h1>;
  }
  if (loading) {
    return <h1>Cargando papu awanta</h1>;
  }

  return (
    <div>
      <Navbar />
      <Flex justify="center" align="center" height="75vh" bgImage="url('/images/header-2.png')">
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
    </div>
  );
};

export default store;
