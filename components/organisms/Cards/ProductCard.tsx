/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Link from "next/link";
import { Box, Stat, StatNumber, Flex } from "@chakra-ui/core";
import ReactStars from "react-rating-stars-component";
import { Header } from "../../atoms/Text";
import { ImageHeader } from "../../atoms/CardPieces";

type props = {
  src: string;
  alt: string;
  price: string;
  name: string;
  id: number;
  height?: string;
  width?: string;
  timesValued: number;
  rating: number;
};

const ProductCard: React.FC<props> = ({ src, id, name, timesValued, rating, alt, price }) => {
  return (
    <Box
      margin="1em"
      maxWidth={{
        base: "auto",
        sm: "auto",
        md: "20em",
      }}
    >
      <ImageHeader alt={alt} src={src} height="auto" width="100%" maxHeight="min(40vh , 21.875em)" />
      <Box margin="0.5em .5em 0 0.5em">
        <Link href={`/products/${name}?id=${id}`} passHref>
          <a>
            <Header type="h6" weight="semibold" fontSize="1.8em">
              {name}
            </Header>
          </a>
        </Link>
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
        <Flex justifyContent="space-between" alignItems="center">
          <Stat>
            <StatNumber>{price}</StatNumber>
          </Stat>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProductCard;
