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
  id: string;
};

const OrdersTable: React.FC<props> = ({ data, id, onUpdate, onDelete }) => {
  const columns = React.useMemo(
    (): Array<{ Header: string; accessor?: string; Cell?: any }> => [
      {
        Header: "ID",
        accessor: "id",
      },

      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Peso Total",
        accessor: "onStock.weight",
      },
      {
        Header: "Unidades totales",
        accessor: "onStock.uniteds",
      },
      {
        Header: "Tipo",
        accessor: "type",
        Cell: ({ value }) => String(value.name),
      },
      {
        Header: "Acciones",
        Cell: ({ row }) => <TableActions onDelete={() => onDelete(row)} onUpdate={() => onUpdate(row)} />,
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
      <Table data={data} id={id} columns={columns} />
    </>
  );
};

export default OrdersTable;
