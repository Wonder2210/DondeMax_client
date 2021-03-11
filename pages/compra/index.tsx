import * as React from "react";
import { Flex, Grid, Tabs, Tab, TabList } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Animation from "@/molecules/Loader/Animation";
import { useQuery } from "@apollo/client";
import { Standard } from "@/layouts/Standard";
import { ProductTypeDropdown } from "@/molecules/Dropdown";
import { Pagination } from "@/molecules/Pagination";
import { ProductCard } from "@/components/organisms/Cards";
import { Header } from "@/atoms/Text";
import { GET_DATA_STORE } from "@/graphql";
import Language from "../../locales";

type state = {
  types: string;
  preservations: string;
  showTypes: boolean;
  showPreservations: boolean;
  page: number;
  total: number;
};

const store = () => {
  const router = useRouter();
  const { locale } = router;
  const t = Language(locale);
  const [state, setState] = React.useState<state>({
    types: "",
    preservations: "",
    showTypes: false,
    showPreservations: false,
    page: 1,
    total: 1,
  });

  const { loading, error, data } = useQuery(GET_DATA_STORE, {
    variables: { preservation: state.preservations, type: state.types, cursor: state.page - 1 },
    onCompleted: (result) => {
      setState({ ...state, total: result.searchProducts.results.length });
    },
  });
  const next = () => setState((last) => ({ ...last, page: last.page + 1 }));

  const lastItem = () => setState((last) => ({ ...last, page: last.page - 1 }));

  const onClick = (e: number) => setState((last) => ({ ...last, page: e }));

  const onChangeDropDown = (index) => {
    console.log(index);
    switch (index) {
      case "1":
        setState((last) => ({ ...last, types: "" }));
        break;
      case "2":
        setState((last) => ({ ...last, types: "Tortas" }));
        break;
      case "3":
        setState((last) => ({ ...last, types: "Porcion de torta" }));
        break;
      case "4":
        setState((last) => ({ ...last, types: "Galleta" }));
        break;
      default:
        break;
    }
  };

  return (
    <Standard>
      <Head>
        <title> DondeMax - Shop</title>
      </Head>
      <Flex
        justify="center"
        align="center"
        height="75vh"
        bgSize="cover"
        backgroundRepeat="no-repeat"
        bgPos="center"
        bgImage="url('/images/header-2.png')"
      >
        <Header size="4xl" color="colors.rose.600">
          {t.shop.title}
        </Header>
      </Flex>
      <Flex padding="2em 3em" justify="space-between" align="center" position="relative" zIndex={3}>
        <Header size="md">{t.index.actionButton}</Header>
        <ProductTypeDropdown lang={locale} onChange={onChangeDropDown} selectedType={state.types} />
      </Flex>
      <Grid
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gridTemplateRows="minmax(300px, auto)"
        gridAutoRows="auto"
        gridAutoFlow="dense"
        justifyItems="center"
        minHeight="25vh"
        marginY="2em"
      >
        {loading ? (
          <Animation />
        ) : (
          data.searchProducts.results.map((i) => (
            <ProductCard
              id={i.id}
              lang={locale}
              key={i.id}
              rating={i.rate.value}
              timesValued={i.rate.times_valued}
              alt="image-test"
              src={i.image}
              price={`${i.precio}$`}
              name={i.name}
            />
          ))
        )}
      </Grid>
      <Flex align="center" justify="center" height="min-content">
        <Pagination
          pageItems={12}
          numberItems={state.total}
          page={state.page}
          next={next}
          last={lastItem}
          onClick={onClick}
        />
      </Flex>
    </Standard>
  );
};

export default store;
