import * as React from "react";
import { Box } from "@chakra-ui/core";
import { Navbar } from "../components/molecules/Navbar";
import { Split } from "../components/layouts/Split";

const index = () => {
  return (
    <>
      <Navbar />
      <Split>
        <Box bg="rgb(255,0,0)" w="100%" h="100%" />
        <Box bg="rgb(255,100,0)" w="100%" h="100%" />
      </Split>
    </>
  );
};

export default index;
