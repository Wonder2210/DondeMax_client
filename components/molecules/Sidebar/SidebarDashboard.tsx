import React from "react";
import { Box, Image, Flex } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { List, ListItemDashboard } from "../../atoms/List";
import { IconButton } from "../../atoms/Buttons";
import { Icon } from "@iconify/react";
import { useAppContext } from "../../../utils/AppContext";
import Home from "@iconify/icons-cil/home";
import ListIcon from "@iconify/icons-cil/list-rich";
import cake from "@iconify/icons-cil/birthday-cake";
import closeIcon from "@iconify/icons-cil/x";
import client from "@iconify/icons-cil/contact";
import providers from "@iconify/icons-cil/group";
import user from "@iconify/icons-cil/user";
import mercancia from "@iconify/icons-cil/storage";
import findInPage from "@iconify/icons-cil/find-in-page";
import sun from "@iconify/icons-emojione/crescent-moon";

type props = {
  open: boolean;
  close: (e: React.FormEvent) => void;
};

const SidebarDashboard: React.FC<props> = ({ open, close }) => {
  const { pathname } = useRouter();
  const { state } = useAppContext();
  const verifySelected = (name) => {
    const toCompare = `/admin${name}`;
    return pathname === toCompare;
  };
  return (
    <Box
      width={{ base: "100vw", sm: "100vw", md: "18.5em", lg: "18.5em", xl: "18.5em" }}
      position={{ base: "absolute", sm: "absolute", md: "relative", lg: "relative", xl: "relative" }}
      h="100vh"
      transition=".25s ease-in"
      backgroundColor="white"
      overflowY="scroll"
      zIndex={1}
      marginLeft={open ? 0 : { base: "-100%", sm: "-100%", md: "-19.5em", lg: "-19.5em", xl: "-19.5em" }}
    >
      <Flex
        justify="flex-end"
        width="100%"
        display={{ base: "block", sm: "block", md: "none", lg: "none", xl: "none" }}
      >
        <IconButton
          aria-label="dark"
          backgroundColor="transparent"
          color="#000"
          icon={<Icon icon={closeIcon} height="100%" />}
          onClick={close}
        />
      </Flex>

      <Image src="/images/logo.jpg" width="50%" margin="1em auto" height="auto" />
      {/* <Flex justify="flex-end">
        <IconButton
          aria-label="dark"
          backgroundColor="transparent"
          color="white"
          icon={<Icon icon={sun} height="100%" />}
          onClick={() => alert("dark mode not enable yet")}
        />
      </Flex> */}
      <List spacing={5}>
        <ListItemDashboard selected={verifySelected("")} height="4em" icon={Home}>
          <a href="/admin/">Inicio</a>
        </ListItemDashboard>
        <ListItemDashboard height="4em" selected={verifySelected("/pedidos")} icon={ListIcon}>
          <a href="/admin/pedidos">Pedidos</a>
        </ListItemDashboard>
        <ListItemDashboard height="4em" icon={cake} selected={verifySelected("/productos")}>
          <a href="/admin/productos">Productos</a>
        </ListItemDashboard>
        <ListItemDashboard selected={verifySelected("/proveedores")} icon={providers} height="4em">
          <a href="/admin/proveedores">Proveedores</a>
        </ListItemDashboard>
        <ListItemDashboard icon={mercancia} selected={verifySelected("/mercancia")} height="4em">
          <a href="/admin/mercancia">Mercancia</a>
        </ListItemDashboard>
        <ListItemDashboard icon={client} selected={verifySelected("/clientes")} height="4em">
          <a href="/admin/clientes">Clientes</a>
        </ListItemDashboard>
        <ListItemDashboard height="4em" icon={user} selected={verifySelected("/usuarios")}>
          <a href="/admin/usuarios">Usuarios</a>
        </ListItemDashboard>
        {state.admin && (
          <ListItemDashboard height="4em" icon={findInPage} selected={verifySelected("/auditorias")}>
            <a href="/admin/auditorias">Auditorias</a>
          </ListItemDashboard>
        )}
      </List>
    </Box>
  );
};

export default SidebarDashboard;
