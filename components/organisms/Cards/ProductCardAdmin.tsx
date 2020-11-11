import * as React from "react";
import { Box, Flex, Stat, StatLabel, StatNumber } from "@chakra-ui/core";
import { TableActions } from "../../molecules/ActionButtons";
import { Header, SubHeader, Parragraph } from "../../atoms/Text";
import { ImageHeader } from "../../atoms/CardPieces";

type props = {
  name: string;
  image: string;
  info: string;
  onUpdate: () => void;
  onDelete: () => void;
  type: string;
  price: string;
  big: boolean;
};

const ProductCard: React.FC<props> = ({ name, image, price, info, type, onUpdate, onDelete, big }) => {
  return (
    <Box gridColumn={big && "span 2"} margin="1em">
      <ImageHeader maxHeight="50vh" alt={name} src={image} height="auto" width="100%" />
      <Box margin="0 10%">
        <Header type="h6" weight="semibold" fontSize="1.5em">
          Here
        </Header>
        <SubHeader fontSize="1em">{type}</SubHeader>
        <Parragraph fontSize="0.8em" textAlign="left">
          {info}
        </Parragraph>
        <Flex alignItems="center" justify="space-between">
          <Stat>
            <StatLabel>Precio</StatLabel>
            <StatNumber>{price}$</StatNumber>
          </Stat>
          <TableActions onUpdate={onUpdate} onDelete={onDelete} />
        </Flex>
      </Box>
    </Box>
  );
};

export default ProductCard;
