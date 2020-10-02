import React from "react";
import { Flex, Box } from "@chakra-ui/core";
import { Icon } from "@iconify/react";
import Split from "./Split";
import { SubHeader } from "../../atoms/Text";
import { IconButton } from "../../atoms/Buttons";
import Whatsapp from "@iconify/icons-cib/whatsapp";
import Instagram from "@iconify/icons-cib/instagram";

export const BasicTest = () => {
  return (
    <Split>
      <h1>Here</h1>
      <h1>There</h1>
    </Split>
  );
};

export const ProdTest = () => {
  return (
    <Split>
      <Box
        as="div"
        bg="rgb(255,0,0)"
        width="100%"
        h="100vh"
        backgroundImage="url('https://images.unsplash.com/photo-1551879400-111a9087cd86?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80')"
        backgroundPosition="left"
        backgroundSize="cover"
      >
        <Flex
          position="absolute"
          w="100%"
          justify="center"
          align="center"
          bottom="0"
          height="10vh"
          backgroundColor="rose.700"
        >
          <SubHeader>Contactanos a traves de</SubHeader>
          <IconButton
            aria-label="heart"
            backgroundColor="rgba(0,0,0,0)"
            color="black"
            icon={<Icon icon={Whatsapp} width="1.563rem" height="1.5rem" />}
          />
          <IconButton
            aria-label="heart"
            backgroundColor="rgba(0,0,0,0)"
            color="black"
            icon={<Icon icon={Instagram} width="1.563rem" height="1.5rem" />}
          />
        </Flex>
      </Box>
      <Box bgColor="tomato" w="100%" h="100%"></Box>
    </Split>
  );
};

export default {
  title: "Layouts/Split",
};
