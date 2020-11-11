import React from "react";
import InitialCard from "./InitialCard";
import ProductCardShop from "./ProductCardShop";
import ProductCard from "./ProductCard";
import Product from "./ProductCardAdmin";

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

export const ProductCardShopTest = () => {
  return (
    <ProductCardShop
      alt="image-test"
      src="http://t1.gstatic.com/images?q=tbn:ANd9GcQi47DaoMOT1DeSAaahfQDaxs6AS5HZRMcMTLW_kh_M8dD9_P2yuaWkOdc90e4xcd35zEyyT1dN5o_wWBT1blQ"
      price="2500usd"
      name="Ponque de chocolate"
      isInCart
    />
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
