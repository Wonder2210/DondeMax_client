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
const GeneratePDF = dynamic(() => import("@/organisms/PDF/GeneratePdf"), { ssr: false });

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      role
      phone
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!, $role: UserRole!, $phone: String!) {
    createUser(user: { name: $name, email: $email, password: $password, role: $role, phone: $phone }) {
      id
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`;

const UPDATE_USER = gql`
  mutation editUser($id: Int!, $name: String, $email: String, $password: String, $role: UserRole, $phone: String) {
    editUser(user: { id: $id, name: $name, phone: $phone, email: $email, password: $password, role: $role }) {
      id
      name
    }
  }
`;
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
  const { data, loading } = useQuery(GET_USERS, { pollInterval: 500 });
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
        Header: "Rol",
        accessor: "role",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Telefono",
        accessor: "phone",
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
          <Flex height="5em" justifyContent="space-between" alignItems="center">
            <SubHeader>Usuarios</SubHeader>

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
          <Table
            columns={
              user.role == "ADMINISTRADOR"
                ? [
                    ...headers,
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
