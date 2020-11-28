import React from "react";
import { Flex, useDisclosure, Box, Grid, Stat, StatNumber } from "@chakra-ui/core";
import { useQuery, gql } from "@apollo/client";

import { SubHeader, Header } from "@/atoms/Text";

import { Dashboard } from "@/layouts/Dashboard";
import Head from "next/head";
const GET_BASE_PRODUCTS = gql`
  query Get {
    orders {
      id
    }
    users {
      id
    }
    clients {
      id
    }
    productsRaw {
      id
    }
    providers {
      id
    }
  }
`;

const index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error, loading } = useQuery(GET_BASE_PRODUCTS, { variables: { cursor: 0 } });

  if (loading) {
    return <h1>Cargando ... </h1>;
  }

  return (
    <Dashboard>
         <Head>
            <title>Admin - Inicio</title>
            </Head>
      <Flex height="5em" justifyContent="space-between" alignItems="center">
        <SubHeader>Bienvenido</SubHeader>
      </Flex>
      {loading ? (
        "Cargando ..."
      ) : (
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" templateRows="minmax(300px, auto)" heigh="70vh">
          <Box bgColor="" boxShadow="xl">
            <Flex>
              <Header fontSize="1.5em">
                Pedidos <br /> Tomados
              </Header>
              <Stat>
                <StatNumber fontSize="4em" fontWeight="700" color="colors.rose.600">
                  {data.orders.length}
                </StatNumber>
              </Stat>
            </Flex>
          </Box>
          <Box bgColor="" boxShadow="xl">
            <Flex>
              <Header fontSize="1.5em">
                Usuarios <br /> Registrado
              </Header>
              <Stat>
                <StatNumber fontSize="4em" fontWeight="700" color="colors.rose.600">
                  {data.users.length}
                </StatNumber>
              </Stat>
            </Flex>
          </Box>
          <Box bgColor="" boxShadow="xl">
            <Flex>
              <Header fontSize="1.5em">
                Clientes <br /> Registrados
              </Header>
              <Stat>
                <StatNumber fontSize="4em" fontWeight="700" color="colors.rose.600">
                  {data.clients.length}
                </StatNumber>
              </Stat>
            </Flex>
          </Box>
          <Box bgColor="" boxShadow="xl">
            <Flex>
              <Header fontSize="1.5em">
                Productos <br /> disponibles
              </Header>
              <Stat>
                <StatNumber fontSize="4em" fontWeight="700" color="colors.rose.600">
                  {data.productsRaw.length}
                </StatNumber>
              </Stat>
            </Flex>
          </Box>
          <Box bgColor="" boxShadow="xl">
            <Flex>
              <Header fontSize="1.5em">
                Proveedores <br /> Registrados
              </Header>
              <Stat>
                <StatNumber fontSize="4em" fontWeight="700" color="colors.rose.600">
                  {data.providers.length}
                </StatNumber>
              </Stat>
            </Flex>
          </Box>
        </Grid>
      )}
    </Dashboard>
  );
};

export default index;
