import React from "react";
import { Dashboard } from "@/layouts/Dashboard";
import { useQuery, useMutation } from "@apollo/client";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Stack, Badge, Skeleton, useDisclosure } from "@chakra-ui/core";
import { SubHeader } from "@/atoms/Text";
import { Table } from "@/organisms/Table";
import { IconButton, Button } from "@/atoms/Buttons";
import { Order } from "@/organisms/Forms";
import Plus from "@iconify/icons-cil/plus";
import trash from "@iconify/icons-cil/trash";
import { Icon } from "@iconify/react";
import Animation from "@/molecules/Loader/Animation";
import dynamic from "next/dynamic";
import Head from "next/head";
import { GET_DATA_PEDIDOS, UPDATE_ORDER, PRODUCE_ORDER, DELETE_ORDER, TAKE_ORDER } from "@/graphql";

const GeneratePDF = dynamic(() => import("@/organisms/PDF/GeneratePdf"), { ssr: false });

const pedidos = () => {
  const defaultState = { order_id: null, orderMaterials: null, materials: null };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading, error: errorData } = useQuery(GET_DATA_PEDIDOS, { pollInterval: 500 });
  const [executeOrder, { error: execute }] = useMutation(UPDATE_ORDER);
  const [deleteOrder] = useMutation(DELETE_ORDER);
  const [takeOrderMutate] = useMutation(TAKE_ORDER);
  const [produceOrder] = useMutation(PRODUCE_ORDER, {
    onError: () =>
      alert("no hay suficiente mercancia para realizar este producto verifique el inventario y vuelva a intentar"),
  });

  if (errorData) {
    console.log(JSON.stringify(errorData.networkError, null, 2));
    console.log(errorData.graphQLErrors);
  }

  const onSubmit = (values) => {
    takeOrderMutate({
      variables: {
        ...values,
        client: Number(data.client),
        orderProducts: values.products.map((i) => ({ id: Number(i.id), quantity: Number(i.quantity) })),
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
          const dateString = value;
          const date = new Date(dateString.replace(" ", "T"));

          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();

          return String(`${day}-${month}-${year}`);
        },
      },
      { Header: "Nota", accessor: "note" },
      {
        Header: "Entregado",
        accessor: "delivery_status",
        Cell: ({
          value,
          row: {
            original: { id, production_status: productionStatus, stage_status: stageStatus },
          },
        }) => (
          <Button
            width="6em"
            height="2.7em"
            isDisabled={value || (productionStatus && stageStatus)}
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
                  id,
                  status: {
                    delivery_status: true,
                  },
                },
              });
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
            height="2.7em"
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
            height="2.7em"
            backgroundColor="transparent"
            color="black"
            isDisabled={value}
            _hover={
              value
                ? {}
                : {
                    bgColor: "colors.green.400",
                    color: "colors.green.400",
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
          const products = [];
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
      <Flex height="5em" justifyContent="space-between" paddingX="2em" alignItems="center">
        <SubHeader fontSize="1.5em" fontWeight="bold">
          Pedidos
        </SubHeader>
        <Button
          aria-label="add-more"
          onClick={onOpen}
          backgroundColor="colors.rose.600"
          height="1.9em"
          width="11em"
          leftIcon={<Icon icon={Plus} color="white" />}
          borderRadius="8px"
        >
          Agregar pedido
        </Button>
      </Flex>
      <Tabs>
        <TabList paddingX="2em">
          <Tab>Activos</Tab>
          <Tab>Entregados</Tab>
          <Tab>Form test</Tab>
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
                <Flex width="100%" justifyContent="flex-start" paddingY="1.5em" flexGrow={1} alignItems="center">
                  <GeneratePDF
                    orientation="landscape"
                    columns={columns
                      .map((i) => ({ header: i.Header, dataKey: i.accessor }))
                      .filter((i) => i.header !== "Acciones")}
                  />
                </Flex>

                <Table columns={columns} data={data.orders.filter((i) => i.delivery_status === false)} />
              </>
            )}
          </TabPanel>
          <TabPanel>
            {loading ? (
              <Animation />
            ) : (
              <>
                <Flex width="100%" justifyContent="flex-end" flexGrow={1} alignItems="center">
                  <Flex width="10em" justifyContent="space-between" alignItems="center">
                    <GeneratePDF
                      orientation="landscape"
                      tableId="#released-orders"
                      columns={columns
                        .map((i) => ({ header: i.Header, dataKey: i.accessor }))
                        .filter((i) => i.header !== "Acciones")}
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
          <TabPanel>
            <Flex margin="5em auto" maxW="xl" height="50vh" bgColor="#e5e6e8">
              {" "}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Dashboard>
  );
};

export default pedidos;
