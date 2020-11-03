import * as React from "react";
import { Flex, Box } from "@chakra-ui/core";
import { Login } from "@/organisms/Forms";

const login = () => {
  return (
    <Flex width="100%" height="100vh">
      <Box
        bgImage="url('/images/login.jpg')"
        bgPosition="center"
        bgSize="cover"
        width={{ base: "0", sm: "0", md: "30%", lg: "30%", xl: "30%" }}
        height="100vh"
      />
      <Flex width={{ base: "100%", sm: "100%", md: "70%", lg: "70%", xl: "70%" }} align="center" justify="center">
        <Login />
      </Flex>
    </Flex>
  );
};

export default login;
