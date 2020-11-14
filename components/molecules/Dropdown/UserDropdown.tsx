import { Menu, MenuButton, Image, Button, MenuList, MenuItem } from "@chakra-ui/core";
import { Icon } from "@iconify/react";
import exit from "@iconify/icons-cil/exit-to-app";
import downChevron from "@iconify/icons-dashicons/arrow-down-alt2";
import React from "react";

type props = {
  image: string;
  imageAlt: string;
  userName: string;
};

const UserDashboard: React.FC<props> = ({ image, imageAlt, userName }) => {
  return (
    <>
      <style jsx>{`
        .margin-span {
          margin-left: 1.5em;
        }
      `}</style>
      <Menu>
        <MenuButton
          as={Button}
          leftIcon={
            <Image boxSize="2rem" borderRadius="full" src={image} alt={imageAlt} bgColor="colors.transparent" />
          }
          rightIcon={<Icon icon={downChevron} width="1em" height="auto" />}
        >
          {userName}
        </MenuButton>
        <MenuList>
          <MenuItem minH="48px">
            <span>Admin</span>
          </MenuItem>
          <MenuItem minH="40px">
            <Icon icon={exit} width="2em" />
            <span className="margin-span">Salir</span>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default UserDashboard;
