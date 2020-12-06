import React from "react";
import { Dashboard } from "@/layouts/Dashboard";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Flex, useDisclosure } from "@chakra-ui/core";
import { IconButton } from "@/atoms/Buttons";
import { SubHeader } from "@/atoms/Text";
import { Icon } from "@iconify/react";
import { TableActions } from "@/molecules/ActionButtons";
import Plus from "@iconify/icons-cil/plus";
import { CreateUser as User } from "@/organisms/Forms";
import { Table } from "@/organisms/Table";
import dynamic from "next/dynamic";
import { useAuth } from "@/utils/AuthHook";
import { usuarios as users } from "@/utils/TablesHeader";
import Animation from "@/molecules/Loader/Animation";
import { GET_DATA_USERS, UPDATE_USER, DELETE_USER, CREATE_USER } from "@/graphql";
const GeneratePDF = dynamic(() => import("@/organisms/PDF/GeneratePdf"), { ssr: false });
import Head from "next/head";

function usuarios() {
  const defaultState = {
    edit: false,
    data: {
      id: null,
      name: "",
      email: "",
      role: "",

      phone: "",
    },
  };
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, setState] = React.useState<{
    edit: boolean;
    data: {
      id?: number;
      name?: string;
      email?: string;
      role?: string;
      phone?: string;
    };
  }>(defaultState);
  const { data, loading } = useQuery(GET_DATA_USERS, { pollInterval: 500 });
  const [createUser] = useMutation(CREATE_USER, { onCompleted: onClose });
  const [updateUser] = useMutation(UPDATE_USER, { onCompleted: onClose });
  const [deleteUser, { error }] = useMutation(DELETE_USER, { onCompleted: onClose });

  if (error) {
    console.log(JSON.stringify(error.networkError, null, 2));
    console.log(error.graphQLErrors);
  }

  const onSubmit = (data) => {
    createUser({ variables: { ...data } });
  };

  const onUpdateUser = (data) => {
    updateUser({ variables: { id: state.data.id, ...data } });
  };

  const onDelete = (id) => {
    deleteUser({ variables: { id: parseInt(id) } });
  };
  const setEdit = (data) => {
    setState({ edit: true, data: { ...data } });
    onOpen();
  };

  const closeModal = () => {
    setState({ ...defaultState });
    onClose();
  };
  const headers = React.useMemo(() => [...users], []);
  return (
    <Dashboard>
      <Head>
        <title>Admin - Usuarios</title>
      </Head>
      {loading ? (
        <Animation />
      ) : (
        <>
          <User
            isEditing={state.edit}
            isOpen={isOpen}
            onClose={closeModal}
            typeList={[
              {
                id: "EMPLEADO",
                type: "EMPLEADO",
              },
              {
                id: "ADMINISTRADOR",
                type: "ADMINISTRADOR",
              },
            ]}
            onSubmit={onSubmit}
            onEdit={onUpdateUser}
            values={{ ...state.data }}
          />
          <Flex height="5em" justifyContent="space-between" paddingX="5em" alignItems="center">
            <SubHeader>Usuarios</SubHeader>

            <Flex width="10em" paddingX="3em" justifyContent="space-between" alignItems="center">
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
          <Table
            columns={
              user.role == "ADMINISTRADOR"
                ? [
                    ...headers,
                    {
                      Header: "Acciones",
                      Cell: ({ row }) => (
                        <TableActions
                          onDelete={() =>
                            user.id != row.original.id
                              ? onDelete(row.original.id)
                              : alert("no puedes borrarte a ti mismo")
                          }
                          onUpdate={() => {
                            setEdit(row.original);
                          }}
                        />
                      ),
                    },
                  ]
                : headers
            }
            data={data.users}
          />
        </>
      )}
    </Dashboard>
  );
}

export default usuarios;
