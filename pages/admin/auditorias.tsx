import React from "react";
import { useQuery } from "@apollo/client";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { OrdersHistoryTable, ProductsHistoryTable, StockHistoryTable, SessionHistoryTable } from "@/organisms/Table";
import { Dashboard } from "@/layouts/Dashboard";
import Head from "next/head";
import SkeletonLoader from "@/molecules/Loader/SkeletonLoader";
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
          <TabPanel>{loading ? <SkeletonLoader /> : <OrdersHistoryTable id="orders" data={data.ordersLog} />}</TabPanel>
          <TabPanel>
            {loading ? <SkeletonLoader /> : <ProductsHistoryTable id="products" data={data.productsLog} />}
          </TabPanel>
          <TabPanel>
            {loading ? <SkeletonLoader /> : <StockHistoryTable id="inventario" data={data.storageLog} />}
          </TabPanel>
          <TabPanel>
            {loading ? <SkeletonLoader /> : <SessionHistoryTable id="sesion" data={data.sessionLog} />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Dashboard>
  );
}

export default clientes;
