import React from "react";
import { Box } from "@chakra-ui/core";
import { useMediaQuery } from "react-responsive";
import WideScreen from "./WideScreen";
import MobileScreen from "./MobileScreen";

const FilterBar = () => {
  const [toggle, setToggle] = React.useState({
    first: false,
    second: false,
  });
  const [value, setValue] = React.useState({
    first: "",
    second: "",
  });
  const isTabletOrPc = useMediaQuery({
    minDeviceWidth: 768,
  });
  const isMobile = useMediaQuery({
    maxDeviceWidth: 768,
  });
  return (
    <Box w="100%" position="sticky" top={0}>
      {isTabletOrPc && (
        <WideScreen
          onChange1={(e) => setValue((last) => ({ ...last, first: e }))}
          onChange2={(e) => setValue((last) => ({ ...last, second: e }))}
          show1={toggle.first}
          show2={toggle.second}
          toggle1={() => setToggle((last) => ({ ...last, first: !last.first }))}
          toggle2={() => setToggle((last) => ({ ...last, second: !last.second }))}
          value1={value.first}
          value2={value.second}
        />
      )}
      {isMobile && (
        <MobileScreen
          onChange1={(e) => setValue((last) => ({ ...last, first: e }))}
          onChange2={(e) => setValue((last) => ({ ...last, second: e }))}
          show1={toggle.first}
          show2={toggle.second}
          toggle1={() => setToggle((last) => ({ ...last, first: !last.first }))}
          toggle2={() => setToggle((last) => ({ ...last, second: !last.second }))}
          value1={value.first}
          value2={value.second}
        />
      )}
    </Box>
  );
};

export default FilterBar;
