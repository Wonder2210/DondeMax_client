import React from "react";
import { Dashboard } from "@/layouts/Dashboard";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Badge, useDisclosure } from "@chakra-ui/core";
import { SubHeader } from "@/atoms/Text";
import { Table } from "@/organisms/Table";
import { IconButton, Button } from "@/atoms/Buttons";
import { Order } from "@/organisms/Forms";
import Plus from "@iconify/icons-cil/plus";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
const GeneratePDF = dynamic(() => import("@/organisms/PDF/GeneratePdf"), { ssr: false });

const GET_DATA = gql`
  query GetOrders {
    clients {
      id
      type: name
    }
    productList: productsRaw {
      id
      type: name
      price: precio
    }
    orders {
      id
      pay_method
      delivery_date
      note
      delivery_status
      production_status
      stage_status
      abono
      monto
      total
      creator {
        name
      }
      client {
        name
      }
      products {
        id
        quantity
        product {
          name
        }
      }
    }
  }
`;

const takeOrder = gql`
  mutation TakeOrder(
    $client: Int!
    $deliveryDate: String!
    $payMethod: PayMethod!
    $note: String!
    $abono: Float!
    $total: Float!
    $monto: Float!
    $orderProducts: [ProductOrderInput!]!
  ) {
    takeOrder(
      order: {
        client: $client
        deliveryDate: $deliveryDate
        payMethod: $payMethod
        note: $note
        deliveryStatus: false
        stageStatus: false
        productionStatus: false
        abono: $abono
        total: $total
        monto: $monto
        orderProducts: $orderProducts
      }
    ) {
      id
    }
  }
`;
const pedidos = () => {
  const { data, loading } = useQuery(GET_DATA, { pollInterval: 500 });
  const [takeOrderMutate, { error }] = useMutation(takeOrder);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onSubmit = (data) => {
    takeOrderMutate({
      variables: {
        ...data,
        client: Number(data.client),
        orderProducts: data.products.map((i) => ({ id: Number(i.id), quantity: Number(i.quantity) })),
      },
    });
  };
  if (error) {
    console.log(JSON.stringify(error.networkError, null, 2));
    console.log(error.graphQLErrors);
  }
  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Metodo de pago", accessor: "pay_method" },
      {
        Header: "Fecha a ser entregado",
        accessor: "delivery_date",
        Cell: ({ value }) => {
          const date = new Date(Number(value));

          const day = date.getDay();
          const month = date.getMonth();
          const year = date.getFullYear();

          console.log(year);
          return day + "-" + month + "-" + year;
        },
      },
      { Header: "Nota", accessor: "note" },
      {
        Header: "Entregado",
        accessor: "delivery_status",
        Cell: ({ value }) => (value ? "Listo" : "Todavia"),
      },
      {
        Header: "Listo para entregar",
        accessor: "stage_status",
        Cell: ({ value }) => (value ? "Listo" : "Todavia"),
      },
      {
        Header: "Producido",
        accessor: "production_status",
        Cell: ({ value }) => (
          <Button
            backgroundColor="transparent"
            color="black"
            _hover={{
               bgColor: "rgb(0,255,100)",
              color: "transparent",
              _after: {
                content: '"Producir"',
                width: "100%",
                position: "absolute",
                zIndex: 1,
                color: "black",
                bgColor: "rgb(0,255,100)",
              },
              bgColor: "rgb(0,255,100)",
              color: "transparent",
            }}
          >
            Aun no
          </Button>
        ),
      },
      { Header: "Abono", accessor: "abono", Cell: ({ value }) => `${value}$` },
      { Header: "Monto restante", accessor: "monto", Cell: ({ value }) => `${value}$` },
      { Header: "Total", accessor: "total", Cell: ({ value }) => `${value}$` },
      { Header: "Creador", accessor: "creator.name" },
      { Header: "Cliente", accessor: "client.name" },
      {
        Header: "Productos",
        accessor: "products",
        Cell: ({ value }) => {
          let products = [];
          value.forEach((i) => {
            products.push(
              <>
                <Badge>
                  {i.product.name}:{i.quantity}
                </Badge>
                <br />
              </>,
            );
          });
          return products;
        },
      },
    ],
    [],
  );
  return (
    <Dashboard>
      <Tabs>
        <TabList>
          <Tab>Pedidos Activos</Tab>
          <Tab>Pedidos Entregados</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {loading ? (
              <h1>Loading bro</h1>
            ) : (
              <>
                <Order
                  isOpen={isOpen}
                  isEditing={false}
                  onClose={onClose}
                  onEdit={() => console.log("here")}
                  onSubmit={onSubmit}
                  values={{}}
                  productList={data.productList}
                  clientList={data.clients}
                />
                <Flex height="5em" justifyContent="space-between" alignItems="center">
                  <SubHeader>Pedidos activos</SubHeader>
                  <Flex width="10em" justifyContent="space-between" alignItems="center">
                    <GeneratePDF
                      columns={columns
                        .map((i) => ({ header: i.Header, dataKey: i.accessor }))
                        .filter((i) => i.header !== "Acciones")}
                    />
                    <IconButton
                      aria-label="add-more"
                      onClick={onOpen}
                      backgroundColor="colors.rose.600"
                      icon={<Icon icon={Plus} color="white" />}
                    />
                  </Flex>
                </Flex>
                <Table columns={columns} data={data.orders.filter((i) => i.delivery_status === false)} />
              </>
            )}
          </TabPanel>
          <TabPanel>
            {loading ? (
              <h1>Loading bro</h1>
            ) : (
              <>
                <Flex height="5em" justifyContent="space-between" alignItems="center">
                  <SubHeader>Pedidos Pasados</SubHeader>
                  <Flex width="10em" justifyContent="space-between" alignItems="center">
                    <GeneratePDF
                      tableId="#released-orders"
                      columns={columns
                        .map((i) => ({ header: i.Header, dataKey: i.accessor }))
                        .filter((i) => i.header !== "Acciones")}
                    />
                    <IconButton
                      aria-label="add-more"
                      onClick={onOpen}
                      backgroundColor="colors.rose.600"
                      icon={<Icon icon={Plus} color="white" />}
                    />
                  </Flex>
                </Flex>
                <Table
                  columns={columns}
                  id="released-orders"
                  data={data.orders.filter((i) => i.delivery_status === true)}
                />
              </>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Dashboard>
  );
};

export default pedidos;
