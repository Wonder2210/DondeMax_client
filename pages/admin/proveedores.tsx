import React from "react";
import { Dashboard } from "@/layouts/Dashboard";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Flex, useDisclosure } from "@chakra-ui/core";
import { IconButton } from "@/atoms/Buttons";
import { SubHeader } from "@/atoms/Text";
import { Icon } from "@iconify/react";
import { TableActions } from "@/molecules/ActionButtons";
import Plus from "@iconify/icons-cil/plus";
import { Provider } from "@/organisms/Forms";
import Animation from "@/molecules/Loader/Animation";
import { GET_PROVIDERS, CREATE_PROVIDER, UPDATE_PROVIDER, DELETE_PROVIDER } from "@/graphql";
import { Table } from "@/organisms/Table";
import dynamic from "next/dynamic";
const GeneratePDF = dynamic(() => import("@/organisms/PDF/GeneratePdf"), { ssr: false });
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
  const { data, loading } = useQuery(GET_PROVIDERS, { pollInterval: 500 });
  const [createProvider] = useMutation(CREATE_PROVIDER, { onCompleted: onClose });
  const [deleteProvider] = useMutation(DELETE_PROVIDER);
  const [updateProvider] = useMutation(UPDATE_PROVIDER, {
    onCompleted: () => {
      onClose();
      cleanState();
    },
  });
  const [editData, setData] = React.useState({ ...initialState });

  const cleanState = () => setData({ ...initialState });
  const headers = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "RIF",
        accessor: "RIF",
      },
      {
        Header: "Telefono",
        accessor: "phone",
      },
      {
        Header: "Direccion",
        accessor: "direction",
      },
      {
        Header: "Acciones",
        Cell: ({ row }) => (
          <TableActions
            onDelete={() => deleteProvider({ variables: { id: row.original["id"] } })}
            onUpdate={() => {
              setData({ edit: true, data: { ...row.original } });
              onOpen();
            }}
          />
        ),
      },
    ],
    [],
  );
  const onSubmit = (data) => {
    createProvider({ variables: { ...data } });
  };

  const onCloseEdit = () => {
    cleanState();
    onClose();
  };
  const onEdit = (data) => {
    updateProvider({ variables: { id: editData.data.id, ...data } });
  };
  return (
    <Dashboard>
      <Head>
        <title>Admin - Proveedores</title>
      </Head>
      {loading ? (
        <Animation />
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
          <Flex height="5em" paddingX="3em" justifyContent="space-between" alignItems="center">
            <SubHeader>Proveedores</SubHeader>

            <Flex width="10em" justifyContent="space-between" alignItems="center">
              <GeneratePDF
                columns={headers
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
          <Table ref={ref} columns={headers} data={data.providers} />
        </>
      )}
    </Dashboard>
  );
};

export default proveedores;
