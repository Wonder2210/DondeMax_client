import React from "react";

import { Flex, Box } from "@chakra-ui/core";

import { useMediaQuery } from "react-responsive";
import chevronRight from "@iconify/icons-dashicons/arrow-right-alt2";
import Whatsapp from "@iconify/icons-cib/whatsapp";
import Instagram from "@iconify/icons-cib/instagram";
import { Icon } from "@iconify/react";
import { Header, SubHeader } from "../../atoms/Text";
import { Button, IconButton } from "../../atoms/Buttons";
import { CardSlider } from "../../microOrganisms/CardSlider";
import InitialCard from "../../microOrganisms/Cards/InitialCard";

const RightSide = () => {
  const isPhone = useMediaQuery({
    query: "(min-width:62em;)",
  });
  return (
    <Flex
      bg="#FFF"
      direction="column"
      align="center"
      position="relative"
      width={{ sm: "100%", md: "100%", lg: "50%", xl: "50%" }}
      h="100vh"
    >
      <Box marginTop="15vh">
        <Header color="#E91E63">D</Header>
        <Header>onde</Header>
        <Header color="#E91E63">M</Header>
        <Header>ax</Header>
      </Box>
      <Box marginTop="5vh">
        <SubHeader>
          Postres , dulces , tortas y Pasapalos de la <br /> mas alta calidad , a la medida de sus <br /> necesidades
        </SubHeader>
      </Box>
      <Box marginTop="5vh" height="auto">
        <Button
          backgroundColor="rose.600"
          rightIcon={
            <Icon icon={chevronRight} color="white" height="2.875rem" width="2.375rem" style={{ marginLeft: "10%" }} />
          }
        >
          Nuestras Tortas
        </Button>
      </Box>
      <Box width="100%" alignItems="center" marginTop="5vh">
        <CardSlider>
          <InitialCard
            alt="image of test"
            href="/"
            src="http://t1.gstatic.com/images?q=tbn:ANd9GcQi47DaoMOT1DeSAaahfQDaxs6AS5HZRMcMTLW_kh_M8dD9_P2yuaWkOdc90e4xcd35zEyyT1dN5o_wWBT1blQ"
          >
            Here we are
          </InitialCard>

          <InitialCard
            alt="image of test"
            href="/"
            src="http://t1.gstatic.com/images?q=tbn:ANd9GcQi47DaoMOT1DeSAaahfQDaxs6AS5HZRMcMTLW_kh_M8dD9_P2yuaWkOdc90e4xcd35zEyyT1dN5o_wWBT1blQ"
          >
            Here we are
          </InitialCard>

          <InitialCard
            alt="image of test"
            href="/"
            src="http://t1.gstatic.com/images?q=tbn:ANd9GcQi47DaoMOT1DeSAaahfQDaxs6AS5HZRMcMTLW_kh_M8dD9_P2yuaWkOdc90e4xcd35zEyyT1dN5o_wWBT1blQ"
          >
            Here we are
          </InitialCard>

          <InitialCard
            alt="image of test"
            href="/"
            src="http://t1.gstatic.com/images?q=tbn:ANd9GcQi47DaoMOT1DeSAaahfQDaxs6AS5HZRMcMTLW_kh_M8dD9_P2yuaWkOdc90e4xcd35zEyyT1dN5o_wWBT1blQ"
          >
            Here we are
          </InitialCard>

          <InitialCard
            alt="image of test"
            href="/"
            src="http://t1.gstatic.com/images?q=tbn:ANd9GcQi47DaoMOT1DeSAaahfQDaxs6AS5HZRMcMTLW_kh_M8dD9_P2yuaWkOdc90e4xcd35zEyyT1dN5o_wWBT1blQ"
          >
            Here we are
          </InitialCard>

          <InitialCard
            alt="image of test"
            href="/"
            src="http://t1.gstatic.com/images?q=tbn:ANd9GcQi47DaoMOT1DeSAaahfQDaxs6AS5HZRMcMTLW_kh_M8dD9_P2yuaWkOdc90e4xcd35zEyyT1dN5o_wWBT1blQ"
          >
            Here we are
          </InitialCard>

          <InitialCard
            alt="image of test"
            href="/"
            src="http://t1.gstatic.com/images?q=tbn:ANd9GcQi47DaoMOT1DeSAaahfQDaxs6AS5HZRMcMTLW_kh_M8dD9_P2yuaWkOdc90e4xcd35zEyyT1dN5o_wWBT1blQ"
          >
            Here we are
          </InitialCard>

          <InitialCard
            alt="image of test"
            href="/"
            src="http://t1.gstatic.com/images?q=tbn:ANd9GcQi47DaoMOT1DeSAaahfQDaxs6AS5HZRMcMTLW_kh_M8dD9_P2yuaWkOdc90e4xcd35zEyyT1dN5o_wWBT1blQ"
          >
            Here we are
          </InitialCard>
        </CardSlider>
      </Box>
      {isPhone && (
        <Flex
          position="absolute"
          w="100%"
          justify="center"
          align="center"
          bottom="0"
          height="10vh"
          backgroundColor="#E91E63"
        >
          <SubHeader>Contactanos a traves de</SubHeader>
          <IconButton
            aria-label="heart"
            backgroundColor="rgba(0,0,0,0)"
            color="black"
            icon={<Icon icon={Whatsapp} width="1.563rem" height="1.5rem" />}
          />
          <IconButton
            aria-label="heart"
            backgroundColor="rgba(0,0,0,0)"
            color="black"
            icon={<Icon icon={Instagram} width="1.563rem" height="1.5rem" />}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default RightSide;
