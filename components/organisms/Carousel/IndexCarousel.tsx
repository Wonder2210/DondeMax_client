import React from "react";
import { Box } from "@chakra-ui/core";
import { CardSlider } from "@/organisms/Carousel";
import { InitialCard } from "@/organisms/Cards";
import Languages from "../../../locales";

type props = {
  lang: string;
};

const IndexCarousel: React.FC<props> = ({ lang }) => {
  const t = Languages(lang);
  return (
    <Box width="100%" alignItems="center" marginTop="auto" marginBottom="1em">
      <CardSlider>
        <InitialCard alt="image of test" href="/products" src="/images/tortas.jpg">
          {t.index.product1}
        </InitialCard>
        <InitialCard alt="image of test" href="/products" src="/images/dulces_frios.jpg">
          {t.index.product2}
        </InitialCard>
        <InitialCard alt="image of test" href="/products" src="/images/galletas.jpg">
          {t.index.product3}
        </InitialCard>
        <InitialCard alt="image of test" href="/products" src="/images/pasapalos_dulces.jpg">
          {t.index.product4}
        </InitialCard>
      </CardSlider>
    </Box>
  );
};

export default IndexCarousel;
