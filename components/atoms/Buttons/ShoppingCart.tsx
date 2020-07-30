import React from "react";
import { Badge } from "@chakra-ui/core";
import { Icon } from "@iconify/react";
import Cart from "@iconify/icons-cil/cart";
import IconButton from "./IconButton";

type props = {
  onClick?: () => void;
  itemsCount?: number;
  color?: string;
  backgroundColor?: string;
};

const ShoppingCart: React.FC<props> = ({ onClick, color = "black", backgroundColor, itemsCount = 0 }) => {
  return (
    <>
      <style jsx>
        {`
          .btnShooppingContainer {
            position: absolute;
            height: 68%;
            width: 76px;
          }
        `}
      </style>
      <div className="btnShooppingContainer">
        <IconButton
          aria-label="Shopping cart"
          onClick={onClick}
          backgroundColor={backgroundColor}
          icon={() => <Icon icon={Cart} color={color} height="100%" width="100%" />}
        />
        <Badge variant="solid" borderRadius="50%" variantColor="red" position="absolute" bottom="5px" right="20%">
          {itemsCount}
        </Badge>
      </div>
    </>
  );
};

export default ShoppingCart;