import React from "react";
import Link from "next/link";
import { Box, Image, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Home from "@iconify/icons-cil/home";
import ListIcon from "@iconify/icons-cil/list-rich";
import cake from "@iconify/icons-cil/birthday-cake";
import closeIcon from "@iconify/icons-cil/x";
import client from "@iconify/icons-cil/contact";
import providers from "@iconify/icons-cil/group";
import userIcon from "@iconify/icons-cil/user";
import mercancia from "@iconify/icons-cil/storage";
import findInPage from "@iconify/icons-cil/find-in-page";
import { Icon } from "@iconify/react";
import { List, ListItemDashboard } from "../../atoms/List";
import { IconButton } from "../../atoms/Buttons";
import { useAppContext } from "../../../utils/AppContext";
import { useAuth } from "../../../utils/AuthHook";

type props = {
  open: boolean;
  close: (e: React.FormEvent) => void;
};

const SidebarDashboard: React.FC<props> = ({ open, close }) => {
  const { employee: user } = useAuth();
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
      <List spacing={5}>
        <ListItemDashboard selected={verifySelected("")} height="4em" icon={Home}>
          <Link href="/admin/">Inicio</Link>
        </ListItemDashboard>
        <ListItemDashboard height="4em" selected={verifySelected("/pedidos")} icon={ListIcon}>
          <Link href="/admin/pedidos">Pedidos</Link>
        </ListItemDashboard>
        <ListItemDashboard height="4em" icon={cake} selected={verifySelected("/productos")}>
          <Link href="/admin/productos">Productos</Link>
        </ListItemDashboard>
        <ListItemDashboard selected={verifySelected("/proveedores")} icon={providers} height="4em">
          <Link href="/admin/proveedores">Proveedores</Link>
        </ListItemDashboard>
        <ListItemDashboard icon={mercancia} selected={verifySelected("/mercancia")} height="4em">
          <Link href="/admin/mercancia">Mercancia</Link>
        </ListItemDashboard>
        <ListItemDashboard icon={client} selected={verifySelected("/clientes")} height="4em">
          <Link href="/admin/clientes">Clientes</Link>
        </ListItemDashboard>
        <ListItemDashboard height="4em" icon={userIcon} selected={verifySelected("/usuarios")}>
          <Link href="/admin/usuarios">Usuarios</Link>
        </ListItemDashboard>
        {state.admin && user.role === "ADMINISTRADOR" && (
          <ListItemDashboard height="4em" icon={findInPage} selected={verifySelected("/auditorias")}>
            <Link href="/admin/auditorias">Auditorias</Link>
          </ListItemDashboard>
        )}
      </List>
    </Box>
  );
};

export default SidebarDashboard;
