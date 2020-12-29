import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Flex, useDisclosure, Grid } from "@chakra-ui/core";
import { IconButton } from "@/atoms/Buttons";
import { SubHeader } from "@/atoms/Text";
import { Icon } from "@iconify/react";
import Plus from "@iconify/icons-cil/plus";
import { ProductCardAdmin as Product } from "@/organisms/Cards";
import { Dashboard } from "@/layouts/Dashboard";
import { Products } from "@/organisms/Forms";
import Head from "next/head";
import Animation from "@/molecules/Loader/Animation";
import { GET_DATA_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from "@/graphql";

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
  const { data, loading } = useQuery(GET_DATA_PRODUCTS, { pollInterval: 500, variables: { size: 10, cursor: 0 } });
  const [mutate] = useMutation(ADD_PRODUCT, { onCompleted: onClose });
  const [deleteP] = useMutation(DELETE_PRODUCT);
  const [update, { error }] = useMutation(UPDATE_PRODUCT, { onCompleted: onClose });

  const onSubmit = ({ name, price, materials, image, info, type }) => {
    const values = {
      name,
      price,
      materials: materials.map((i) => ({ materialId: Number(i.id), quantity: parseFloat(i.quantity) })),
      image,
      info,
      type,
    };
    mutate({ variables: { ...values } });
  };
  const onUpdate = ({ name, price, materials, image, info, type }) => {
    const values = {
      id: state.data.id,
      name,
      precio: parseFloat(price),
      materials: materials.map((i) => ({ materialId: Number(i.id), quantity: parseFloat(i.quantity) })),
      image,
      info,
      type,
    };
    update({ variables: { ...values } });
    setState({ ...defaultState });
    onClose();
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
        <Animation />
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
            {data.searchProducts.results.map(({ id, name, image, info, type, available, precio, materials }) => (
              <Product
                key={id}
                big={false}
                image={image}
                info={info}
                name={name}
                type={type}
                available={available}
                price={precio}
                onStatus={() => update({ variables: { id, available: !available } })}
                onDelete={() => deleteP({ variables: { id } })}
                onUpdate={() =>
                  setUpdate({
                    id,
                    name,
                    image,
                    price: precio,
                    type,
                    info,
                    materials: materials.map((i) => ({
                      name: i.material.nombre,
                      id: i.material.id,
                      quantity: i.quantity,
                    })),
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
