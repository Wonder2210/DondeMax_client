import React from "react";
import { Flex, useDisclosure } from "@chakra-ui/core";
import { useQuery, gql } from "@apollo/client";
import { IconButton } from "@/atoms/Buttons";
import { SubHeader } from "@/atoms/Text";
import { Table } from "@/organisms/Table";
import { Dashboard } from "@/layouts/Dashboard";
import { TableActions } from "@/molecules/ActionButtons";
import { Icon } from "@iconify/react";
import Plus from "@iconify/icons-cil/plus";

const GET_BASE_PRODUCTS = gql`
  query GetProductsBase($size: Int! = 12, $cursor: Int! = 0, $type: String = "", $preservation: String = "") {
    products(size: $size, cursor: $cursor, type: $type, preservation: $preservation) {
      total
      results {
        id
        name
        info
        type
      }
    }
  }
`;

const index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error, loading } = useQuery(GET_BASE_PRODUCTS, { variables: { cursor: 0 } });

  if (loading) {
    return <h1>Loading bro</h1>;
  }

  return (
    <Dashboard>
      <Flex height="5em" justifyContent="space-between" alignItems="center">
        <SubHeader>Productos</SubHeader>
        <IconButton
          aria-label="add-more"
          onClick={onOpen}
          backgroundColor="colors.rose.600"
          icon={<Icon icon={Plus} color="white" />}
        />
      </Flex>
      <Table
        width="100%"
        columns={[
          {
            Header: "Id",
            accessor: "id",
          },
          {
            Header: "Nombre",
            accessor: "name",
          },
          {
            Header: "Info",
            accessor: "info",
          },
          {
            Header: "Tipo",
            accessor: "type",
          },
          {
            Header: "Acciones",
            Cell: ({ row }) => (
              <TableActions
                onDelete={() => alert(row.original["id"])}
                onUpdate={() => console.log(data.products.results.find((i) => i.id === row.original["id"]))}
              />
            ),
          },
        ]}
        data={data.products.results}
      />
    </Dashboard>
  );
};

export default index;
