import * as React from "react";
import { Menu, Button, MenuButton, MenuList, MenuItemOption, MenuOptionGroup } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import downChevron from "@iconify/icons-dashicons/arrow-down-alt2";
import Languages from "../../../locales";

type props = {
  lang: string;
  onChange: (e: string) => void;
  selectedType: string;
};

const LanguageDropdown: React.FC<props> = ({ selectedType, lang, onChange }) => {
  const t = Languages(lang);
  return (
    <Menu size="sm">
      <MenuButton
        as={Button}
        rightIcon={<Icon icon={downChevron} width="1em" height="auto" />}
        bgColor="transparent"
        color="#000"
      >
        {selectedType.length < 3 ? t.shop.type1 : selectedType}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup onChange={onChange}>
          <MenuItemOption value="1">{t.shop.type1}</MenuItemOption>
          <MenuItemOption value="2">{t.shop.type2}</MenuItemOption>
          <MenuItemOption value="3">{t.shop.type3}</MenuItemOption>
          <MenuItemOption value="4">{t.shop.type4}</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default LanguageDropdown;
