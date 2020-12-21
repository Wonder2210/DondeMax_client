import React from "react";
import { Grid } from "@chakra-ui/core";
import { ProductCard } from "../Cards";

type props = {
  data: Array<{
    id: number;
    name: string;
    image: string;
    info: string;
    type: string;
  }>;
  action: (e: React.FormEvent) => void;
};

const Products: React.FC<props> = ({ data, action }) => {
  console.log(data);
  const onClick = (type) => (e) => action(type);
  const products = data.map((item) => {
    return (
      <ProductCard name={item.name} image={item.image} info={item.info} type={item.type} action={onClick(item.type)} />
    );
  });
  return (
    <Grid
      templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      gridTemplateRows="minmax(300px, auto)"
      gridAutoRows="auto"
      gridAutoFlow="dense"
      justifyContent="center"
      minHeight="25vh"
      marginTop="4em"
      width="100%"
    >
      {products}
    </Grid>
  );
};

export default Products;
