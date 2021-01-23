import React from "react";
import { Box } from "@chakra-ui/core";
import { CardSlider } from "@/organisms/Carousel";
import { InitialCard } from "@/organisms/Cards";

const IndexCarousel = () => {
  return (
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
  );
};

export default IndexCarousel;
