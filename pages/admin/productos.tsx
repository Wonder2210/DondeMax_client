import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, useDisclosure, Grid } from "@chakra-ui/core";
import { IconButton } from "@/atoms/Buttons";
import { SubHeader } from "@/atoms/Text";
import { Icon } from "@iconify/react";
import Plus from "@iconify/icons-cil/plus";
import { ProductCardAdmin as Product } from "@/organisms/Cards";
import { Dashboard } from "@/layouts/Dashboard";
import { Products } from "@/organisms/Forms";

const GET = gql`
  query GetProducts {
    products(size: 10, cursor: 0) {
      total
      results {
        id
        name
        image
        info
        type
        precio
      }
    }
    materials {
      id
      type: nombre
    }
    productTypes {
      id: type
      type
    }
  }
`;

const ADD = gql`
  mutation AddProduct(
    $name: String!
    $price: Float!
    $materials: [MaterialProductInput!]!
    $image: Upload!
    $info: String!
    $type: String!
  ) {
    createProduct(
      product: { name: $name, precio: $price, materials: $materials, image: $image, info: $info, type: $type }
    ) {
      id
    }
  }
`;

const productos = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { data, loading } = useQuery(GET, { pollInterval: 500, variables: { size: 10, cursor: 0 } });
  const [mutate, { error }] = useMutation(ADD, { onCompleted: onClose });

  const onSubmit = ({ name, price, materials, image, info, type }) => {
    const data = {
      name,
      price,
      materials: materials.map((i) => ({ materialId: Number(i.id), quantity: parseFloat(i.quantity) })),
      image,
      info,
      type,
    };
    mutate({ variables: { ...data } });
  };
  if (error) {
    console.log(JSON.stringify(error.networkError, null, 2));
    console.log(error.graphQLErrors);
  }

  return (
    <Dashboard>
      {loading ? (
        <h1>Wait bro</h1>
      ) : (
        <>
          <Products
            values={{}}
            onEdit={(e) => console.log(e)}
            isEditing={false}
            isOpen={isOpen}
            onClose={onClose}
            materialList={data.materials}
            onSubmit={onSubmit}
            typeList={data.productTypes}
          />
          <Flex height="5em" justifyContent="space-between" alignItems="center">
            <SubHeader>Productos</SubHeader>
            <IconButton
              aria-label="add-more"
              onClick={onOpen}
              backgroundColor="colors.rose.600"
              icon={<Icon icon={Plus} color="white" />}
            />
          </Flex>
          <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" templateRows="minmax(300px, auto)">
            {data.products.results.map(({ id, name, image, info, type, precio }) => (
              <Product
                key={id}
                big={false}
                image={image}
                info={info}
                name={name}
                type={type}
                price={precio}
                onDelete={() => alert(id)}
                onUpdate={() => alert(id)}
              />
            ))}
          </Grid>
        </>
      )}
    </Dashboard>
  );
};

export default productos;
