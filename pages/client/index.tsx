/* eslint-disable no-nested-ternary */
import * as React from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Box, Flex, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { NavbarClient } from "@/organisms/Navbar";
import { OrdersCustomerTable } from "@/organisms/Table";
import SkeletonLoader from "@/molecules/Loader/SkeletonLoader";
import Head from "next/head";
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
  }
`;

const index = () => {
  const { customer, addPhone } = useAuth();
  const router = useRouter();
  const { locale } = router;

  const { data, loading } = useQuery(query, {
    variables: { id: customer.id },
    onCompleted: (res) => console.log(data.client),
    onError: (e) => {
      console.log(JSON.stringify(e));
    },
  });

  return (
    <Box position="fixed" w="100%" h="100vh">
      <Head>
        <title>Cliente - pedidos</title>
      </Head>
      <NavbarClient />
      <Flex display="row" align="flex-start" marginX="3.5em" justifyContent="center" marginY="3em">
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
              {loading ? <SkeletonLoader /> : <OrdersCustomerTable data={data.client.orders.pending} id="pending" />}
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
