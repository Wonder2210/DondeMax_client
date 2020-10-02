/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
import * as React from "react";
import { Flex, Box } from "@chakra-ui/core";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "react-responsive";
import chevronRight from "@iconify/icons-dashicons/arrow-right-alt2";
import Whatsapp from "@iconify/icons-cib/whatsapp";
import Instagram from "@iconify/icons-cib/instagram";
import { Header, SubHeader } from "../components/atoms/Text";
import { Button, IconButton } from "../components/atoms/Buttons";
import { Navbar } from "../components/microOrganisms/Navbar";
import { Split } from "../components/layouts/Split";
import { CardSlider } from "../components/microOrganisms/CardSlider";
import InitialCard from "../components/microOrganisms/Cards/InitialCard";

const index = () => {
  const isPhone = useMediaQuery({
    maxWidth: 960,
  });
  return (
    <>
      <Navbar />
      <Split>
        <Box
          bg="rgb(255,0,0)"
          width="100%"
          h="100vh"
          backgroundImage="url('/images/cake-roses-stand.jpg')"
          backgroundPosition="left"
          backgroundSize="cover"
        >
          <Flex
            position="absolute"
            w="100%"
            justify="center"
            align="center"
            bottom="0"
            height="10vh"
            backgroundColor="rose.700"
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
        </Box>
        <Flex bg="#FFF" direction="column" align="center" w="100%" h="100%">
          <Box marginTop="15vh">
            <Header>
              <Header color="#E91E63" nested>
                D
              </Header>
              onde
              <Header color="#E91E63" nested>
                M
              </Header>
              ax
            </Header>
          </Box>
          <Box marginTop="5vh">
            <SubHeader>
              Postres , dulces , tortas y Pasapalos de la <br /> mas alta calidad , a la medida de sus <br />{" "}
              necesidades
            </SubHeader>
          </Box>
          <Box marginTop="5vh" height="auto">
            <Button
              backgroundColor="rose.600"
              rightIcon={
                <Icon
                  icon={chevronRight}
                  color="white"
                  height="2.875rem"
                  width="2.375rem"
                  style={{ marginLeft: "10%" }}
                />
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
            {isPhone && (
              <Flex
                position="absolute"
                w="100%"
                justify="center"
                align="center"
                bottom="0"
                height="10vh"
                backgroundColor="rose.700"
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
          </Box>
        </Flex>
      </Split>
    </>
  );
};

export default index;
