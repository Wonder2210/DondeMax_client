import React from "react";
import InitialCard from "./InitialCard";
import ProductCard from "./ProductCard";

export const InitialCardTest = () => {
  return (
    <InitialCard
      alt="image of test"
      href="/"
      src="http://t1.gstatic.com/images?q=tbn:ANd9GcQi47DaoMOT1DeSAaahfQDaxs6AS5HZRMcMTLW_kh_M8dD9_P2yuaWkOdc90e4xcd35zEyyT1dN5o_wWBT1blQ"
    >
      Here we are
    </InitialCard>
  );
};

export const ProductCardTest = () => {
  return (
    <ProductCard
      alt="image-test"
      src="http://t1.gstatic.com/images?q=tbn:ANd9GcQi47DaoMOT1DeSAaahfQDaxs6AS5HZRMcMTLW_kh_M8dD9_P2yuaWkOdc90e4xcd35zEyyT1dN5o_wWBT1blQ"
      price="2500usd"
      name="Ponque de chocolate"
      isInCart
    />
  );
};

export default {
  title: "Organism/Cards",
};
