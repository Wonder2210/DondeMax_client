import { Menu, MenuButton, Image, Button, MenuList, MenuItem } from "@chakra-ui/core";
import { Icon } from "@iconify/react";
import downChevron from "@iconify/icons-dashicons/arrow-down-alt2";
import React from "react";

type props = {
  image: string;
  imageAlt: string;
  userName: string;
};

const UserDashboard: React.FC<props> = ({ image, imageAlt, userName }) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        leftIcon={<Image boxSize="2rem" borderRadius="full" src={image} alt={imageAlt} bgColor="colors.transparent" />}
        rightIcon={<Icon icon={downChevron} width="1em" height="auto" />}
      >
        {userName}
      </MenuButton>
      <MenuList>
        <MenuItem minH="48px">
          <Image
            boxSize="2rem"
            borderRadius="full"
            src="https://robohash.org/YOUR-TEXT.png?size=200x200"
            alt="Fluffybuns the destroyer"
            mr="12px"
          />
          <span>Fluffybuns the Destroyer</span>
        </MenuItem>
        <MenuItem minH="40px">
          <Image
            boxSize="2rem"
            borderRadius="full"
            src="https://placekitten.com/120/120"
            alt="Simon the pensive"
            mr="12px"
          />
          <span>Simon the pensive</span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserDashboard;
