import React from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Navbar } from "../../organisms/Navbar";
import { Footer } from "../../organisms/Footer";

const Standard = ({ children }) => {
  return (
    <motion.div
      initial="pageInitial"
      animate="pageAnimate"
      variants={{
        pageInitial: {
          opacity: 0,
        },
        pageAnimate: {
          opacity: 1,
        },
      }}
    >
      <Box w="100%" h="100vh" overflowY="auto" overflowX="hidden" position="fixed">
        <Navbar />
        {children}
        <Footer />
      </Box>
    </motion.div>
  );
};

export default Standard;
