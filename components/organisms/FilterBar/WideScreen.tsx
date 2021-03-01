import React from "react";
import { Flex } from "@chakra-ui/react";
import { CartList } from "../CartList";

import { SelectCustom, SelectOption } from "../../molecules/Select";
import { props } from "./types";

const WideScreen = ({ preservations, types }: props) => {
  const PreservationsOptions = preservations.list.map((i) => {
    return (
      <SelectOption key={i.id} value={i.type}>
        {i.type}
      </SelectOption>
    );
  });
  const TypesOptions = types.list.map((i) => {
    return (
      <SelectOption key={i.id} value={i.type}>
        {i.type}
      </SelectOption>
    );
  });
  return (
    <Flex
      zIndex={1}
      justifyContent="flex-end"
      flexDirection="row"
      width="100%"
      height="62px"
      top="0"
      backgroundColor="#2F4858"
    >
      <Flex marginRight="1vw" position="relative" align="center" flexDirection="row" w="20%" justify="flex-end">
        <CartList lang={"es"}/>
      </Flex>
    </Flex>
  );
};

export default WideScreen;
