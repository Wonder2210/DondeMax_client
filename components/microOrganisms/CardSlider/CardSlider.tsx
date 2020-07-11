import React from "react";
import AwesomeSlider from "react-awesome-slider";
import { Box } from "@chakra-ui/core";
import InitialCard from "../../molecules/Cards/InitialCard";

import "react-awesome-slider/dist/styles.css";

const CardSlider = () => {
  return (
    <Box width="100%" minH="15vh" display="relative">
      <AwesomeSlider buttons={false}>
        <InitialCard
          alt="image of test"
          href="/"
          src="http://t1.gstatic.com/images?q=tbn:ANd9GcQi47DaoMOT1DeSAaahfQDaxs6AS5HZRMcMTLW_kh_M8dD9_P2yuaWkOdc90e4xcd35zEyyT1dN5o_wWBT1blQ"
        >
          Here we are
        </InitialCard>
        <InitialCard
          alt="image of test"
          href="/"
          src="http://t1.gstatic.com/images?q=tbn:ANd9GcQi47DaoMOT1DeSAaahfQDaxs6AS5HZRMcMTLW_kh_M8dD9_P2yuaWkOdc90e4xcd35zEyyT1dN5o_wWBT1blQ"
        >
          Here we are
        </InitialCard>
      </AwesomeSlider>
    </Box>
  );
};

export default CardSlider;
