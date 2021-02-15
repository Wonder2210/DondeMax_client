/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable prettier/prettier */
import * as React from "react";
import { Flex, Box } from "@chakra-ui/core";
import { Navbar } from "@/organisms/Navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import Whatsapp from "@iconify/icons-cib/whatsapp";
import Instagram from "@iconify/icons-cib/instagram";
import chevronRight from "@iconify/icons-dashicons/arrow-right-alt2";
import { motion } from "framer-motion";
import { IndexCarousel } from "@/organisms/Carousel";
import { Button, IconButton } from "@/atoms/Buttons";
import { Header, SubHeader } from "@/atoms/Text";
import Languages from "../locales";

const index = () => {
  const router = useRouter();
  const { locale } = router;
  const t = Languages(locale);
  return (
    <motion.div
      initial="pageInitial"
      animate="pageAnimate"
      variants={{
        pageInitial: {
          opacity: 0,
        },
        pageAnimate: {
          opacity: 1,
        },
      }}
    >
      <Head>
        <title>Donde Max - Inicio</title>
      </Head>
      <Navbar />
      <Flex position="fixed" width="100%" overflowY="auto" height="100%">
        <Box
          bg="#FDE7DC"
          width="100%"
          h="100vh"
          backgroundImage="url('/images/cake-roses-stand.jpg')"
          backgroundPosition="left"
          backgroundSize="cover"
          position="relative"
          display={{ base: "none", sm: "none", md: "none", lg: "block", xl: "block" }}
        >
          <Flex
            position="absolute"
            w="100%"
            justify="center"
            align="center"
            bottom="0"
            height="10vh"
            backgroundColor="#E91E63"
            color="white"
          >
            <SubHeader color="white" fontSize="1.2em">
              {t.index.contactUs}
            </SubHeader>
            <IconButton
              aria-label="heart"
              backgroundColor="rgba(0,0,0,0)"
              icon={<Icon icon={Whatsapp} width="1.563rem" height="1.5rem" />}
            />
            <IconButton
              aria-label="heart"
              backgroundColor="rgba(0,0,0,0)"
              icon={<Icon icon={Instagram} width="1.563rem" height="1.5rem" />}
            />
          </Flex>
        </Box>
        {/* right side */}
        <Flex
          bg="#FFF"
          direction="column"
          align="center"
          position="relative"
          width={{ base: "100%", sm: "100%", md: "100%", lg: "50%", xl: "50%" }}
          h="100vh"
        >
          <Box
            marginTop={{
              base: "5em",
              md: "8em",
            }}
          >
            <Header size="4xl" color="#E91E63">
              D
            </Header>
            <Header size="4xl">onde</Header>
            <Header size="4xl" color="#E91E63">
              M
            </Header>
            <Header size="4xl">ax</Header>
          </Box>
          <Box marginTop="3em" marginX="4em">
            <SubHeader color="#333">{t.index.subHeader}</SubHeader>
          </Box>
          <Box marginY="2em" height="auto">
            <Button
              fontSize="1.2em"
              backgroundColor="#E91E63"
              width="14em"
              height="3.5em"
              size="lg"
              onClick={() => router.push("/products")}
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
              {t.index.actionButton}
            </Button>
          </Box>
          <IndexCarousel lang={locale} />
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
            <Flex alignItems="center" justifyContent="center" color="white" margin="auto 0 auto 0">
              <SubHeader color="white" fontSize="1.2em">
                {t.index.contactUs}
              </SubHeader>
              <IconButton
                aria-label="heart"
                backgroundColor="rgba(0,0,0,0)"
                icon={<Icon icon={Whatsapp} width="1.563rem" height="1.5rem" />}
              />
              <IconButton
                aria-label="heart"
                backgroundColor="rgba(0,0,0,0)"
                icon={<Icon icon={Instagram} width="1.563rem" height="1.5rem" />}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </motion.div>
  );
};

export default index;
