/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Link from "next/link";
import { Box, Stat, StatNumber, Flex, Button } from "@chakra-ui/react";
import ReactStars from "react-rating-stars-component";
import { Header } from "../../atoms/Text";
import { ImageHeader } from "../../atoms/CardPieces";
import Language from "../../../locales";

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
  lang: string;
};

const ProductCard: React.FC<props> = ({ src, id, name, timesValued, rating, alt, price, lang }) => {
  const t = Language(lang);
  return (
    <Link href={`/compra/${name}?id=${id}`} passHref>
      <Box
        margin="1em"
        maxWidth={{
          base: "auto",
          sm: "auto",
          md: "20em",
        }}
        zIndex={2}
      >
        <ImageHeader alt={alt} src={src} height="auto" width="100%" maxHeight="min(40vh , 21.875em)" />
        <Box margin="0.5em .5em 0 0.5em">
          <a>
            <Header type="h6" weight="semibold" fontSize="1.8em">
              {name}
            </Header>
          </a>
          <Flex alignItems="center">
            <ReactStars value={rating} count={5} edit={false} size={24} isHalf activeColor="#F97615" />
            <span
              style={{
                marginLeft: ".5em",
              }}
            >
              {timesValued} {t.productsInfo.ratings}
            </span>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center">
            <Stat>
              <StatNumber>{price}</StatNumber>
            </Stat>
            <Button
              variant="outline"
              borderRadius="12px"
              color="colors.rose.600"
              borderColor="colors.rose.600"
              transition="color .3s ease, background-color .3s ease"
              _hover={{
                color: "white",
                backgroundColor: "colors.rose.600",
              }}
            >
              Pedir ahora
            </Button>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

export default ProductCard;
