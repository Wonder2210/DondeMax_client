import * as React from "react";
import { Box, Flex, Stat, StatLabel, StatNumber } from "@chakra-ui/core";
import { TableActions } from "../../molecules/ActionButtons";
import { IconButton } from "../../atoms/Buttons";
import { Header, SubHeader, Parragraph } from "../../atoms/Text";
import { ImageHeader } from "../../atoms/CardPieces";
import { Icon } from "@iconify/react";
import check from "@iconify/icons-cil/check";
import x from "@iconify/icons-cil/x";

type props = {
  name: string;
  image: string;
  info: string;
  onUpdate: () => void;
  onDelete: () => void;
  onStatus: () => void;
  type: string;
  price: string;
  big: boolean;
  available: boolean;
};

const ProductCard: React.FC<props> = ({
  name,
  image,
  price,
  onStatus,
  info,
  type,
  onUpdate,
  onDelete,
  big,
  available,
}) => {
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
          {available ? (
            <IconButton
              aria-label="disponible"
              onClick={onStatus}
              icon={<Icon color="black" icon={check} />}
              backgroundColor="lime"
            />
          ) : (
            <IconButton
              aria-label="disponible"
              onClick={onStatus}
              icon={<Icon color="black" icon={x} />}
              backgroundColor="rgb(255,10,10)"
            />
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default ProductCard;
