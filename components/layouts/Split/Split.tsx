import * as React from "react";
import { Box } from "@chakra-ui/core";
import { useMediaQuery } from "react-responsive";

const Split: React.FC = ({ children }) => {
  const isPcOrLaptop = useMediaQuery({
    minDeviceWidth: 960,
  });
  return (
    <Box w="100%" h="100vh" position="relative">
      {isPcOrLaptop && (
        <>
          <Box h="100vh" position="absolute" left="0" w="50%">
            {children[0]}
          </Box>
          <Box h="100vh" right="0" w="50%" position="absolute">
            {children[1]}
          </Box>
        </>
      )}
      {!isPcOrLaptop && (
        <>
          <Box h="100vh" w="100%" position="absolute">
            {children[1]}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Split;
