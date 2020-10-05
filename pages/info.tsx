import React from "react";
import { Flex, Box } from "@chakra-ui/core";
import { Header } from "../components/atoms/Text";
import { Standard } from "../components/layouts/Standard";

const Info = () => {
  return (
    <Standard>
      <Flex
        justify="center"
        width="100%"
        align="center"
        height="75%"
        backgroundImage="url('/images/cupcakes-inline.jpg')"
        backgroundPosition="center"
        backgroundSize="cover"
      >
        <Header>Catalogo</Header>
      </Flex>
      <Flex>
        <Flex justify="center" align="center" width={{ sm: "100%", md: "100%", lg: "50%", xl: "50%" }} height="100vh">
          <Header>Mision</Header>
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
        <Flex justify="center" align="center" width={{ sm: "100%", md: "100%", lg: "50%", xl: "50%" }} height="100vh">
          <Header>Vision</Header>
        </Flex>
      </Flex>
    </Standard>
  );
};

export default Info;
