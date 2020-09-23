import React from "react";
import { Flex } from "@chakra-ui/core";
import { ShoppingCart } from "../../atoms/Buttons";

import { SelectCustom, SelectOption } from "../../molecules/Select";
import { props } from "./types";

const WideScreen = ({ preservations, types }: props) => {
  const PreservationsOptions = preservations.list.map((i) => {
    return <SelectOption value={i.type}>{i.type}</SelectOption>;
  });
  const TypesOptions = types.list.map((i) => {
    return <SelectOption value={i.type}>{i.type}</SelectOption>;
  });
  return (
    <Flex
      zIndex={1}
      justifyContent="space-between"
      flexDirection="row"
      width="100%"
      height="62px"
      top="0"
      backgroundColor="#2F4858"
    >
      <Flex justify="space-evenly" align="center" flexDirection="row" left="0" width="60%">
        <SelectCustom
          value={preservations.value}
          onChange={preservations.onChange}
          toggle={preservations.toggle}
          placeholder="Preservacion"
          show={preservations.show}
        >
          {PreservationsOptions}
        </SelectCustom>
        <SelectCustom
          value={types.value}
          onChange={types.onChange}
          toggle={types.toggle}
          placeholder="Tipo"
          show={types.show}
        >
          {TypesOptions}
        </SelectCustom>
      </Flex>

      <Flex marginRight="1vw" position="relative" align="center" flexDirection="row" w="20%" justify="flex-end">
        <ShoppingCart itemsCount={0} color="#fff" />
      </Flex>
    </Flex>
  );
};

export default WideScreen;
