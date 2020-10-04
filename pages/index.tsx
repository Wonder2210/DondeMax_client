/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
import * as React from "react";
import { Flex } from "@chakra-ui/core";
import { Navbar } from "../components/microOrganisms/Navbar";
import { RightSide, LeftSide } from "../components/microOrganisms/IndexOrganisms";

const index = () => {
  return (
    <>
      <Navbar />
      <Flex>
        <LeftSide />
        <RightSide />
      </Flex>
    </>
  );
};

export default index;
