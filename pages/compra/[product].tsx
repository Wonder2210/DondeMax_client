/* eslint-disable react/no-danger */
import * as React from "react";
import {
  Flex,
  Image,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Stack,
  Stat,
  StatNumber,
  VStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  CircularProgress,
  CircularProgressLabel,
  Badge,
  useDisclosure,
} from "@chakra-ui/react";
import ReactStars from "react-rating-stars-component";
import Icon from "@iconify/react";
import ChevronRight from "@iconify/icons-dashicons/arrow-right-alt2";
import Cart from "@iconify/icons-cil/cart";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@/atoms/Buttons";
import { ProductCard } from "@/organisms/Cards";
import { NumberInput } from "@/atoms/Inputs";
import { useAppContext } from "@/utils/AppContext";
import { Header, Parragraph } from "@/atoms/Text";
import { gql } from "@apollo/client";
import { Standard } from "@/layouts/Standard";
import { CardSliderProducts as CardSlider } from "@/organisms/Carousel";
import { Client } from "@/utils/GraphqlClient";
import { GetServerSideProps } from "next";
import Cookie from "js-cookie";
import Language from "../../locales";

const query = gql`
  query Product($id: Int!) {
    product(id: $id) {
      id
      name
      image
      info
      precio
      available
      rate {
        value
        times_valued
      }
    }
    getProducts {
      id
      name
      image
      precio
      rate {
        value
        times_valued
      }
    }
  }
`;

const ProductInfo = ({ data, id, product }) => {
  const router = useRouter();
  const [state, setState] = React.useState({
    qty: 1,
  });
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { state: context, setState: setContext, addToCart: addToCartContext, removeFromCart } = useAppContext();
  const { locale } = useRouter();
  const t = Language(locale);

  const addToCart = () => {
    addToCartContext({
      id: data.product.id,
      name: data.product.name,
      quantity: state.qty,
      image: data.product.image,
      price: data.product.precio,
      total: state.qty * data.product.precio,
    });
    onOpen();
    setTimeout(onClose, 1500);
  };

  const onChangeQty = (valS: string, valN: number) => {
    setState({ qty: valN });
  };
  const addRef = React.useRef();

  return (
    <>
      <Head>
        <title>{product}</title>
      </Head>
      <AlertDialog leastDestructiveRef={addRef} onClose={onClose} isOpen={isOpen}>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogCloseButton ref={addRef} />
          <AlertDialogBody paddingY="2.75em">
            <Stack direction="row">
              <Image rounded="35px" src={data.product.image} boxSize="50px" />
              <p
                dangerouslySetInnerHTML={{
                  __html: t.productsInfo.addedSuccesfully(state.qty, data.name),
                }}
              />
            </Stack>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
      <Standard>
        <Flex justifyContent="center" alignItems="center">
          <Breadcrumb
            marginTop="5em"
            marginLeft="2em"
            spacing="8px"
            separator={<Icon icon={ChevronRight} color="black" />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Productos</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">{product}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>

        <Stack
          direction={{
            base: "column",

            md: "row",
          }}
          marginX={{
            base: "1em",
            md: "0em",
          }}
          marginTop="1em"
          justify="space-around"
          align="center"
        >
          <Header
            display={{
              base: "block",
              md: "none",
            }}
            textAlign="left"
            marginY="1em"
            size="xl"
          >
            {data.product.name}
          </Header>
          <Image
            rounded="35px"
            src={data.product.image}
            boxSize={{
              base: "19em",
              sm: "25em",
              md: "27em",
              lg: "30em",
              xl: "33em",
            }}
          />
          <VStack align="left">
            <Header
              display={{
                base: "none",
                md: "block",
              }}
              textAlign="left"
              size="xl"
              marginTop="0.3em"
            >
              {data.product.name}
            </Header>
            <Badge width="min-content" colorScheme={data.product.available ? "green" : "red"}>
              {data.product.available ? t.productsInfo.available : t.productsInfo.notAvailable}
            </Badge>
            <Stat>
              <StatNumber>{data.product.precio}$</StatNumber>
            </Stat>
            <Flex
              alignItems={{
                base: "flex-start",
                md: "flex-start",
                lg: "center",
              }}
              flexDirection={{
                base: "column",
                md: "column",
                lg: "row",
              }}
            >
              <ReactStars
                value={data.product.rate.value}
                count={5}
                edit={false}
                size={50}
                isHalf
                activeColor="#ffd700"
              />
              <span
                style={{
                  marginLeft: ".5em",
                }}
              >
                ({data.product.rate.times_valued}) {t.productsInfo.ratings}
              </span>
            </Flex>
            <Parragraph
              fontWeight="regular"
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              maxWidth={{
                base: "100%",
                md: "30vw",
                lg: "25vw",
              }}
              marginBottom=".5em"
              textAlign="left"
            >
              {data.product.info}
            </Parragraph>
            <NumberInput
              label={t.productsInfo.quantity}
              defaultValue={1}
              onChange={onChangeQty}
              min={1}
              max={12}
              size="xs"
            />
            <Button
              onClick={addToCart}
              marginTop="1em"
              backgroundColor="colors.rose.600"
              borderRadius="12px"
              size="lg"
              leftIcon={<Icon icon={Cart} width="2em" />}
              isDisabled={!data.product.available}
            >
              {t.productsInfo.addToCart}
            </Button>
          </VStack>
        </Stack>

        <Tabs align="center" marginTop="2.5em" isFitted marginX="auto" maxWidth="35em">
          <TabList>
            <Tab>{t.productsInfo.ratings}</Tab>
            <Tab>{t.productsInfo.delivery}</Tab>
          </TabList>

          <TabPanels minHeight="min(30vh , 20em)">
            <TabPanel>
              <Stack
                direction={{
                  base: "column",
                  md: "row",
                }}
                justify="space-around"
              >
                <CircularProgress thickness="12px" size="140px" value={data.product.rate.value * 20} color="green.400">
                  <CircularProgressLabel>{data.product.rate.value}/5</CircularProgressLabel>
                </CircularProgress>
                <Stack
                  spacing={2}
                  maxWidth={{
                    base: "80vw",
                    md: "min(25vw, 10em)",
                  }}
                  justify="center"
                >
                  <p>
                    <span color="colors.rose.600">{data.product.rate.times_valued}</span> {t.productsInfo.ratingsInfo}
                  </p>
                </Stack>
              </Stack>
            </TabPanel>
            <TabPanel>
              <p>{t.productsInfo.deliveryInfo}</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Parragraph
          fontWeight="medium"
          marginLeft={{
            base: ".5em",
            md: "2em",
          }}
          fontSize="2xl"
          textAlign="left"
          height="5em"
        >
          {t.productsInfo.moreProducts}
        </Parragraph>
        <Flex
          marginX={{
            md: "2em",
          }}
          marginTop="1em"
        >
          <CardSlider>
            {data.getProducts.map((i) => (
              <ProductCard
                id={i.id}
                key={i.id}
                lang={locale}
                rating={i.rate.value}
                timesValued={i.rate.times_valued}
                alt="image-test"
                src={i.image}
                price={`${i.precio}$`}
                name={i.name}
              />
            ))}
          </CardSlider>
        </Flex>
      </Standard>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { product, id } = context.query;
  const fetchData = Client(Cookie.get("auth"));
  const { data } = await fetchData.query({
    query,
    variables: {
      id: Number(id),
    },
  });
  return {
    props: {
      data,
      product,
      id,
    },
  };
};

export default ProductInfo;
