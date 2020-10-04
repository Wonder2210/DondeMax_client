import * as React from "react";
import { Flex, Box } from "@chakra-ui/core";
import { Icon } from "@iconify/react";
import Whatsapp from "@iconify/icons-cib/whatsapp";
import Instagram from "@iconify/icons-cib/instagram";
import { IconButton } from "../../atoms/Buttons";
import { SubHeader } from "../../atoms/Text";

const LeftSide = () => {
  return (
    <Box
      bg="rgb(255,0,0)"
      width="100%"
      h="100vh"
      backgroundImage="url('/images/cake-roses-stand.jpg')"
      backgroundPosition="left"
      backgroundSize="cover"
      position="relative"
      display={{ sm: "none", md: "none", lg: "block", xl: "block" }}
    >
      <Flex
        position="absolute"
        w="100%"
        justify="center"
        align="center"
        bottom="0"
        height="10vh"
        backgroundColor="#E91E63"
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
  );
};

export default LeftSide;
