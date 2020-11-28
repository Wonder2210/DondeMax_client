import React from "react";
import { Flex, Box } from "@chakra-ui/core";
import { Header, Parragraph } from "@/atoms/Text";
import { Standard } from "@/layouts/Standard";
import { ContactUs } from "@/organisms/Forms";
import Head from "next/head";

const Info = () => {
  return (
    <Standard>
         <Head>
            <title>Acerca de nosotros</title>
            </Head>
      <Flex
        justify="center"
        width="100%"
        align="center"
        height="85%"
        backgroundImage="url('/images/cupcakes-inline.jpg')"
        backgroundPosition="center"
        backgroundSize="cover"
      >
        <Header color="#E91E63">¿Quienes somos?</Header>
      </Flex>
      <Flex>
        <Flex
          justify="flex-start"
          align="center"
          direction="column"
          width={{ sm: "100%", md: "100%", lg: "50%", xl: "50%" }}
          height="100vh"
          paddingTop="6em"
          bgColor="#EDB3C7"
        >
          <Header color="#E5E6E2">Mision</Header>
          <br />
          <br />
          <br />
          <br />
          <Parragraph color="#E5E6E2" height="auto">
            Entregar a los compradores una grata atencion y productos de gran calidad a un precio accesible
          </Parragraph>
        </Flex>
        <Box
          bg="rgb(255,0,0)"
          w="50%"
          display={{ sm: "none", md: "none", lg: "block", xl: "block" }}
          h="100vh"
          backgroundImage="url('/images/mision.jpg')"
          backgroundPosition="center"
          backgroundSize="cover"
        />
      </Flex>
      <Flex>
        <Box
          bg="rgb(255,0,0)"
          w="50%"
          display={{ sm: "none", md: "none", lg: "block", xl: "block" }}
          h="100vh"
          backgroundImage="url('/images/vision.jpg')"
          backgroundPosition="center"
          backgroundSize="cover"
        />
        <Flex
          justify="flex-start"
          align="center"
          direction="column"
          width={{ sm: "100%", md: "100%", lg: "50%", xl: "50%" }}
          height="100vh"
          paddingTop="6em"
          bgColor="#E7CFA4"
        >
          <Header color="#E5E6E2">Vision</Header>
          <br />
          <br />
          <br />
          <br />
          <Parragraph color="#E5E6E2" height="auto">
            LLegar a mas clientes que puedan disfrutar de nuestros productos y la calidad del servicio
          </Parragraph>
        </Flex>
      </Flex>
      <Flex direction={{ sm: "column", md: "column", lg: "row", xl: "row" }}>
        <Flex width={{ base:"0%", sm: "0%", md: "100%", lg: "50%", xl: "50%" }}
        left={{ base:"-100%", sm: "-100%", md: "0", lg: "0", xl: "0" }}
        position={{ base:"absolute", sm: "absolute", md: "relative", lg: "relative", xl: "relative" }}  minHeight="70vh" align="center" justify="center">
          <ContactUs />
        </Flex>
        <Flex
          bgColor="#FC913C"
          justify="flex-start"
          align="center"
          direction="column"
          width={{ sm: "100%", md: "100%", lg: "50%", xl: "50%" }}
          height="100vh"
          paddingTop="6em"
        >
          <Header color="#E5E6E2">Visitanos</Header>
          <br />
          <br />
          <br />
          <Parragraph color="#E5E6E2" height="auto">
            Lunes - Sabados: 7am -7pm
          </Parragraph>
          <Parragraph color="#E5E6E2" height="auto">
            Zorca , Sector el Bosque , Diagonal al preescolar Tarabay, Municipio Independecia
          </Parragraph>
        </Flex>
      </Flex>
    </Standard>
  );
};

export default Info;
