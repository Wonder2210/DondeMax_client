import React from "react";
import { Dashboard } from "@/layouts/Dashboard";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Flex, useDisclosure } from "@chakra-ui/core";
import { IconButton } from "@/atoms/Buttons";
import { SubHeader } from "@/atoms/Text";
import { Icon } from "@iconify/react";
import { TableActions } from "@/molecules/ActionButtons";
import Plus from "@iconify/icons-cil/plus";
import { CreateClient as Client } from "@/organisms/Forms";
import { Table } from "@/organisms/Table";
import dynamic from "next/dynamic";
const GeneratePDF = dynamic(() => import("@/organisms/PDF/GeneratePdf"), { ssr: false });

const GET_CLIENTS = gql`
  query GetClients {
    clients {
      id
      name
      cedula
      nationality
      phone
    }
  }
`;

const CREATE_CLIENT = gql`
  mutation CreateClient($nationality: String!, $name: String!, $cedula: String!, $phone: String!) {
    createClient(client: { name: $name, cedula: $cedula, phone: $phone, nationality: $nationality }) {
      id
      name
    }
  }
`;

const UPDATE_CLIENT = gql`
  mutation updateClient($id: Int!, $nationality: String!, $name: String!, $cedula: String!, $phone: String!) {
    editClient(client: { id: $id, name: $name, cedula: $cedula, phone: $phone, nationality: $nationality }) {
      id
      name
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation DeleteClient($id: Int!) {
    deleteClient(id: $id)
  }
`;

function clientes() {
  const defaultState = {
    edit: false,
    data: {
      id: null,
      name: "",
      nationality: "",
      cedula: "",

      phone: "",
    },
  };
  const [state, setState] = React.useState<{
    edit: boolean;
    data: {
      id?: number;
      name?: string;
      nationality?: string;
      cedula?: string;

      phone?: string;
    };
  }>(defaultState);
  const { data, loading } = useQuery(GET_CLIENTS, { pollInterval: 500 });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createClient, { error }] = useMutation(CREATE_CLIENT, { onCompleted: onClose });
  const [updateClient] = useMutation(UPDATE_CLIENT, { onCompleted: onClose });
  const [deleteClient] = useMutation(DELETE_CLIENT, { onCompleted: onClose });

  if (error) {
    console.log(JSON.stringify(error.networkError, null, 2));
    console.log(error.graphQLErrors);
  }
  const setEdit = (data) => {
    setState({ edit: true, data: { ...data } });
    onOpen();
  };
  const onDelete = (id) => {
    deleteClient({ variables: { id: parseInt(id) } });
  };
  const onUpdateClient = (data) => {
    updateClient({ variables: { id: state.data.id, ...data } });
  };
  const onSubmit = (data) => {
    createClient({ variables: { ...data } });
    setState({ ...defaultState });
  };
  const closeModal = () => {
    setState({ ...defaultState });
    onClose();
  };
  const headers = React.useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "Nacionalidad",
        accessor: "nationality",
      },
      {
        Header: "Cedula",
        accessor: "cedula",
      },
      {
        Header: "Telefono",
        accessor: "phone",
      },
      {
        Header: "Acciones",
        Cell: ({ row }) => (
          <TableActions
            onDelete={() => onDelete(row.original.id)}
            onUpdate={() => {
              setEdit(row.original);
            }}
          />
        ),
      },
    ],
    [],
  );
  return (
    <Dashboard>
      {loading ? (
        "Cargando"
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
          <Table columns={headers} data={data.clients} />
        </>
      )}
    </Dashboard>
  );
}

export default clientes;
