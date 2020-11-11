import * as React from "react";
import { Flex, Select, NumberInput, NumberInputField, FormLabel } from "@chakra-ui/core";
import { Icon } from "@iconify/react";
import Plus from "@iconify/icons-cil/plus";
import { IconButton } from "../Buttons";

type props = {
  options: Array<{ id: number; type: string }>;
  placeholder: string;
  variant?: string;
  focusBorderColor?: string;
  add?: (e: { id: string; quantity: string }) => void;
};

const DynamicType: React.FC<props> = ({ options, focusBorderColor, add, placeholder, variant }) => {
  const baseState = {
    name: null,
    id: null,
    quantity: null,
  };
  const [state, setState] = React.useState({ ...baseState });

  const addBtn = () => {
    add(state);
    setState({ ...baseState });
  };

  const optionsRender = options.map((item) => {
    return (
      <option key={item.id} value={String(item.id)}>
        {item.type}
      </option>
    );
  });

  const onChangeSelect = (e) =>
    setState((lstState) => ({
      ...lstState,
      name: options.find((i) => String(i.id) == e.target.value).type,
      id: e.target.value,
    }));

  return (
    <>
      <FormLabel>Materiales</FormLabel>

      <Flex alignItems="center">
        <Select
          placeholder={placeholder}
          variant={variant}
          size="sm"
          focusBorderColor={focusBorderColor}
          onChange={onChangeSelect}
        >
          {optionsRender}
        </Select>
        <NumberInput
          value={state.quantity ?? 0}
          size="sm"
          variant={variant}
          focusBorderColor={focusBorderColor}
          onChange={(e) => setState((lstState) => ({ ...lstState, quantity: e }))}
        >
          <NumberInputField />
        </NumberInput>
        <IconButton
          aria-label="add-more"
          backgroundColor="#FC913C"
          onClick={addBtn}
          icon={<Icon icon={Plus} color="white" />}
        />
      </Flex>
    </>
  );
};

export default DynamicType;
