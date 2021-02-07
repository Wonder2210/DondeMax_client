import React from "react";
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
        Header: "Estatus de produccion",
        accessor: "production_status",
        Cell: ({ value }) => (value ? "Listo" : "Pendiente por ser producido"),
      },
      {
        Header: "Listo para ser entregado",
        accessor: "stage_status",
        Cell: ({ value }) => (value ? "Listo" : "Todavia"),
      },
      {
        Header: "Entregado",
        accessor: " delivery_status",
        Cell: ({ value }) => (value ? "Entregado" : "Aun no retirado"),
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
