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
import { Table } from "@/organisms/Table";
import dynamic from "next/dynamic";
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

function usuarios() {
  const { data, loading, error } = useQuery(GET_USERS, { pollInterval: 500 });
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        accessor: "cedula",
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
          <Table columns={headers} data={data.clients} />
        </>
      )}
    </Dashboard>
  );
}

export default usuarios;
