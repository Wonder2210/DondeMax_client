import React from "react";
import { Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Table from "./TableBase";

const GeneratePDF = dynamic(() => import("../PDF/GeneratePdf"), { ssr: false });

type props = {
  data: Array<any>;
  id: string;
};

const StockIncomeTable: React.FC<props> = ({ data, id }) => {
  const columns = React.useMemo(
    (): Array<{ Header: string; accessor?: string; Cell?: any }> => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Material",
        accessor: "material.nombre",
      },
      {
        Header: "Marca",
        accessor: "brand",
      },
      {
        Header: "Unidades",
        accessor: "uniteds",
      },

      {
        Header: "Peso c/u",
        accessor: "weight",
        Cell: ({ value }) => String(`${value}Kg`),
      },
      {
        Header: "Peso Neto",
        Cell: ({ row }) => String(`${row.original.uniteds * row.original.weight}Kg`),
      },
      {
        Header: "Tipo",
        accessor: "material.type.name",
      },
      {
        Header: "Proveedor",
        accessor: "provider.name",
      },
      {
        Header: "Fecha de Vencimiento",
        accessor: "expiration_date",
        Cell: ({ value }) => {
          const date = new Date(value.replace(" ", "T"));

          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();

          return String(`${day}-${month}-${year}`);
        },
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

export default StockIncomeTable;
