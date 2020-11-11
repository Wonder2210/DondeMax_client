import * as React from "react";
import { Flex } from "@chakra-ui/core";
import { Navbar } from "@/organisms/Navbar";
import { RightSide, LeftSide } from "@/organisms/IndexOrganisms";

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
