import React from "react";
import { Box } from "@chakra-ui/core";
import { Navbar } from "../../organisms/Navbar";
import { Footer } from "../../organisms/Footer";

const Standard = ({ children }) => {
  return (
    <Box w="100%" h="100vh" overflowY="auto" overflowX="hidden" position="fixed">
      <Navbar />
      {children}
      <Footer />
    </Box>
  );
};

export default Standard;
