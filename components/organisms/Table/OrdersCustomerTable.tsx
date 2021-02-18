import React from "react";
import { Badge } from "@chakra-ui/react";
import Table from "./TableBase";

type props = {
  data: Array<any>;
  id: string;
};

const OrdersCustomerTable: React.FC<props> = ({ data, id }) => {
  const columns = React.useMemo(
    (): Array<{ Header: string; accessor?: string; Cell?: any }> => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "fecha de entrega",
        accessor: "delivery_date",
        Cell: ({ value }) => {
          const dateString = value;
          const date = new Date(dateString.replace(" ", "T"));

          const day = date.getDate();
          const month = date.getMonth();
          const year = date.getFullYear();
          return String(`${day}-${month}-${year}`);
        },
      },
      {
        Header: "Metodo de pago",
        accessor: "pay_method",
      },
      {
        Header: "Nota",
        accessor: "note",
      },
      {
        Header: "Estatus",

        Cell: ({ row }) => {
          if (row.production_status && row.stage_status && !row.delivery_status) {
            return <Badge colorScheme="orange">Listo para ser entregado</Badge>;
          }
          if (row.delivery_status) {
            return <Badge colorScheme="green">Entregado</Badge>;
          }
          if (row.production_status && row.stage_status && !row.delivery_status) {
            return <Badge colorScheme="purple">pedido en produccion</Badge>;
          }
          if (!row.production_status && !row.stage_status && !row.delivery_status) {
            return <Badge>Pedido recibido</Badge>;
          }
        },
      },

      {
        Header: "abono",
        accessor: "abono",
      },
      {
        Header: "total",
        accessor: "total",
      },
    ],
    [],
  );
  return <Table data={data} id={id} columns={columns} />;
};

export default OrdersCustomerTable;
