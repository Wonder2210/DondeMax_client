import React from "react";
import { Dashboard } from "@/layouts/Dashboard";
import { useQuery, useMutation } from "@apollo/client";
import { Flex, Stack, Skeleton, useDisclosure } from "@chakra-ui/core";
import { Button } from "@/atoms/Buttons";
import { SubHeader } from "@/atoms/Text";
import { Icon } from "@iconify/react";
import Plus from "@iconify/icons-cil/plus";
import { CreateUser as User } from "@/organisms/Forms";
import { UsersTable } from "@/organisms/Table";
import { useAuth } from "@/utils/AuthHook";
import { GET_DATA_USERS, UPDATE_USER, DELETE_USER, CREATE_USER } from "@/graphql";
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

  const onSubmit = (values) => {
    createUser({ variables: { ...values } });
  };
  const onDelete = (id) => {
    deleteUser({ variables: { id: parseInt(id, 10) } });
  };

  const onClickDeleteUser = (row: any) =>
    user.id !== row.original.id ? onDelete(row.original.id) : alert("no puedes borrarte a ti mismo");

  const setEdit = (values) => {
    setState({ edit: true, data: { ...values } });
    onOpen();
  };
  const onClickUpdateUser = (row: any) => {
    setEdit(row.original);
  };

  const onUpdateUser = (values) => {
    updateUser({ variables: { id: state.data.id, ...values } });
  };

  const closeModal = () => {
    setState({ ...defaultState });
    onClose();
  };
  return (
    <Dashboard>
      <Head>
        <title>Admin - Usuarios</title>
      </Head>
      <Flex height="5em" justifyContent="space-between" paddingX="2em" alignItems="center">
        <SubHeader fontSize="1.5em" fontWeight="bold">
          Usuarios
        </SubHeader>
        <Button
          aria-label="add-more"
          onClick={onOpen}
          backgroundColor="colors.rose.600"
          height="1.9em"
          width="11em"
          leftIcon={<Icon icon={Plus} color="white" />}
          borderRadius="8px"
        >
          Agregar Usuario
        </Button>
      </Flex>
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
          <UsersTable
            id="users"
            onUpdate={onClickUpdateUser}
            onDelete={onClickDeleteUser}
            isAdmin={user.role === "ADMINISTRADOR"}
            data={data.users}
          />
        </>
      )}
    </Dashboard>
  );
}

export default usuarios;
