import React from "react";
import { Badge } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import Cart from "@iconify/icons-dashicons/cart";
import IconButton from "./IconButton";

type props = {
  onClick?: () => void;
  itemsCount?: number;
  color?: string;
  backgroundColor?: string;
};

const ShoppingCart: React.FC<props> = ({
  onClick,
  color = "black",
  backgroundColor = "transparent",
  itemsCount = 0,
}) => {
  return (
    <>
      <style jsx>
        {`
          .btnShooppingContainer {
            position: relative;
            height: 68%;
            width: 4.7em;
          }
        `}
      </style>
      <div className="btnShooppingContainer">
        <IconButton
          aria-label="Shopping cart"
          onClick={onClick}
          backgroundColor={backgroundColor}
          icon={<Icon icon={Cart} color={color} height="100%" width="100%" />}
        />
        <Badge variant="solid" borderRadius="50%" colorScheme="red" position="absolute" bottom="5px" right="20%">
          {itemsCount}
        </Badge>
      </div>
    </>
  );
};

export default ShoppingCart;
