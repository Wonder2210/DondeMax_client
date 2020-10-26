import React from "react";
import Link from "next/link";
import Dropdown from "./Dropdown";
import UserDropdown from "./UserDropdown";
import { ListItem as StyleLink } from "../../atoms/List";

export const testDropdown = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button type="button" onClick={(): void => setOpen(!open)}>
        Open ANd close
      </button>
      <Dropdown show={open}>
        <Link href="/" passHref>
          <StyleLink>Acerca de Nosotros </StyleLink>
        </Link>
        <Link href="/" passHref>
          <StyleLink>Noticias</StyleLink>
        </Link>
        <Link href="/" passHref>
          <StyleLink>Pedidos</StyleLink>
        </Link>
      </Dropdown>
    </>
  );
};

export const testUserDropdown = () => {
  return (
    <UserDropdown image="https://randomuser.me/api/portraits/men/23.jpg" imageAlt="Jhon Doe" userName="Jhon Doe" />
  );
};

export default {
  title: "Molecules/Dropdown",
};
