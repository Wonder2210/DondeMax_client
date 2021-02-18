import * as React from "react";
import { Menu, Button, MenuButton, MenuList, MenuItemOption, MenuOptionGroup } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import downChevron from "@iconify/icons-dashicons/arrow-down-alt2";
import { useRouter } from "next/router";

const LanguageDropdown = () => {
  const router = useRouter();
  const { locale, push, pathname } = router;

  const redirect = (lang: string) => push(pathname, pathname, { locale: lang });

  return (
    <Menu size="sm">
      <MenuButton
        as={Button}
        rightIcon={<Icon icon={downChevron} width="1em" height="auto" />}
        bgColor="transparent"
        color="#000"
      >
        {locale.toUpperCase()}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup onChange={(lang) => (typeof lang === "string" ? redirect(lang) : null)}>
          <MenuItemOption value="es" isChecked={locale === "es"}>
            Es
          </MenuItemOption>
          <MenuItemOption value="en" isChecked={locale === "en"}>
            En
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default LanguageDropdown;
