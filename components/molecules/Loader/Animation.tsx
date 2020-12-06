import React from "react";
import { Flex } from "@chakra-ui/core";
import { motion } from "framer-motion";

const Animation = () => {
  return (
    <Flex alignItems="center" justifyContent="center" width="75%" margin="auto" height="80vh" flexDirection="column">
      <motion.div
        style={{ originY: 1, margin: "auto" }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.8, 1, 0.8, 0.6] }}
        transition={{ duration: 2.2, loop: "Infinity" }}
      >
        <img
          src="/images/cupcakke.svg"
          width="100%"
          style={{
            transform: "translateX(10%)",
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          height="auto"
          alt="loader"
        />
      </motion.div>
    </Flex>
  );
};

export default Animation;
