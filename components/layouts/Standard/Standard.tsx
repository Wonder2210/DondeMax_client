import React from "react";
import { Box } from "@chakra-ui/core";
import { Navbar } from "../../microOrganisms/Navbar";
import { Footer } from "../../microOrganisms/Footer";

const Standard = ({ children }) => {
  return (
    <Box w="100%" h="100vh">
      <Navbar />
      {children}
      <Footer />
    </Box>
  );
};

export default Standard;
