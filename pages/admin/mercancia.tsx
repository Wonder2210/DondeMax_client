// @ts-nocheck
import React from "react";
import { Dashboard } from "@/layouts/Dashboard";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, useDisclosure } from "@chakra-ui/core";
import { IconButton, Button } from "@/atoms/Buttons";
import { SubHeader } from "@/atoms/Text";
import { Icon } from "@iconify/react";
import { TableActions } from "@/molecules/ActionButtons";
import { Table } from "@/organisms/Table";
import Plus from "@iconify/icons-cil/plus";
import input from "@iconify/icons-cil/input";
import { Mercancia, Storage } from "@/organisms/Forms";
import { CREATE_MATERIAL, DELETE_MATERIAL, GET_MERCANCIA, UPDATE_MATERIAL } from "@/utils/queries";
import dynamic from "next/dynamic";
const GeneratePDF = dynamic(() => import("@/organisms/PDF/GeneratePdf"), { ssr: false });
import Head from "next/head";
const GET_INVENTARIO = gql`
  query GetStorage {
    storage {
      id
      expiration_date
      brand
      uniteds
      weight
      united_weight
      material {
        id
        nombre
        type {
          name
        }
      }
      provider {
        name
        RIF
        phone
        direction
      }
    }
    materialsStage {
      id
      name
      uniteds
      weight
    }
    providers {
      name
      id
    }
    materials {
      id
      nombre
      onStock {
        uniteds
        weight
      }
      type {
        id
        name
      }
    }
    materialTypes {
      id
      type: name
    }
  }
`;

const ADD_TO_STORAGE = gql`
  mutation AddToStorage(
    $materialId: Int!
    $providerId: Int!
    $uniteds: Int!
    $expirationDate: String!
    $brand: String!
    $weight: Float!
    $united_weight: Float!
  ) {
    addToStore(
      store: {
        materialsId: $materialId
        providerId: $providerId
        uniteds: $uniteds
        united_weight: $united_weight
        expirationDate: $expirationDate
        brand: $brand
        weight: $weight
      }
    ) {
      id
    }
  }
`;

const mercancia = () => {
  const { data, loading } = useQuery(GET_INVENTARIO, { pollInterval: 500 });
  const deleteMaterial = (e) => {
    console.log(e);
  };
  const defaultState = {
    edit: false,
    data: {
      id: 0,
      type: 0,
      nombre: "",
    },
  };

  const [editData, setEditData] = React.useState(defaultState);
  const columns = React.useMemo(
    () => [
      [
        {
          Header: "ID",
          accessor: "id",
        },

        {
          Header: "Nombre",
          accessor: "nombre",
        },
        {
          Header: "Peso Total",
          accessor: "onStock.weight",
        },
        {
          Header: "Unidades totales",
          accessor: "onStock.uniteds",
        },
        {
          Header: "Tipo",
          accessor: "type",
          Cell: ({ value }) => String(value.name),
        },
        {
          Header: "Acciones",
          Cell: ({ row }) => (
            <TableActions
              onDelete={() => deleteMaterial({ variables: { id: row.original.id } })}
              onUpdate={() => {
                setEditData({
                  edit: true,
                  data: { id: row.original.id, type: row.original.type.id, nombre: row.original.nombre },
                });
                onOpen();
              }}
            />
          ),
        },
      ],
      [
        {
          Header: "ID",
          accessor: "id",
        },
        {
          Header: "Material",
          accessor: "material.nombre",
        },
        {
          Header: "Marca",
          accessor: "brand",
        },
        {
          Header: "Unidades",
          accessor: "uniteds",
        },

        {
          Header: "Peso c/u",
          accessor: "weight",
          Cell: ({ value }) => String(value + "Kg"),
        },
        {
          Header: "Peso Neto",
          Cell: ({ row }) => String(row.original["uniteds"] * row.original["weight"] + "Kg"),
        },
        {
          Header: "Tipo",
          accessor: "material.type.name",
        },
        {
          Header: "Proveedor",
          accessor: "provider.name",
        },
        {
          Header: "Fecha de Vencimiento",
          accessor: "expiration_date",
          Cell: ({ value }) => {
            const date = new Date(Number(value));

            const day = date.getDay();
            const month = date.getMonth();
            const year = date.getFullYear();

            return day + "-" + month + "-" + year;
          },
        },
      ],
      [
        {
          Header: "tipo",
          accessor: "name",
        },

        {
          Header: "Peso",
          accessor: "weight",
          Cell: ({ value }) => `${value}Kg`,
        },
      ],
    ],
    [],
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenStore, onOpen: onOpenStore, onClose: onCloseStore } = useDisclosure();

  const [createMaterial, { error }] = useMutation(CREATE_MATERIAL, { onCompleted: onClose });
  const [addToStore] = useMutation(ADD_TO_STORAGE, { onCompleted: onCloseStore });
  const onSubmit = ({ nombre, type }) => {
    createMaterial({ variables: { nombre: nombre, type: Number(type) } });
  };
  const resetState = () => setEditData({ ...defaultState });
  const closeAndReset = () => {
    resetState();
    onClose();
  };
  const [updateMaterial] = useMutation(UPDATE_MATERIAL, { onCompleted: closeAndReset });
  const onEdit = (data) =>
    updateMaterial({ variables: { id: editData.data.id, nombre: data.nombre, type: Number(data.type) } });
  const submitStore = (data) =>
    addToStore({
      variables: {
        ...data,
        providerId: parseInt(data.providerId),
        materialId: parseInt(data.materialId),
        uniteds: parseInt(data.uniteds),
        weight: parseFloat(data.weight),
        united_weight: parseFloat(data.united_weight),
      },
    });

  if (error) {
    console.log(JSON.stringify(error.networkError, null, 2));
    console.log(error.graphQLErrors);
  }

  return (
    <Dashboard>
         <Head>
            <title>Admin - Mercancia</title>
            </Head>
      <Tabs>
        <TabList>
          <Tab>Materiales</Tab>
          <Tab>Ingresos a inventario</Tab>
          <Tab>Materiales disponible</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {loading ? (
              <h1>Loading bro</h1>
            ) : (
              <>
                <Mercancia
                  isOpen={isOpen}
                  onClose={closeAndReset}
                  isEditing={editData.edit}
                  onSubmit={onSubmit}
                  typeList={data.materialTypes}
                  onEdit={onEdit}
                  values={editData.data}
                />
                <Flex height="5em" paddingX="3em" justifyContent="space-between" alignItems="center">
                  <SubHeader>Mercancia</SubHeader>
                  <Flex width="10em" justifyContent="space-between" alignItems="center">
                    <GeneratePDF
                      tableId="#materials"
                      columns={columns[0]
                        .map((i) => ({ header: i.Header, dataKey: i.accessor }))
                        .filter((i) => i.header !== "Acciones")}
                    />
                    <IconButton
                      aria-label="add-more"
                      onClick={onOpen}
                      backgroundColor="colors.rose.600"
                      icon={<Icon icon={Plus} color="white" />}
                    />
                  </Flex>
                </Flex>
                <Table columns={columns[0]} id="materials" data={data.materials} />
              </>
            )}
          </TabPanel>
          <TabPanel>
            {loading ? (
              <h1>Loading hold on</h1>
            ) : (
              <>
                <Storage
                  onEdit={(e) => alert("nada bro")}
                  isEditing={false}
                  values={{}}
                  onClose={onCloseStore}
                  isOpen={isOpenStore}
                  onSubmit={submitStore}
                  providersList={data.providers.map((i) => ({ id: i.id, type: i.name }))}
                  materialList={data.materials.map((i) => ({ id: i.id, type: i.nombre }))}
                />
                <Flex height="5em" paddingX="3em" justifyContent="space-between" alignItems="center">
                  <SubHeader> Inventario </SubHeader>
                  <Flex width="10em" justifyContent="space-between" alignItems="center">
                    <GeneratePDF
                      tableId="#inventario"
                      columns={columns[1]
                        .map((i) => ({ header: i.Header, dataKey: i.accessor }))
                        .filter((i) => i.header !== "Acciones")}
                    />
                    <IconButton
                      aria-label="add-more"
                      onClick={onOpenStore}
                      backgroundColor="colors.rose.600"
                      icon={<Icon icon={Plus} color="white" />}
                    />
                  </Flex>
                </Flex>
                <Table columns={columns[1]} id="inventario" data={data.storage} />
              </>
            )}
          </TabPanel>
          <TabPanel>
            {loading ? (
              <h1>Loading hold on</h1>
            ) : (
              <>
                <Flex height="5em" justifyContent="space-between" alignItems="center">
                  <SubHeader> Materia disponible </SubHeader>
                  <Flex width="10em" justifyContent="space-between" alignItems="center">
                    <GeneratePDF
                      tableId="#disponible"
                      columns={columns[2]
                        .map((i) => ({ header: i.Header, dataKey: i.accessor }))
                        .filter((i) => i.header !== "Acciones")}
                    />
                  </Flex>
                </Flex>
                <Table columns={columns[2]} id="disponible" data={data.materialsStage} />
              </>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Dashboard>
  );
};

export default mercancia;
