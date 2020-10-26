import * as React from "react";
import { Box, Flex } from "@chakra-ui/core";
import { NavbarDashboard } from "../../organisms/Navbar";
import { SidebarDashboard } from "../../molecules/Sidebar";

type props = {
  sidebar: boolean;
};

const Dashboard = ({ children }) => {
  const [state, setState] = React.useState<props>({
    sidebar: true,
  });

  const toggleSidebar = () => setState({ sidebar: !state.sidebar });
  const close = () => setState({ sidebar: false });
  return (
    <Flex w="100%" h="100vh" backgroundColor="white">
      <SidebarDashboard open={state.sidebar} close={close} />
      <Box
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
        <Box margin="1em" backgroundColor="#FFF" borderRadius="48px">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default Dashboard;
