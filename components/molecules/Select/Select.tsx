/* eslint-disable react/jsx-wrap-multilines */
import React, { FormEvent } from "react";
import { Box, Menu, MenuOptionGroup, MenuItemOption, MenuList, MenuButton, Flex } from "@chakra-ui/core";
import { Icon } from "@iconify/react";
import ChevronBottom from "@iconify/icons-dashicons/arrow-down-alt2";
import ChevronUp from "@iconify/icons-dashicons/arrow-up-alt2";
import { IconButton } from "../../atoms/Buttons";
import { TextInput } from "../../atoms/Inputs";

export const SelectOption = MenuItemOption;

type stringOrNumber = number | string;
const SelectCustom: React.FC<{
  show: boolean;
  placeholder: string;
  toggle: (e: boolean) => void;
  onChange: ((event: FormEvent<any>) => void) & ((value: stringOrNumber) => void);
  value: string;
  cart?: number;
}> = ({ children, placeholder, value, toggle, show, onChange }) => {
  return (
    <Box position="relative" marginTop="em" overflow="hidden hidden visible hidden" width="300px">
      <Box position="relative">
        <TextInput
          border="0.75px rgb(209,209,209) solid"
          borderRadius={show ? "17.5px 0 0 0" : "35px 0 0 35px"}
          margin="0 -5px 0 0 "
          placeholder={placeholder}
          value={value}
          readonly
          right={
            <IconButton
              aria-label="dropdown=icon"
              backgroundColor="#E91E63"
              margin={0}
              _hover={{}}
              width="100%"
              height="110%"
              borders={["0", "35px"]}
              icon={<Icon icon={show ? ChevronUp : ChevronBottom} color="#FFF" />}
              onClick={() => toggle(!show)}
            />
          }
        />
      </Box>
      <Box position="relative" left="0" width="86%">
        <Menu isOpen={show} width="100%">
          <MenuButton display="none" />
          <MenuList
            borderWidth="0.75px"
            zIndex={3}
            borderColor="rgb(209,209,209)"
            width="100%"
            roundedBottom="35px"
            borderTop="0"
          >
            <MenuOptionGroup type="radio" onChange={onChange}>
              {children}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default SelectCustom;
