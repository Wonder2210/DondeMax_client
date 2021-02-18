import * as React from "react";
import { Box, Flex, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import ReactStars from "react-rating-stars-component";
import { TableActions } from "../../molecules/ActionButtons";
import { Header, Parragraph } from "../../atoms/Text";
import { ImageHeader } from "../../atoms/CardPieces";

type props = {
  info: string;
  type: string;
  available: boolean;
  image: string;
  price: string;
  name: string;
  timesValued: number;
  rating: number;
  onUpdate: () => void;
  onDelete: () => void;
  onStatus: () => void;
};

const ProductCard: React.FC<props> = ({ name, image, timesValued, rating, price, info, type, onUpdate, onDelete }) => {
  return (
    <Box
      margin="1em"
      maxWidth={{
        base: "auto",
        sm: "auto",
        md: "20em",
        lg: "20em",
        xl: "20em",
      }}
    >
      <ImageHeader alt={name} src={image} height="auto" width="100%" maxHeight="21.875em" />
      <Box margin="0.5em .5em 0 0.5em">
        <Header type="h6" weight="semibold" fontSize="1.8em">
          {name}
        </Header>

        <Flex alignItems="center">
          <ReactStars value={rating} count={5} edit={false} size={24} isHalf activeColor="#ffd700" />{" "}
          <span
            style={{
              marginLeft: ".5em",
            }}
          >
            {timesValued} Valoraciones
          </span>
        </Flex>
        <Parragraph fontSize="0.8em" textAlign="left">
          {info}
        </Parragraph>
        <Flex justifyContent="space-between" alignItems="center">
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
