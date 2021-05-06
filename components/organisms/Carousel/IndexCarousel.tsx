import React from "react";
import { Box } from "@chakra-ui/react";
import { CardSlider } from "@/organisms/Carousel";
import { InitialCard } from "@/organisms/Cards";
import Languages from "../../../locales";

type props = {
  lang: string;
};

const IndexCarousel: React.FC<props> = ({ lang }) => {
  const t = Languages(lang);
  return (
    <Box
      width="100%"
      alignItems="center"
      marginTop="auto"
      marginBottom={{
        base: "5.5em",
        lg: "1em",
      }}
    >
      <CardSlider>
        <InitialCard
          alt="image of test"
          href="/products"
          src="https://res.cloudinary.com/dy2f1moqn/image/upload/c_scale,q_auto:good,w_400/v1613704456/DondeMax/tortas_ry43ra.jpg"
        >
          {t.index.product1}
        </InitialCard>
        <InitialCard
          alt="image of test"
          href="/products"
          src="https://res.cloudinary.com/dy2f1moqn/image/upload/c_scale,q_auto:good,w_400/v1613704430/DondeMax/dulces_frios_pbsxjk.jpg"
        >
          {t.index.product2}
        </InitialCard>
        <InitialCard
          alt="image of test"
          href="/products"
          src="https://res.cloudinary.com/dy2f1moqn/image/upload/c_scale,q_auto:good,w_400/v1613704474/DondeMax/galletas_xxsi6s.jpg"
        >
          {t.index.product3}
        </InitialCard>
        <InitialCard
          alt="image of test"
          href="/products"
          src="https://res.cloudinary.com/dy2f1moqn/image/upload/c_scale,q_auto:good,w_464/v1613704491/DondeMax/pasapalos_dulces_jonylc.jpg"
        >
          {t.index.product4}
        </InitialCard>
      </CardSlider>
    </Box>
  );
};

export default IndexCarousel;
