import * as React from "react";
import {
  Flex,
  Select,
  NumberInput,
  NumberInputField,
  FormLabel,
  Stat,
  StatNumber,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
} from "@chakra-ui/core";
import { Icon } from "@iconify/react";
import Plus from "@iconify/icons-cil/plus";
import { IconButton } from "../Buttons";

type props = {
  options: Array<{ id: number; type: string; price: number }>;
  placeholder: string;
  variant?: string;

  focusBorderColor?: string;
  add?: (e: { id: number; name: string; quantity: number; price: number; total: number }) => void;
};

const DynamicType: React.FC<props> = ({ options, focusBorderColor, add, placeholder, variant }) => {
  const baseState = {
    name: null,
    id: null,
    quantity: 1,
    price: null,
    total: 0,
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
  const currentProduct = options.find((i) => i.id === state.id);
  const onChangeNumber = (e) =>
    setState((lstState) => ({
      ...lstState,
      quantity: e,
      total: e * lstState.price,
    }));
  const onChangeSelect = (e) => {
    const { value } = e.currentTarget;
    setState((lstState) => ({
      ...lstState,
      name: options.find((i) => i.id == Number(value)).type,
      id: value,
      price: options.find((i) => String(i.id) == value).price,
      total: Number(options.find((i) => String(i.id) == value).price) * lstState.quantity,
    }));
  };

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
          maxW="3em"
          min={1}
          defaultValue={1}
          value={state.quantity ?? 0}
          variant={variant}
          focusBorderColor={focusBorderColor}
          onChange={onChangeNumber}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Stat marginX="0.5em">
          <StatNumber>{state.total}$</StatNumber>
        </Stat>
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
