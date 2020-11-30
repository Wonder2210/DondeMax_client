import React from "react";
import { Dashboard } from "@/layouts/Dashboard";
import { useQuery, useMutation, gql } from "@apollo/client";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Badge,
  useDisclosure,
  createStandaloneToast,
} from "@chakra-ui/core";
import { SubHeader } from "@/atoms/Text";
import { Table } from "@/organisms/Table";
import { IconButton, Button } from "@/atoms/Buttons";
import { Order } from "@/organisms/Forms";
import Plus from "@iconify/icons-cil/plus";
import trash from "@iconify/icons-cil/trash";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
const GeneratePDF = dynamic(() => import("@/organisms/PDF/GeneratePdf"), { ssr: false });
import Head from "next/head";

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

    materialsStage {
      id
      name
      uniteds
      weight
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
        materials {
          id
          material_name
          quantity
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

const updateOrder = gql`
  mutation update($id: Int!, $status: UpdateOrder!) {
    updatStateOrder(id: $id, state: $status) {
      id
    }
  }
`;

const ProduceOrder = gql`
  mutation ProduceOrder($id: Int!) {
    produceOrder(id: $id) {
      id
    }
  }
`;

const deleteOrderq = gql`
  mutation DeleteOrder($id: Int!) {
    deleteOrder(id: $id)
  }
`;
const pedidos = () => {
  const defaultState = { order_id: null, orderMaterials: null, materials: null };
  const toast = createStandaloneToast();
  const { data, loading, error: errorData } = useQuery(GET_DATA, { pollInterval: 500 });
  const [executeOrder, { error: execute }] = useMutation(updateOrder);
  const [produceOrder, { error: produceError }] = useMutation(ProduceOrder, {
    onError: () =>
      alert("no hay suficiente mercancia para realizar este producto verifique el inventario y vuelva a intentar"),
  });

  if (errorData) {
    console.log(JSON.stringify(errorData.networkError, null, 2));
    console.log(errorData.graphQLErrors);
  }
  const [deleteOrder] = useMutation(deleteOrderq);
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
  if (execute) {
    console.log(JSON.stringify(execute.networkError, null, 2));
    console.log(execute.graphQLErrors);
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
        Cell: ({
          value,
          row: {
            original: { id, delivery_status, production_status, stage_status },
          },
        }) => (
          <Button
            width="6em"
            isDisabled={value || (production_status && stage_status)}
            backgroundColor="transparent"
            color="black"
            _hover={
              value
                ? {}
                : {
                    bgColor: "black",
                    color: "black",
                    _after: {
                      content: '"Entregar"',

                      position: "absolute",
                      zIndex: 1,
                      color: "white",
                    },
                  }
            }
            onClick={() => {
              executeOrder({
                variables: {
                  id: id,
                  status: {
                    delivery_status: true,
                  },
                },
              });
              return;
            }}
          >
            {value ? "listo" : "Todavia"}
          </Button>
        ),
      },
      {
        Header: "Listo para entregar",
        accessor: "stage_status",
        Cell: ({ value, row }) => (
          <Button
            width="6em"
            isDisabled={!row.original.production_status || (row.original.production_status && value)}
            backgroundColor="transparent"
            color="black"
            _hover={
              value
                ? {}
                : {
                    bgColor: "black",
                    color: "black",
                    _after: {
                      content: '"Listo"',

                      position: "absolute",
                      zIndex: 1,
                      color: "white",
                    },
                  }
            }
            onClick={() => {
              executeOrder({
                variables: {
                  id: row.original.id,
                  status: {
                    stage_status: true,
                  },
                },
              });
              return;
            }}
          >
            {value ? "listo" : "Aun no"}
          </Button>
        ),
      },
      {
        Header: "Producido",
        accessor: "production_status",
        Cell: ({ value, row }) => (
          <Button
            width="6em"
            backgroundColor="transparent"
            color="black"
            isDisabled={value}
            _hover={
              value
                ? {}
                : {
                    bgColor: "black",
                    color: "black",
                    _after: {
                      content: '"Producir"',

                      position: "absolute",
                      zIndex: 1,
                      color: "white",
                    },
                  }
            }
            onClick={() => {
              produceOrder({
                variables: {
                  id: row.original.id,
                  status: {
                    production_status: true,
                  },
                },
              });
              return;
            }}
          >
            {value ? "listo" : "Aun no"}
          </Button>
        ),
      },
      {
        Header: "cancelar",
        Cell: ({ row }) => (
          <IconButton
            backgroundColor="rgb(255,20,20)"
            aria-label="eliminar-cancelar"
            icon={<Icon icon={trash} color="white" />}
            onClick={() => {
              const verify = confirm("Seguro de cancelar este pedido?");
              return verify ? deleteOrder({ variables: { id: row.original.id } }) : null;
            }}
          />
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
      <Head>
        <title>Admin - Pedidos</title>
      </Head>
      <Tabs>
        <TabList>
          <Tab>Pedidos Activos</Tab>
          <Tab>Pedidos Entregados</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {loading ? (
              <h1>Cargando ... </h1>
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
                      orientation="landscape"
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
              <h1>Cargando ...</h1>
            ) : (
              <>
                <Flex height="5em" justifyContent="space-between" alignItems="center">
                  <SubHeader>Pedidos Pasados</SubHeader>
                  <Flex width="10em" justifyContent="space-between" alignItems="center">
                    <GeneratePDF
                      orientation="landscape"
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
