import React from "react";
import { Text, Box } from "@chakra-ui/core";

const Parragraph = ({ children }) => {
  return (
    <Box position="relative" width="50%" height="100%">
      <Text height="100%" width="50%" position="relative" size="xs" textAlign="center">
        {children}
      </Text>
    </Box>
  );
};

export default Parragraph;
