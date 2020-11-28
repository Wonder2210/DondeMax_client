import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from "@chakra-ui/core";
import { SubHeader } from "@/atoms/Text";
import { Table } from "@/organisms/Table";
import { Dashboard } from "@/layouts/Dashboard";
import dynamic from "next/dynamic";
const GeneratePDF = dynamic(() => import("@/organisms/PDF/GeneratePdf"), { ssr: false });
import Head from "next/head";

const GET_DATA = gql`
  query Logs {
    ordersLog {
      id_pedido
      user_db
      date
      delivered
      stage
      production
      action_name
    }
    storageLog {
      id_material
      id_provider
      user_db
      action_name
      date
    }
    productsLog {
      user_db
      id_product
      action_name
      date
    }
    sessionLog {
      id_user
      username
      date
      action_name
    }
  }
`;

function clientes() {
  const { data, loading, error } = useQuery(GET_DATA, { pollInterval: 5000 });
  const columns = React.useMemo(
    () => [
      [
        {
          Header: "ID pedido",
          accessor: "id_pedido",
        },
        {
          Header: "Usuario",
          accessor: "user_db",
        },
        {
          Header: "Entregado",
          accessor: "delivered",
          Cell: ({ value }) => (value ? "Listo" : "Todavia"),
        },
        {
          Header: "Listo para entregar",
          accessor: "stage",
          Cell: ({ value }) => (value ? "Listo" : "Todavia"),
        },
        {
          Header: "Producido",
          accessor: "production",
          Cell: ({ value }) => (value ? "Listo" : "Todavia"),
        },
        {
          Header: "Accion ejecutada",
          accessor: "action_name",
        },
        {
          Header: "Fecha",
          accessor: "date",
          Cell: ({ value }) => {
            const date = new Date(Number(value));

            const day = date.getDay();
            const month = date.getMonth();
            const year = date.getFullYear();

            console.log(year);
            return day + "-" + month + "-" + year;
          },
        },
      ],
      [
        {
          Header: "ID pedido",
          accessor: "id_material",
        },
        {
          Header: " ID Usuario",
          accessor: "id_provider",
        },
        {
          Header: "Usuario",
          accessor: "user_db",
        },
        {
          Header: "Accion ejecutada",
          accessor: "action_name",
        },
        {
          Header: "Fecha",
          accessor: "date",
          Cell: ({ value }) => {
            const date = new Date(Number(value));

            const day = date.getDay();
            const month = date.getMonth();
            const year = date.getFullYear();

            console.log(year);
            return day + "-" + month + "-" + year;
          },
        },
      ],
      [
        {
          Header: "Creador ID",
          accessor: "user_db",
        },
        {
          Header: "ID Producto",
          accessor: "id_product",
        },
        {
          Header: "Accion ejecutada",
          accessor: "action_name",
        },
        {
          Header: "Fecha",
          accessor: "date",
          Cell: ({ value }) => {
            const date = new Date(Number(value));

            const day = date.getDay();
            const month = date.getMonth();
            const year = date.getFullYear();

            console.log(year);
            return day + "-" + month + "-" + year;
          },
        },
      ],
      [
        {
          Header: "ID usuario",
          accessor: "id_user",
        },
        {
          Header: "Nombre",
          accessor: "username",
        },
        {
          Header: "Fecha",
          accessor: "date",
          Cell: ({ value }) => {
            const date = new Date(Number(value));

            const day = date.getDay();
            const month = date.getMonth();
            const year = date.getFullYear();

            console.log(year);
            return day + "-" + month + "-" + year;
          },
        },
      ],
    ],
    [],
  );
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
            {loading ? <h1>Cargando...</h1> : <Table id="orders" columns={columns[0]} data={data.ordersLog} />}
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
            {loading ? <h1>Cargando...</h1> : <Table id="products" columns={columns[2]} data={data.productsLog} />}
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
            {loading ? <h1>Cargando...</h1> : <Table id="inventario" columns={columns[1]} data={data.storageLog} />}
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
            {loading ? <h1>Cargando...</h1> : <Table id="sesion" columns={columns[3]} data={data.sessionLog} />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Dashboard>
  );
}

export default clientes;
