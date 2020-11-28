import * as React from "react";
import { Flex } from "@chakra-ui/core";
import { Navbar } from "@/organisms/Navbar";
import { RightSide, LeftSide } from "@/organisms/IndexOrganisms";
import Head from "next/head";

const index = () => {
  return (
    <>
     <Head>
            <title>Donde Max - Inicio</title>
            </Head>
      <Navbar />
      <Flex position="fixed" width="100%" height="100vh">
        <LeftSide />
        <RightSide />
      </Flex>
    </>
  );
};

export default index;
