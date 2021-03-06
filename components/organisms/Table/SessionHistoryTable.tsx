import React from "react";
import { Flex } from "@chakra-ui/react";
import { parseISO } from "date-fns";
import dynamic from "next/dynamic";
import Table from "./TableBase";

const GeneratePDF = dynamic(() => import("../PDF/GeneratePdf"), { ssr: false });

type props = {
  data: Array<any>;
  id: string;
};

const SessionHistoryTable: React.FC<props> = ({ data, id }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID usuario",
        accessor: "id_user",
      },
      {
        Header: "Nombre",
        accessor: "username",
      },
      {
        Header: "Fecha",
        accessor: "date",
        Cell: ({ value }) => {
          const date = parseISO(value);

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

export default SessionHistoryTable;
