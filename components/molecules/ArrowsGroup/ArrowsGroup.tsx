import React from "react";
import { Flex } from "@chakra-ui/core";
import { Icon } from "@iconify/react";
import RightArrow from "@iconify/icons-cil/arrow-circle-right";
import LeftArrow from "@iconify/icons-cil/arrow-circle-left";
import { IconButton } from "../../atoms/Buttons";

const ArrowsGroup = ({ next, previous }) => {
  return (
    <Flex direction="row" bottom="0" right="10%" justify="space-between" position="absolute">
      <IconButton
        aria-label="Left arrow"
        onClick={() => previous()}
        borders={["50%", "50%"]}
        icon={() => <Icon icon={LeftArrow} height="100%" width="100%" />}
      />
      <IconButton
        aria-label="Right arrow"
        onClick={() => next()}
        borders={["50%", "50%"]}
        icon={() => <Icon icon={RightArrow} height="100%" width="100%" />}
      />
    </Flex>
  );
};

export default ArrowsGroup;
