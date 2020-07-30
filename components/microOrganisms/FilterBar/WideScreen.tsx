import React, { FormEvent } from "react";
import { Flex } from "@chakra-ui/core";
import { ShoppingCart } from "../../atoms/Buttons";

import { SelectCustom, SelectOption } from "../../molecules/Select";

type props = {
  show1: boolean;
  value1: string;
  toggle1: () => void;
  onChange1: (event: FormEvent<any>) => void & ((value: string & number) => void);
  show2: boolean;
  value2: string;
  toggle2: () => void;
  onChange2: (event: FormEvent<any>) => void & ((value: string & number) => void);
};

const WideScreen = ({ show1, show2, value1, value2, toggle1, onChange1, onChange2, toggle2 }) => {
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
          value={value1}
          onChange={onChange1}
          toggle={toggle1}
          placeholder="put here what you want"
          show={show1}
        >
          <SelectOption value="here">Here</SelectOption>
          <SelectOption value="option">There</SelectOption>
          <SelectOption value="last">everywhere</SelectOption>
        </SelectCustom>
        <SelectCustom
          value={value2}
          onChange={onChange2}
          toggle={toggle2}
          placeholder="put here what you want"
          show={show2}
        >
          <SelectOption value="here">Here</SelectOption>
          <SelectOption value="option">There</SelectOption>
          <SelectOption value="last">everywhere</SelectOption>
        </SelectCustom>
      </Flex>

      <Flex marginRight="1vw" position="relative" align="center" flexDirection="row" w="20%" justify="flex-end">
        <ShoppingCart itemsCount={0} color="#fff" />
      </Flex>
    </Flex>
  );
};

export default WideScreen;
