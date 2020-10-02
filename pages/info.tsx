import React from "react";
import { Flex, Box } from "@chakra-ui/core";
import { Header } from "../components/atoms/Text";
import Standard from "../components/layouts/Standard/Standard";
import { Split } from "../components/layouts/Split";

const Info = () => {
  return (
    <Standard>
      <Flex justify="center" width="100%" align="center" height="75%">
        <Header>Catalogo</Header>
      </Flex>
      <Split>
        <Flex justify="center" align="center" width="100%" height="100%">
          <Header>Mision</Header>
        </Flex>
        <Box
          bg="rgb(255,0,0)"
          w="100%"
          h="100%"
          backgroundImage="url('/images/mision.jpg')"
          backgroundPosition="center"
          backgroundSize="cover"
        />
      </Split>
      <Split>
        <Box
          bg="rgb(255,0,0)"
          w="100%"
          h="100%"
          backgroundImage="url('/images/vision.jpg')"
          backgroundPosition="center"
          backgroundSize="cover"
        />
        <Flex justify="center" align="center" width="100%" height="100%">
          <Header>Vision</Header>
        </Flex>
      </Split>
    </Standard>
  );
};

export default Info;
