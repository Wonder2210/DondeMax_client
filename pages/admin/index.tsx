import React from "react";
import { Flex, Box, Grid } from "@chakra-ui/react";
import Head from "next/head";
import Animation from "@/molecules/Loader/Animation";
import { useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { GET_DATA_INDEX } from "@/graphql";
import { SubHeader, Parragraph } from "@/atoms/Text";
import { Dashboard } from "@/layouts/Dashboard";

const ProductsOrderChart = dynamic(() => import("@/molecules/Charts/ProductsOrders"), { ssr: false });
const MaterialsChart = dynamic(() => import("@/molecules/Charts/MaterialsStage"), { ssr: false });
const OrdersChart = dynamic(() => import("@/molecules/Charts/PedidosChart"), { ssr: false });

const index = () => {
  const { data, loading } = useQuery(GET_DATA_INDEX, { variables: { cursor: 0 } });

  return (
    <Dashboard>
      <Head>
        <title>Admin - Inicio</title>
      </Head>
      <Flex height="5em" justifyContent="space-between" alignItems="center">
        <SubHeader>Bienvenido</SubHeader>
      </Flex>
      {loading ? (
        <Animation />
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
          </Grid>
        </>
      )}
    </Dashboard>
  );
};

export default index;
