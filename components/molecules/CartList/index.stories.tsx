import React from "react";
import CratList from "./CartList";
import ProductCard from "./ProductCard";

export const test = () => {
  return <CratList />;
};

export const testCard = () => {
  const onChange = (e, val) => console.log(val);
  return (
    <>
      <ProductCard
        image="http://t1.gstatic.com/images?q=tbn:ANd9GcQi47DaoMOT1DeSAaahfQDaxs6AS5HZRMcMTLW_kh_M8dD9_P2yuaWkOdc90e4xcd35zEyyT1dN5o_wWBT1blQ"
        name="test"
        price={1000}
        total={0}
        onChange={onChange}
      />
      <ProductCard
        image="http://t1.gstatic.com/images?q=tbn:ANd9GcQi47DaoMOT1DeSAaahfQDaxs6AS5HZRMcMTLW_kh_M8dD9_P2yuaWkOdc90e4xcd35zEyyT1dN5o_wWBT1blQ"
        name="test"
        price={1000}
        total={0}
        onChange={onChange}
      />
      <ProductCard
        image="http://t1.gstatic.com/images?q=tbn:ANd9GcQi47DaoMOT1DeSAaahfQDaxs6AS5HZRMcMTLW_kh_M8dD9_P2yuaWkOdc90e4xcd35zEyyT1dN5o_wWBT1blQ"
        name="test"
        price={1000}
        total={0}
        onChange={onChange}
      />
    </>
  );
};

export default {
  title: "Atoms/CartList",
};
