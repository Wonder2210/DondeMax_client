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
import Head from "next/head";

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
        available
        materials {
          quantity
          id
          name: material {
            nombre
          }
        }
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

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: Int!
    $name: String
    $precio: Float
    $type: String
    $info: String
    $materials: [MaterialProductInput]
    $available: Boolean
  ) {
    updateProduct(
      product: {
        id: $id
        name: $name
        precio: $precio
        type: $type
        info: $info
        materials: $materials
        available: $available
      }
    ) {
      id
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id)
  }
`;

const productos = () => {
  const defaultState = {
    edit: false,
    data: {
      id: null,
      name: "",
      price: "",
      image: "",
      type: "",
      info: "",
      materials: [],
    },
  };
  const [state, setState] = React.useState(defaultState);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { data, loading } = useQuery(GET, { pollInterval: 500, variables: { size: 10, cursor: 0 } });
  const [mutate] = useMutation(ADD, { onCompleted: onClose });
  const [deleteP] = useMutation(DELETE_PRODUCT);
  const [update, { error }] = useMutation(UPDATE_PRODUCT, { onCompleted: onClose });

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
  const onUpdate = ({ name, price, materials, image, info, type }) => {
    const data = {
      id: state.data.id,
      name,
      precio: parseFloat(price),
      materials: materials.map((i) => ({ materialId: Number(i.id), quantity: parseFloat(i.quantity) })),
      image,
      info,
      type,
    };
    update({ variables: { ...data } });
    setState({ ...defaultState });
  };

  const setUpdate = ({ id, name, price, image, type, info, materials }) => {
    setState({ edit: true, data: { id, name, image, price, type, info, materials } });
    onOpen();
  };

  if (error) {
    console.log(JSON.stringify(error.networkError, null, 2));
    console.log(error.graphQLErrors);
  }

  return (
    <Dashboard>
         <Head>
            <title>Admin - Productos</title>
            </Head>
      {loading ? (
        <h1>Wait bro</h1>
      ) : (
        <>
          <Products
            values={state.data}
            onEdit={onUpdate}
            isEditing={state.edit}
            isOpen={isOpen}
            onClose={() => {
              onClose();
              setState({ ...defaultState });
            }}
            materialList={data.materials}
            onSubmit={onSubmit}
            typeList={data.productTypes}
          />
          <Flex height="5em" paddingX="3em" justifyContent="space-between" alignItems="center">
            <SubHeader>Productos</SubHeader>
            <IconButton
              aria-label="add-more"
              onClick={onOpen}
              backgroundColor="colors.rose.600"
              icon={<Icon icon={Plus} color="white" />}
            />
          </Flex>
          <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" templateRows="minmax(300px, auto)">
            {data.products.results.map(({ id, name, image, info, type, available, precio, materials }) => (
              <Product
                key={id}
                big={false}
                image={image}
                info={info}
                name={name}
                type={type}
                available={available}
                price={precio}
                onStatus={() => update({ variables: { id: id, available: !available } })}
                onDelete={() => deleteP({ variables: { id: id } })}
                onUpdate={() =>
                  setUpdate({
                    id,
                    name,
                    image,
                    price: precio,
                    type,
                    info,
                    materials: materials.map((i) => ({ name: i.name.nombre, id: i.id, quantity: i.quantity })),
                  })
                }
              />
            ))}
          </Grid>
        </>
      )}
    </Dashboard>
  );
};

export default productos;
