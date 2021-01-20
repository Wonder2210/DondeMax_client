import React from "react";

import { Flex, Box } from "@chakra-ui/core";
import { useRouter } from "next/router";
import chevronRight from "@iconify/icons-dashicons/arrow-right-alt2";
import Whatsapp from "@iconify/icons-cib/whatsapp";
import Instagram from "@iconify/icons-cib/instagram";
import { Icon } from "@iconify/react";
import { Header, SubHeader } from "@/atoms/Text";
import { Button, IconButton } from "@/atoms/Buttons";
import { CardSlider } from "@/organisms/CardSlider";
import { InitialCard } from "@/organisms/Cards";

const RightSide = () => {
  const router = useRouter();

  return (
    <Flex
      bg="#FFF"
      direction="column"
      align="center"
      position="relative"
      width={{ base: "100%", sm: "100%", md: "100%", lg: "50%", xl: "50%" }}
      h="100vh"
    >
      <Box marginTop="15vh">
        <Header size="4xl" color="#E91E63">
          D
        </Header>
        <Header size="4xl">onde</Header>
        <Header size="4xl" color="#E91E63">
          M
        </Header>
        <Header size="4xl">ax</Header>
      </Box>
      <Box marginTop="5vh">
        <SubHeader>
          Postres , dulces , tortas y Pasapalos de la <br /> mas alta calidad , a la medida de sus <br /> necesidades
        </SubHeader>
      </Box>
      <Box marginTop="5vh" height="auto">
        <Button
          fontSize="1.2em"
          backgroundColor="#E91E63"
          width="14em"
          height="3.5em"
          size="lg"
          onClick={() => router.push("/products")}
          rightIcon={
            <Icon icon={chevronRight} color="white" height="2.875rem" width="2.375rem" style={{ marginLeft: "10%" }} />
          }
        >
          Nuestras Tortas
        </Button>
      </Box>
      <Box width="100%" alignItems="center" marginTop="auto" marginBottom="1em">
        <CardSlider>
          <InitialCard alt="image of test" href="/products" src="/images/tortas.jpg">
            Tortas
          </InitialCard>
          <InitialCard alt="image of test" href="/products" src="/images/dulces_frios.jpg">
            Dulces frios
          </InitialCard>
          <InitialCard alt="image of test" href="/products" src="/images/galletas.jpg">
            Galletas
          </InitialCard>
          <InitialCard alt="image of test" href="/products" src="/images/pasapalos_dulces.jpg">
            Pasapalos dulces
          </InitialCard>
        </CardSlider>
      </Box>
      <Flex
        position="absolute"
        w="100%"
        display={{
          base: "block",
          sm: "block",
          md: "block",
          lg: "block",
          xl: "none",
        }}
        justify="center"
        align="center"
        bottom="0"
        height="10vh"
        backgroundColor="#E91E63"
      >
        <Flex alignItems="center" justifyContent="center" margin="auto 0 auto 0">
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
      </Flex>
    </Flex>
  );
};

export default RightSide;
