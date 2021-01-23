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
} from "@chakra-ui/core";
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
import { useQuery, gql } from "@apollo/client";
import { Standard } from "@/layouts/Standard";
import Animation from "@/molecules/Loader/Animation";
import { CardSliderProducts as CardSlider } from "@/organisms/Carousel";

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

const ProductInfo = () => {
  const router = useRouter();
  const [state, setState] = React.useState({
    qty: 1,
  });
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { state: context, setState: setContext, addToCart: addToCartContext, removeFromCart } = useAppContext();
  const { product, id } = router.query;
  const { data, error, loading } = useQuery(query, {
    variables: {
      id: Number(id),
    },
    onCompleted: (data) => console.log(data),
    onError: () => alert("error"),
  });
  if (error) {
    console.log(JSON.stringify(error.networkError, null, 2));
    console.log(error.graphQLErrors);
  }

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
              <p>
                Haz agregado <strong>{state.qty}</strong> unidades de {data.product.name} al carrito Exitosamente
              </p>
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
        {loading ? (
          <Animation />
        ) : (
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
              {data.product.available ? (
                <Badge width="min-content" colorScheme="green">
                  Disponible
                </Badge>
              ) : (
                <Badge width="min-content" colorScheme="red">
                  No disponible
                </Badge>
              )}
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
                  ({data.product.rate.times_valued}) Valoraciones
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
                {/* {data.product.info} */}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, natus hic.
              </Parragraph>
              <NumberInput label="Cantidad:" defaultValue={1} onChange={onChangeQty} min={1} max={12} size="xs" />
              <Button
                onClick={addToCart}
                marginTop="1em"
                backgroundColor="colors.rose.600"
                borderRadius="12px"
                size="lg"
                leftIcon={<Icon icon={Cart} width="2em" />}
                isDisabled={!data.product.available}
              >
                Agregar al Carrito
              </Button>
            </VStack>
          </Stack>
        )}
        <Tabs align="center" marginTop="2.5em" isFitted marginX="auto" maxWidth="35em">
          <TabList>
            <Tab>Valoraciones</Tab>
            <Tab>Entregas</Tab>
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
                <CircularProgress
                  thickness="12px"
                  size="140px"
                  value={loading ? 0 : data.product.rate.value * 20}
                  color="green.400"
                >
                  <CircularProgressLabel>{!loading && data.product.rate.value}/5</CircularProgressLabel>
                </CircularProgress>
                <Stack spacing={2} maxWidth="min(25vw, 10em)" justify="center">
                  <p>
                    <span color="colors.rose.600">{!loading && data.product.rate.times_valued}</span> de nuestros
                    clientes han dado una opinion acerca de este producto
                  </p>
                </Stack>
              </Stack>
            </TabPanel>
            <TabPanel>
              <p>
                Todos nuestros productos son producidos el mismo dia de su entrega por lo tanto sus pedidos se deberan
                realizar con la debida antelacio Podran ser retirados en el horario de 8 am a 7pm en nuestro local y se
                puede acordar el delivery con un recargo adicional (a consultar varia del lugar) de entre 10am y 5pm
              </p>
            </TabPanel>
          </TabPanels>
        </Tabs>
        {loading ? (
          ""
        ) : (
          <>
            <Parragraph
              fontWeight="medium"
              marginLeft="2em"
              marginTop="3em"
              fontSize="2xl"
              textAlign="left"
              height="3em"
            >
              Productos que te pueden interesar:
            </Parragraph>
            <Flex
              marginX={{
                md: "2em",
              }}
            >
              <CardSlider>
                {data.getProducts.map((i) => (
                  <ProductCard
                    id={i.id}
                    key={i.id}
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
          </>
        )}
      </Standard>
    </>
  );
};

export default ProductInfo;
