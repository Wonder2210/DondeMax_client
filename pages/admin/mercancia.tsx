// @ts-nocheck
import React from "react";
import { Dashboard } from "@/layouts/Dashboard";
import { useQuery, useMutation } from "@apollo/client";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, useDisclosure, Stack, Skeleton } from "@chakra-ui/core";
import { Button } from "@/atoms/Buttons";
import { SubHeader } from "@/atoms/Text";
import { Icon } from "@iconify/react";
import { MaterialsTable, MaterialsAvailableTable, StockIncomeTable } from "@/organisms/Table";
import Plus from "@iconify/icons-cil/plus";
import { Mercancia, Storage } from "@/organisms/Forms";
import { ADD_TO_STORAGE, GET_DATA_MERCANCIA, DELETE_MATERIAL, UPDATE_MATERIAL, CREATE_MATERIAL } from "@/graphql";
import Head from "next/head";

const mercancia = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenStore, onOpen: onOpenStore, onClose: onCloseStore } = useDisclosure();
  const { data, loading } = useQuery(GET_DATA_MERCANCIA, { pollInterval: 500 });
  const [deleteMutation] = useMutation(DELETE_MATERIAL);
  const [createMaterial, { error }] = useMutation(CREATE_MATERIAL, { onCompleted: onClose });
  const [addToStore] = useMutation(ADD_TO_STORAGE, { onCompleted: onCloseStore });
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

  const onDeleteMaterials = (row: any) => deleteMaterial({ variables: { id: row.original.id } });
  const [editData, setEditData] = React.useState(defaultState);
  const onUpdateMaterials = (row: any) => {
    setEditData({
      edit: true,
      data: { id: row.original.id, type: row.original.type.id, nombre: row.original.nombre },
    });
    onOpen();
  };
  const onSubmit = ({ nombre, type }) => {
    createMaterial({ variables: { nombre, type: Number(type) } });
  };
  const resetState = () => setEditData({ ...defaultState });
  const closeAndReset = () => {
    resetState();
    onClose();
  };
  const [updateMaterial] = useMutation(UPDATE_MATERIAL, { onCompleted: closeAndReset });

  const onEdit = (values) =>
    updateMaterial({ variables: { id: editData.data.id, nombre: values.nombre, type: Number(values.type) } });
  const submitStore = (values) =>
    addToStore({
      variables: {
        ...data,
        providerId: parseInt(values.providerId, 10),
        materialId: parseInt(values.materialId, 10),
        uniteds: parseInt(values.uniteds, 10),
        weight: parseFloat(values.weight),
        united_weight: parseFloat(values.united_weight),
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
      <Flex height="5em" justifyContent="space-between" paddingX="2em" alignItems="center">
        <SubHeader fontSize="1.5em" fontWeight="bold">
          Mercancia
        </SubHeader>
        <Flex
          alignItems="flex-end"
          flexDirection={{
            base: "column",
            md: "row",
          }}
        >
          <Button
            aria-label="add-more"
            onClick={onOpen}
            variant="outline"
            borderColor="colors.rose.600"
            backgroundColor="transparent"
            color="colors.rose.600"
            height="1.9em"
            width="12em"
            leftIcon={<Icon icon={Plus} color="#e91e63" />}
            borderRadius="8px"
            marginRight={{
              base: "0em",
              md: ".4em",
            }}
          >
            Agregar Materiales
          </Button>
          <Button
            aria-label="add-more"
            onClick={onOpenStore}
            backgroundColor="colors.rose.600"
            height="1.9em"
            width="12em"
            leftIcon={<Icon icon={Plus} color="white" />}
            borderRadius="8px"
          >
            Agregar Mercancia
          </Button>
        </Flex>
      </Flex>
      <Tabs>
        <TabList>
          <Tab>Materiales</Tab>
          <Tab>Ingresos a inventario</Tab>
          <Tab>Materiales disponible</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {loading ? (
              <Stack spacing={3} width="100%" paddingX="2em" marginTop="4em">
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
              </Stack>
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

                <MaterialsTable
                  onDelete={onDeleteMaterials}
                  onUpdate={onUpdateMaterials}
                  id="materials"
                  data={data.materials}
                />
              </>
            )}
          </TabPanel>
          <TabPanel>
            {loading ? (
              <Stack spacing={3} width="100%" paddingX="2em" marginTop="4em">
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
              </Stack>
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
                <StockIncomeTable id="inventario" data={data.storage} />
              </>
            )}
          </TabPanel>
          <TabPanel>
            {loading ? (
              <Stack spacing={3} width="100%" paddingX="2em" marginTop="4em">
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
                <Skeleton height="25px" />
              </Stack>
            ) : (
              <MaterialsAvailableTable id="disponible" data={data.materialsStage} />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Dashboard>
  );
};

export default mercancia;
