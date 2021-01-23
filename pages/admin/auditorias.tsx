import React from "react";
import { useQuery } from "@apollo/client";
import { Tabs, TabList, TabPanels, Stack, Skeleton, Tab, TabPanel, Flex } from "@chakra-ui/core";
import { OrdersHistoryTable, ProductsHistoryTable, StockHistoryTable, SessionHistoryTable } from "@/organisms/Table";
import { Dashboard } from "@/layouts/Dashboard";
import Head from "next/head";
import { GET_DATA_AUDITORIAS } from "@/graphql";

function clientes() {
  const { data, loading, error } = useQuery(GET_DATA_AUDITORIAS, { pollInterval: 5000 });
  if (error) {
    console.log(JSON.stringify(error.networkError, null, 2));
    console.log(error.graphQLErrors);
  }
  return (
    <Dashboard>
      <Head>
        <title>Admin - Auditorias</title>
      </Head>
      <Tabs>
        <TabList>
          <Tab>Pedidos</Tab>
          <Tab>Productos</Tab>
          <Tab>Inventario</Tab>
          <Tab>Sesion</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {loading ? (
              <Stack spacing={3} width="100%" paddingX="2em" marginTop="4em">
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
              </Stack>
            ) : (
              <OrdersHistoryTable id="orders" data={data.ordersLog} />
            )}
          </TabPanel>
          <TabPanel>
            {loading ? (
              <Stack spacing={3} width="100%" paddingX="2em" marginTop="4em">
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
              </Stack>
            ) : (
              <ProductsHistoryTable id="products" data={data.productsLog} />
            )}
          </TabPanel>
          <TabPanel>
            {loading ? (
              <Stack spacing={3} width="100%" paddingX="2em" marginTop="4em">
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
              </Stack>
            ) : (
              <StockHistoryTable id="inventario" data={data.storageLog} />
            )}
          </TabPanel>
          <TabPanel>
            {loading ? (
              <Stack spacing={3} width="100%" paddingX="2em" marginTop="4em">
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
              </Stack>
            ) : (
              <SessionHistoryTable id="sesion" data={data.sessionLog} />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Dashboard>
  );
}

export default clientes;
