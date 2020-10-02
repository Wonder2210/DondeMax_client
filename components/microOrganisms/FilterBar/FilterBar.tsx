import React from "react";
import { Box } from "@chakra-ui/core";
import { useMediaQuery } from "react-responsive";
import WideScreen from "./WideScreen";
import MobileScreen from "./MobileScreen";
import { props } from "./types";

const FilterBar: React.FC<props> = ({ preservations, types }) => {
  const isTabletOrPc = useMediaQuery({
    minDeviceWidth: 768,
  });
  const isMobile = useMediaQuery({
    maxDeviceWidth: 768,
  });

  return (
    <Box w="100%" position="sticky" zIndex={2} top={0}>
      {isTabletOrPc && <WideScreen preservations={preservations} types={types} />}
      {isMobile && <MobileScreen preservations={preservations} types={types} />}
    </Box>
  );
};

export default FilterBar;
