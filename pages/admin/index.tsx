import React from "react";
import { Flex, useDisclosure, Box, Grid, Stat, StatNumber } from "@chakra-ui/core";
import { Parragraph } from "@/atoms/Text";
import { useQuery, gql } from "@apollo/client";
import dynamic from "next/dynamic";
const ProductsOrderChart = dynamic(() => import("@/molecules/Charts/ProductsOrders"), { ssr: false });
const MaterialsChart = dynamic(() => import("@/molecules/Charts/MaterialsStage"), { ssr: false });
const OrdersChart = dynamic(() => import("@/molecules/Charts/PedidosChart"), { ssr: false });

import { SubHeader, Header } from "@/atoms/Text";

import { Dashboard } from "@/layouts/Dashboard";
import Head from "next/head";
const GET_BASE_PRODUCTS = gql`
  query Get {
    orders {
      id
      delivery_status
      products {
        id
      }
    }
    materialsStage {
      name
      weight
    }
    users {
      id
    }
    clients {
      id
    }
    productsRaw {
      id
    }
    providers {
      id
    }
  }
`;

const index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error, loading } = useQuery(GET_BASE_PRODUCTS, { variables: { cursor: 0 } });

  if (loading) {
    return <h1>Cargando ... </h1>;
  }

  return (
    <Dashboard>
      <Head>
        <title>Admin - Inicio</title>
      </Head>
      <Flex height="5em" justifyContent="space-between" alignItems="center">
        <SubHeader>Bienvenido</SubHeader>
      </Flex>
      {loading ? (
        "Cargando ..."
      ) : (
        <>
          <Grid
            templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
            gridTemplateRows="minmax(300px, auto)"
            gridAutoRows="auto"
            gridAutoFlow="dense"
            heigh="70vh"
          >
            <Box bgColor="" boxShadow="xl" height="30vh">
              <ProductsOrderChart orders={data.orders} />
              <Flex justify="center" alignItems="center">
                <Parragraph fontSize="1em">Numero de productos pedidos</Parragraph>{" "}
              </Flex>
            </Box>
            <Box bgColor="" boxShadow="xl" height="30vh">
              <MaterialsChart data={data} />
              <Flex justify="center" alignItems="center">
                <Parragraph fontSize="1em">Mercancia en inventario</Parragraph>{" "}
              </Flex>
            </Box>
          </Grid>
          <Grid
            templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
            gridTemplateRows="minmax(300px, auto)"
            gridAutoRows="auto"
            gridAutoFlow="dense"
          >
            <Box bgColor="" boxShadow="xl">
              <OrdersChart data={data} />
              <Flex justify="center" alignItems="center">
                <Parragraph fontSize="1em">Pedidos</Parragraph>{" "}
              </Flex>
            </Box>
            <Box bgColor="" boxShadow="xl">
              {/* <ChartistGraph/> */}
            </Box>
            <Box bgColor="" boxShadow="xl">
              {/* <ChartistGraph/> */}
            </Box>
          </Grid>
        </>
      )}
    </Dashboard>
  );
};

export default index;
