import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from "@chakra-ui/core";
import Animation from "@/molecules/Loader/Animation";
import { SubHeader } from "@/atoms/Text";
import { Table } from "@/organisms/Table";
import { Dashboard } from "@/layouts/Dashboard";
import dynamic from "next/dynamic";
import Head from "next/head";
import { auditorias } from "@/utils/TablesHeader";
const GeneratePDF = dynamic(() => import("@/organisms/PDF/GeneratePdf"), { ssr: false });
import { GET_DATA_AUDITORIAS } from "@/graphql";

function clientes() {
  const { data, loading, error } = useQuery(GET_DATA_AUDITORIAS, { pollInterval: 5000 });
  const columns = React.useMemo(() => [...auditorias], []);
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
            <Flex height="5em" paddingX="3em" justifyContent="space-between" alignItems="center">
              <SubHeader>Pedidos</SubHeader>
              <GeneratePDF
                tableId="#orders"
                columns={columns[0]
                  .map((i) => ({ header: i.Header, dataKey: i.accessor }))
                  .filter((i) => i.header !== "Acciones")}
              />
            </Flex>
            {loading ? <Animation /> : <Table id="orders" columns={columns[0]} data={data.ordersLog} />}
          </TabPanel>
          <TabPanel>
            <Flex height="5em" paddingX="3em" justifyContent="space-between" alignItems="center">
              <SubHeader>Productos</SubHeader>
              <GeneratePDF
                tableId="#products"
                columns={columns[1]
                  .map((i) => ({ header: i.Header, dataKey: i.accessor }))
                  .filter((i) => i.header !== "Acciones")}
              />
            </Flex>
            {loading ? <Animation /> : <Table id="products" columns={columns[2]} data={data.productsLog} />}
          </TabPanel>
          <TabPanel>
            <Flex height="5em" paddingX="3em" justifyContent="space-between" alignItems="center">
              <SubHeader>Inventario</SubHeader>
              <GeneratePDF
                tableId="#inventario"
                columns={columns[2]
                  .map((i) => ({ header: i.Header, dataKey: i.accessor }))
                  .filter((i) => i.header !== "Acciones")}
              />
            </Flex>
            {loading ? <Animation /> : <Table id="inventario" columns={columns[1]} data={data.storageLog} />}
          </TabPanel>
          <TabPanel>
            <Flex height="5em" justifyContent="space-between" alignItems="center">
              <SubHeader>Sesion</SubHeader>
              <GeneratePDF
                tableId="#sesion"
                columns={columns[3]
                  .map((i) => ({ header: i.Header, dataKey: i.accessor }))
                  .filter((i) => i.header !== "Acciones")}
              />
            </Flex>
            {loading ? <Animation /> : <Table id="sesion" columns={columns[3]} data={data.sessionLog} />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Dashboard>
  );
}

export default clientes;
