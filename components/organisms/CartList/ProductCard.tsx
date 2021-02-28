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
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import minus from "@iconify/icons-cil/minus";
import { IconButton } from "../../atoms/Buttons";
import { SubHeader } from "../../atoms/Text";
import Languages from "../../../locales";

type props = {
  image: string;
  name: string;
  lang: string;
  price: number;
  total: number;
  onChange: (str: string, e: number) => void;
  uniteds: number;
  remove: () => void;
};

const ProductCard: React.FC<props> = ({ image, name, price, lang, total, uniteds, onChange, remove }) => {
  const t = Languages(lang);
  return (
    <Flex
      // boxShadow={boxShadow ?? { base: "sm", sm: "2xl", md: "2xl", xl: "2xl", lg: "2xl" }}
      marginTop="2em"
      alignItems="center"
      position="relative"
      bgColor="white"
      borderRadius="22px"
      padding="0.5em"
    >
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
          {t.cart.price}: <strong>{price}$</strong>
        </p>
        <p>
          {t.cart.total}: <strong>{total}$</strong>
        </p>
        <Flex alignItems="center" marginY="0.5em">
          <p>{t.cart.uniteds}:</p>
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
