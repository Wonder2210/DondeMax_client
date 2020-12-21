import * as React from "react";
import { useQuery, gql } from "@apollo/client";
import { Box, Flex } from "@chakra-ui/core";
import { NavbarClient } from "@/organisms/Navbar";
import { Parragraph } from "@/atoms/Text";
import { Table } from "@/organisms/Table";
import Head from "next/head";

const query = gql`
  query {
    clientOrders {
      pending {
        id
        pay_method
        delivery_date
        note
        production_status
        stage_status
        delivery_status
        abono
        total
      }
      delivered {
        id
        id
        pay_method
        delivery_date
        note
        production_status
        stage_status
        delivery_status
        abono
        total
      }
    }
  }
`;
const index = () => {
  const rows = React.useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "fecha de entrega",
        accessor: "delivery_date",
        Cell: ({ value }) => {
          const dateString = value;
          const date = new Date(dateString.replace(" ", "T"));

          const day = date.getDate();
          const month = date.getMonth();
          const year = date.getFullYear();
          return String(`${day}-${month}-${year}`);
        },
      },
      {
        Header: "Metodo de pago",
        accessor: "pay_method",
      },
      {
        Header: "Nota",
        accessor: "note",
      },
      {
        Header: "Estatus de produccion",
        accessor: "production_status",
        Cell: ({ value }) => (value ? "Listo" : "Pendiente por ser producido"),
      },
      {
        Header: "Listo para ser entregado",
        accessor: "stage_status",
        Cell: ({ value }) => (value ? "Listo" : "Todavia"),
      },
      {
        Header: "Entregado",
        accessor: " delivery_status",
        Cell: ({ value }) => (value ? "Entregado" : "Aun no retirado"),
      },
      {
        Header: "abono",
        accessor: "abono",
      },
      {
        Header: "total",
        accessor: "total",
      },
    ],
    [],
  );
  const { data, loading } = useQuery(query);
  return (
    <Box position="fixed" w="100%" h="100vh">
      <Head>
        <title>Cliente - pedidos</title>
      </Head>
      <NavbarClient />
      <Flex display="row" align="flex-start">
        <Parragraph>Pedidos Pendientes</Parragraph>
        {loading ? <h1>Cargando ...</h1> : <Table columns={rows} data={data.clientOrders.pending} />}
      </Flex>
      <Flex display="row" align="flex-start">
        <Parragraph>Pedidos Entregados</Parragraph>
        {loading ? <h1>Cargando ...</h1> : <Table columns={rows} data={data.clientOrders.delivered} />}
        <Parragraph>para cancelar el pedido ponerse en contacto con nosotros al numero 0416979861</Parragraph>
      </Flex>
    </Box>
  );
};

export default index;
