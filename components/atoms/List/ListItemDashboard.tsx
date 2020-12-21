/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ListItem as Lst, Flex } from "@chakra-ui/core";
import { Icon } from "@iconify/react";

type props = {
  icon: object;
  iconColor?: string;
  fontSize?: string;
  marginLeft?: string | number;
  selected?: boolean;
  width?: string;
  height?: string;
};

const ListItemDashboard: React.FC<props> = ({
  selected = false,
  height = "auto",
  children,
  fontSize = "auto",
  icon = null,
}) => {
  const selectedStyles = selected
    ? {
        bgColor: "colors.rose.600",
        borderRadius: "0 35px 35px 0",
        color: "white",
      }
    : {};
  return (
    <Lst
      fontSize={fontSize}
      height={height}
      display="flex"
      alignItems="center"
      cursor={!selected ? "pointer" : "auto"}
      justifyContent="center"
      {...selectedStyles}
    >
      <Flex width="20%">{icon && <Icon icon={icon} height="65%" />}</Flex>
      <Flex alignItems="center" width="50%">
        {children}
      </Flex>
    </Lst>
  );
};

export default ListItemDashboard;
