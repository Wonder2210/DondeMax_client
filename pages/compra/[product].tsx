/* eslint-disable react/no-danger */
import * as React from "react";
import {
  Flex,
  Image,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spacer,
  Stack,
  Stat,
  StatNumber,
  VStack,
  Badge,
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
  const [state, setState] = React.useState({
    qty: 1,
  });
  const { addToCart: addToCartContext, openCart } = useAppContext();
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
    openCart();
  };

  const onChangeQty = (valS: string, valN: number) => {
    setState({ qty: valN });
  };

  return (
    <>
      <Head>
        <title>{product}</title>
      </Head>
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
              <BreadcrumbLink href="/compra">Productos</BreadcrumbLink>
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
          margin={{
            base: "1em",
            md: "4em 0em",
          }}
          paddingX={{
            base: "0",
            md: "15%",
          }}
          marginTop="1em"
          justify="space-between"
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
              base: "100%",

              md: "40vw",
              lg: "30vw",
            }}
          />
          <Spacer />
          <VStack align="left">
            <Header
              display={{
                base: "none",
                md: "block",
              }}
              textAlign="left"
              size="xl"
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
        <Parragraph
          position="relative"
          fontWeight="500"
          boxProps={{
            marginX: "auto",
            marginY: "3em",
          }}
          fontSize="2em"
          textAlign="center"
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
