import React from "react";
import { Flex } from "@chakra-ui/core";
import dynamic from "next/dynamic";
import Table from "./TableBase";
import { TableActions } from "../../molecules/ActionButtons";

const GeneratePDF = dynamic(() => import("../PDF/GeneratePdf"), { ssr: false });

type props = {
  data: Array<any>;
  onUpdate: (e: any) => void;
  onDelete: (e: any) => void;
  isAdmin: Boolean;
  id: string;
};

const UsersTable: React.FC<props> = ({ isAdmin, data, id, onUpdate, onDelete }) => {
  const columns = React.useMemo(
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
    <>
      <Flex width="100%" justifyContent="flex-end" flexGrow={1} alignItems="center">
        <Flex width="100%" justifyContent="flex-start" paddingX="2em" paddingY="1.5em" flexGrow={1} alignItems="center">
          <GeneratePDF
            tableId={`#${id}`}
            columns={columns
              .map((i) => ({ header: i.Header, dataKey: i.accessor }))
              .filter((i) => i.header !== "Acciones")}
          />
        </Flex>
      </Flex>
      <Table
        data={data}
        id={id}
        columns={
          isAdmin
            ? [
                ...columns,
                {
                  Header: "Acciones",
                  Cell: ({ row }) => <TableActions onDelete={() => onDelete(row)} onUpdate={() => onUpdate(row)} />,
                },
              ]
            : columns
        }
      />
    </>
  );
};

export default UsersTable;
