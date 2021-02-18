import React from "react";
import { Dashboard } from "@/layouts/Dashboard";
import { useQuery, useMutation } from "@apollo/client";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, useDisclosure } from "@chakra-ui/react";
import { SubHeader } from "@/atoms/Text";
import { OrdersTable } from "@/organisms/Table";
import { Button } from "@/atoms/Buttons";
import { Order } from "@/organisms/Forms";
import SkeletonLoader from "@/molecules/Loader/SkeletonLoader";
import Plus from "@iconify/icons-cil/plus";
import { Icon } from "@iconify/react";
import Head from "next/head";
import { GET_DATA_PEDIDOS, UPDATE_ORDER, PRODUCE_ORDER, DELETE_ORDER, TAKE_ORDER } from "@/graphql";

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

  return (
    <Dashboard>
      here
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
        </TabList>

        <TabPanels>
          <TabPanel>
            {loading ? (
              <SkeletonLoader />
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

                <OrdersTable
                  id="orders"
                  deleteOrder={deleteOrder}
                  executeOrder={executeOrder}
                  produceOrder={produceOrder}
                  data={data.orders.filter((i) => i.delivery_status === false)}
                />
              </>
            )}
          </TabPanel>
          <TabPanel>
            {loading ? (
              <SkeletonLoader />
            ) : (
              <OrdersTable
                id="orders-done"
                deleteOrder={deleteOrder}
                executeOrder={executeOrder}
                produceOrder={produceOrder}
                data={data.orders.filter((i) => i.delivery_status === true)}
              />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Dashboard>
  );
};

export default pedidos;
