import React from "react";
import { Icon } from "@iconify/react";
import Cart from "@iconify/icons-cil/cart";
import { Box, Badge, Flex } from "@chakra-ui/core";
import { IconButton } from "../../atoms/Buttons";
import { SubHeader } from "../../atoms/Text";
import { BasicFooter, ImageHeader } from "../../atoms/CardPieces";

type props = {
  src: string;
  alt: string;
  price: string;
  name: string;
  height?: string;
  width?: string;
  isInCart: boolean;
  onClick: (e) => void;
};

const InitialCard: React.FC<props> = ({ src, name, width, height, alt, price, isInCart, onClick }) => {
  return (
    <Box
      rounded="35px"
      position="relative"
      height={height ?? ["18em", "21.5em"]}
      marginBottom="5vh"
      marginX="auto"
      width={width ?? ["15em", "18em"]}
      backgroundColor="#000"
      boxShadow={false ? " 1px 1px 5px rgba(0, 0, 0, 0.5)" : " 10px 10px 50px rgba(0, 0, 0, 0.5)"}
    >
      <ImageHeader alt={alt} src={src} height="100%" width="100%" />
      <BasicFooter
        borders={["0px", "35px"]}
        height="25%"
        position="absolute"
        top="75%"
        bottom="0"
        zIndex={3}
        backgroundColor="#FFFFFF"
      >
        <Badge
          position="absolute"
          width="60%"
          rounded="25px"
          textAlign="center"
          color="white"
          backgroundColor="#2F4858"
          top="0"
          left="50%"
          height="1.5em"
          zIndex={1}
          fontSize="1.1em"
          transform="translate(-50%,-50%)"
        >
          {price}
        </Badge>
        <Flex justify="space-between" width="80%">
          <SubHeader>{name}</SubHeader>
          <IconButton
            aria-label="cart"
            borderColor="colors.rose.600"
            backgroundColor={isInCart ? "colors.rose.600" : "#FFF"}
            onClick={onClick}
            color="white"
            icon={<Icon icon={Cart} color={isInCart ? "#fff" : "#E91E63"} />}
          />
        </Flex>
      </BasicFooter>
    </Box>
  );
};

export default InitialCard;
