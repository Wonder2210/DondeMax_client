import * as React from "react";
import { Box, Flex, useMediaQuery } from "@chakra-ui/core";
import { NavbarDashboard } from "../../organisms/Navbar";
import { SidebarDashboard } from "../../molecules/Sidebar";
import { useRouter } from "next/router";
import { useAuth } from "../../../utils/AuthHook";
import Cookie from "js-cookie";

type props = {
  sidebar: boolean;
};

const Dashboard = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isMobile] = useMediaQuery("(min-width: 48em)");
  const [state, setState] = React.useState<props>({
    sidebar: isMobile,
  });

  React.useEffect(() => {
    const cookie = Cookie.get("auth");

    if (!cookie) {
      router.push("/");
      alert("no tienes permiso de estar aqui");
    }
  }, [user]);

  const toggleSidebar = () => setState({ sidebar: !state.sidebar });
  const close = () => setState({ sidebar: false });
  return (
    <Flex w="100%" h="100vh" backgroundColor="white" position="fixed">
      <SidebarDashboard open={state.sidebar} close={close} />
      <Box
        overflowY="scroll"
        flexGrow={{ base: 0, sm: 0, md: 1, lg: 1, xl: 1 }}
        width={{
          base: "100%",
          sm: "100%",

          md: "calc(100vw - 18.5em)",
          lg: "calc(100vw - 18.5em)",
          xl: "calc(100vw - 18.5em)",
        }}
        transition=".5s linear"
      >
        <NavbarDashboard toggle={toggleSidebar} />
        <Box margin="1em" borderRadius="48px">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default Dashboard;
