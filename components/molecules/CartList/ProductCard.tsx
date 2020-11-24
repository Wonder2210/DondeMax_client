import React from "react";
import {
  Flex,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
} from "@chakra-ui/core";
import { IconButton } from "../../atoms/Buttons";
import { SubHeader } from "../../atoms/Text";
import { Icon } from "@iconify/react";
import minus from "@iconify/icons-cil/minus";

type props = {
  image: string;
  name: string;
  price: number;
  total: number;
  onChange: (str: string, e: number) => void;
  uniteds: number;
  remove: () => void;
};

const ProductCard: React.FC<props> = ({ image, name, price, total, uniteds, onChange, remove }) => {
  return (
    <Flex boxShadow="2xl" marginTop="2em" alignItems="center" position="relative">
      <Box position="absolute" top={0} right={2}>
        <IconButton
          width="1em"
          height="1em"
          backgroundColor="black"
          aria-label="remove"
          onClick={remove}
          icon={<Icon icon={minus} color="white" />}
        />
      </Box>
      <Image borderRadius="11px" width="6em" maxHeight="6.5em" src={image} />
      <Flex marginLeft="1em" direction="column">
        <SubHeader>{name}</SubHeader>
        <p>
          Precio: <strong>{price}$</strong>
        </p>
        <p>
          Total: <strong>{total}$</strong>
        </p>
        <Flex alignItems="center" marginY="0.5em">
          <p>Unidades:</p>
          <NumberInput
            size="sm"
            maxWidth="6em"
            onChange={onChange}
            marginLeft="0.5em"
            defaultValue={uniteds}
            min={1}
            max={12}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductCard;
