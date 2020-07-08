import React from "react";
import { Badge } from "@chakra-ui/core";
import { Icon } from "@iconify/react";
import Cart from "@iconify/icons-cil/cart";
import IconButton from "./IconButton";

type props = {
  onClick?: () => void;
  itemsCount?: number;
};

const ShoppingCart: React.FC<props> = ({ onClick, itemsCount = 0 }) => {
  return (
    <>
      <IconButton
        aria-label="Shopping cart"
        onClick={onClick}
        icon={() => <Icon icon={Cart} color="black" height="70%" width="38px" />}
      />
      <Badge variant="solid" borderRadius="50%" variantColor="red" position="absolute" bottom="0" right="8%">
        {itemsCount}
      </Badge>
    </>
  );
};

export default ShoppingCart;
