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
import { ADD_TO_STORAGE, GET_DATA_MERCANCIA, DELETE_MATERIAL, UPDATE_MATERIAL, CREATE_MATERIAL } from "@/graphql";
import { mercancia as headers } from "@/utils/TablesHeader";
import dynamic from "next/dynamic";
const GeneratePDF = dynamic(() => import("@/organisms/PDF/GeneratePdf"), { ssr: false });
import Head from "next/head";

const mercancia = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenStore, onOpen: onOpenStore, onClose: onCloseStore } = useDisclosure();
  const { data, loading } = useQuery(GET_DATA_MERCANCIA, { pollInterval: 500 });
  const [deleteMutation] = useMutation(DELETE_MATERIAL);
  const [createMaterial, { error }] = useMutation(CREATE_MATERIAL, { onCompleted: onClose });
  const [addToStore] = useMutation(ADD_TO_STORAGE, { onCompleted: onCloseStore });
  const [updateMaterial] = useMutation(UPDATE_MATERIAL, { onCompleted: closeAndReset });
  const deleteMaterial = (e) => {
    deleteMutation(e);
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

  const onSubmit = ({ nombre, type }) => {
    createMaterial({ variables: { nombre: nombre, type: Number(type) } });
  };
  const resetState = () => setEditData({ ...defaultState });
  const closeAndReset = () => {
    resetState();
    onClose();
  };

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
  const columns = React.useMemo(
    (): Array<{ Header: string; accessor?: string; Cell?: any }> => [
      [
        ...headers[0],
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
      [...headers[1]],
      [...headers[2]],
    ],
    [],
  );
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
              <h1>Cargando ...</h1>
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
              <h1>Cargando ...</h1>
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
