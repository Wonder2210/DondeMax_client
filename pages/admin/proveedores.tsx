import React from "react";
import { Dashboard } from "@/layouts/Dashboard";
import { useQuery, useMutation } from "@apollo/client";
import { Flex, useDisclosure, Stack, Skeleton } from "@chakra-ui/core";
import { Button } from "@/atoms/Buttons";
import { SubHeader } from "@/atoms/Text";
import { Icon } from "@iconify/react";
import Plus from "@iconify/icons-cil/plus";
import SkeletonLoader from "@/molecules/Loader/SkeletonLoader";
import { Provider } from "@/organisms/Forms";
import { GET_PROVIDERS, CREATE_PROVIDER, UPDATE_PROVIDER, DELETE_PROVIDER } from "@/graphql";
import { ProvidersTable } from "@/organisms/Table";
import Head from "next/head";

const initialState = {
  edit: false,
  data: {
    id: "",
    name: "",
    RIF: "",
    phone: "",
    direction: "",
  },
};

const proveedores = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = React.useRef();
  const [editData, setData] = React.useState({ ...initialState });
  const cleanState = () => setData({ ...initialState });
  const { data, loading } = useQuery(GET_PROVIDERS, { pollInterval: 500 });
  const [createProvider] = useMutation(CREATE_PROVIDER, { onCompleted: onClose });
  const [deleteProvider] = useMutation(DELETE_PROVIDER);
  const [updateProvider] = useMutation(UPDATE_PROVIDER, {
    onCompleted: () => {
      onClose();
      cleanState();
    },
  });

  const onSubmit = (values) => {
    createProvider({ variables: { ...values } });
  };
  const onUpdate = (row: any) => {
    setData({ edit: true, data: { ...row.original } });
    onOpen();
  };
  const onDelete = (row: any) => deleteProvider({ variables: { id: row.original.id } });
  const onCloseEdit = () => {
    cleanState();
    onClose();
  };
  const onEdit = (values) => {
    updateProvider({ variables: { id: editData.data.id, ...values } });
  };
  return (
    <Dashboard>
      <Head>
        <title>Admin - Proveedores</title>
      </Head>
      <Flex
        height="5em"
        justifyContent="space-between"
        paddingX={{
          base: ".4em",
          md: "2em",
        }}
        alignItems="center"
      >
        <SubHeader fontSize="1.5em" fontWeight="bold">
          Proveedores
        </SubHeader>
        <Button
          aria-label="add-more"
          onClick={onOpen}
          backgroundColor="colors.rose.600"
          height="1.9em"
          size="xl"
          width="12em"
          leftIcon={<Icon icon={Plus} color="white" />}
          borderRadius="8px"
        >
          Agregar proveedor
        </Button>
      </Flex>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <>
          <Provider
            isEditing={editData.edit}
            onEdit={onEdit}
            values={editData.data}
            isOpen={isOpen}
            onClose={onCloseEdit}
            onSubmit={onSubmit}
          />

          <ProvidersTable onDelete={onDelete} onUpdate={onUpdate} id="providers" data={data.providers} />
        </>
      )}
    </Dashboard>
  );
};

export default proveedores;
