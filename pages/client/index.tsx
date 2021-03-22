/* eslint-disable no-nested-ternary */
import * as React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Box, Flex, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { NavbarClient } from "@/organisms/Navbar";
import { OrdersCustomerTable } from "@/organisms/Table";
import SkeletonLoader from "@/molecules/Loader/SkeletonLoader";
import Head from "next/head";
import { DELETE_ORDER } from "@/graphql";
import { useAuth } from "../../utils/AuthHook";

const AddPhone = dynamic(() => import("@/organisms/Forms/AddPhone"));

const query = gql`
  query client($id: Int = 0) {
    client(id: $id) {
      id
      name
      orders {
        pending {
          id
          payMethod: pay_method
          deliveryDate: delivery_date
          deliveryTime: delivery_time
          note
          production_status
          stage_status
          delivery_status
          abono
          total
          products {
            id
            quantity

            product {
              name
              precio
              image
            }
          }
        }
        delivered {
          id
          payMethod: pay_method
          deliveryDate: delivery_date
          deliveryTime: delivery_time
          note
          production_status
          stage_status
          delivery_status
          abono
          total
          products {
            id
            quantity
            product {
              name
              precio
              image
            }
          }
        }
      }
    }
  }
`;

const index = () => {
  const { customer, addPhone } = useAuth();
  const router = useRouter();
  const { locale } = router;

  const { data, loading, refetch } = useQuery(query, {
    variables: { id: customer.id },
    onCompleted: (res) => console.log(data.client),
    onError: (e) => {
      console.log(JSON.stringify(e));
    },
  });

  const [deleteOrder] = useMutation(DELETE_ORDER);

  const cancelOrder = (id: string) => {
    deleteOrder({ variables: { id: Number(id) } });
    refetch();
  };

  return (
    <Box position="fixed" w="100%" h="100vh">
      <Head>
        <title>Cliente - pedidos</title>
      </Head>
      <NavbarClient />
      <Flex
        display="row"
        align="flex-start"
        margin={{
          base: ".5em",
          md: "3.5em 3em",
        }}
        justifyContent="center"
      >
        {!customer.phone ?? (
          <AddPhone lang={locale} onSubmit={addPhone.addPhone} completed={addPhone.close} loading={addPhone.loading} />
        )}
        <Tabs>
          <TabList>
            <Tab>Activos</Tab>
            <Tab>Pendientes</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {loading ? (
                <SkeletonLoader />
              ) : (
                <OrdersCustomerTable cancelOrder={cancelOrder} data={data.client.orders.pending} id="done" />
              )}
            </TabPanel>
            <TabPanel>
              {loading ? <SkeletonLoader /> : <OrdersCustomerTable data={data.client.orders.delivered} id="pending" />}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Box>
  );
};

export default index;
