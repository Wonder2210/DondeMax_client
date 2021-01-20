import React from "react";
import InitialCard from "./InitialCard";
import ProductCard from "./ProductCard";
import Product from "./ProductCardAdmin";
import NewCard from "./ProductCard";

export const NewCardTest = () => (
  <NewCard
    src="http://t1.gstatic.com/images?q=tbn:ANd9GcQi47DaoMOT1DeSAaahfQDaxs6AS5HZRMcMTLW_kh_M8dD9_P2yuaWkOdc90e4xcd35zEyyT1dN5o_wWBT1blQ"
    id={1}
    alt="new card"
    price="3500"
    name="Palmeras"
    isInCart
    onClick={() => alert("here")}
  />
);

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
      name="image-test"
      info="nothing"
      type="nothing"
      action={(e) => alert("alert here")}
      big={false}
      image="http://t1.gstatic.com/images?q=tbn:ANd9GcQi47DaoMOT1DeSAaahfQDaxs6AS5HZRMcMTLW_kh_M8dD9_P2yuaWkOdc90e4xcd35zEyyT1dN5o_wWBT1blQ"
    />
  );
};
export const ProductAdminTest = () => {
  return (
    <Product
      name="image-test"
      info="nothing"
      type="nothing"
      onUpdate={() => alert("alert here")}
      onDelete={() => alert("HERE")}
      big={false}
      image="http://t1.gstatic.com/images?q=tbn:ANd9GcQi47DaoMOT1DeSAaahfQDaxs6AS5HZRMcMTLW_kh_M8dD9_P2yuaWkOdc90e4xcd35zEyyT1dN5o_wWBT1blQ"
    />
  );
};

export default {
  title: "Organism/Cards",
};
