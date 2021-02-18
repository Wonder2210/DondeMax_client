/* eslint-disable camelcase */
import React from "react";
import { Dashboard } from "@/layouts/Dashboard";
import { useQuery, useMutation } from "@apollo/client";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { Button } from "@/atoms/Buttons";
import { SubHeader } from "@/atoms/Text";
import Head from "next/head";
import { Icon } from "@iconify/react";
import Plus from "@iconify/icons-cil/plus";
import { CreateUser as Client } from "@/organisms/Forms";
import SkeletonLoader from "@/molecules/Loader/SkeletonLoader";
import { CustomerTable } from "@/organisms/Table";
import { GET_DATA_CLIENTS, CREATE_CLIENT, DELETE_CLIENT, UPDATE_CLIENT } from "@/graphql";

function clientes() {
  const defaultState = {
    edit: false,
    data: {
      id: null,
      name: "",
      email: "",
      last_name: "",
      password: "",
      phone: "",
    },
  };
  const [state, setState] = React.useState<{
    edit: boolean;
    data: {
      id?: number;
      name?: string;
      email?: string;
      last_name?: string;
      password?: string;
      phone?: string;
    };
  }>(defaultState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading } = useQuery(GET_DATA_CLIENTS, { pollInterval: 500 });
  const [createClient, { error }] = useMutation(CREATE_CLIENT, { onCompleted: onClose });
  const [updateClient] = useMutation(UPDATE_CLIENT, { onCompleted: onClose });
  const [deleteClient] = useMutation(DELETE_CLIENT, { onCompleted: onClose });

  if (error) {
    console.log(JSON.stringify(error.networkError, null, 2));
    console.log(error.graphQLErrors);
  }
  const onDelete = (row: any) => {
    deleteClient({ variables: { id: parseInt(row.original.id, 10) } });
  };
  const onUpdateClient = (values) => {
    updateClient({ variables: { id: state.data.id, ...values } });
  };
  const onSubmit = (values) => {
    createClient({ variables: { ...values, role: "CLIENTE" } });
    setState({ ...defaultState });
  };
  const closeModal = () => {
    setState({ ...defaultState });
    onClose();
  };
  const onUpdate = (row: any) => {
    setState({ edit: true, data: { ...row.original } });
    onOpen();
  };

  return (
    <Dashboard>
      <Head>
        <title>Admin - Clientes</title>
      </Head>
      <Flex height="5em" justifyContent="space-between" paddingX="2em" alignItems="center">
        <SubHeader fontSize="1.5em" fontWeight="bold">
          Clientes
        </SubHeader>
        <Button
          aria-label="add-more"
          onClick={onOpen}
          backgroundColor="colors.rose.600"
          height="1.9em"
          width="12em"
          leftIcon={<Icon icon={Plus} color="white" />}
          borderRadius="8px"
        >
          Agregar Cliente
        </Button>
      </Flex>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <>
          <Client
            isEditing={state.edit}
            isOpen={isOpen}
            onClose={closeModal}
            onSubmit={onSubmit}
            onEdit={onUpdateClient}
            values={{ ...state.data }}
          />
          <CustomerTable onDelete={onDelete} id="customers" onUpdate={onUpdate} data={data.clients} />
        </>
      )}
    </Dashboard>
  );
}

export default clientes;
