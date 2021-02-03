import React from "react";
import { Badge, Flex } from "@chakra-ui/core";
import trash from "@iconify/icons-cil/trash";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import Table from "./TableBase";
import { Button, IconButton } from "../../atoms/Buttons";

const GeneratePDF = dynamic(() => import("../PDF/GeneratePdf"), { ssr: false });

type props = {
  data: Array<any>;
  executeOrder: (e: any) => void;
  produceOrder: (e: any) => void;
  deleteOrder: (e: any) => void;
  id: string;
};

const OrdersTable: React.FC<props> = ({ data, id, executeOrder, produceOrder, deleteOrder }) => {
  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Metodo de pago", accessor: "pay_method" },
      {
        Header: "Fecha a ser entregado",
        accessor: "delivery_date",
        Cell: ({ value }) => {
          const dateString = value;
          const date = new Date(dateString.replace(" ", "T"));

          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();

          return String(`${day}-${month}-${year}`);
        },
      },
      { Header: "Nota", accessor: "note" },
      {
        Header: "Entregado",
        accessor: "delivery_status",
        Cell: ({
          value,
          row: {
            original: { id, production_status: productionStatus, stage_status: stageStatus },
          },
        }) => (
          <Button
            width="6em"
            height="2.7em"
            isDisabled={value || (productionStatus && stageStatus)}
            backgroundColor="transparent"
            color="black"
            _hover={
              value
                ? {}
                : {
                    bgColor: "black",
                    color: "black",
                    _after: {
                      content: '"Entregar"',

                      position: "absolute",
                      zIndex: 1,
                      color: "white",
                    },
                  }
            }
            onClick={() => {
              executeOrder({
                variables: {
                  id,
                  status: {
                    delivery_status: true,
                  },
                },
              });
            }}
          >
            {value ? "listo" : "Todavia"}
          </Button>
        ),
      },
      {
        Header: "Listo para entregar",
        accessor: "stage_status",
        Cell: ({ value, row }) => (
          <Button
            width="6em"
            height="2.7em"
            isDisabled={!row.original.production_status || (row.original.production_status && value)}
            backgroundColor="transparent"
            color="black"
            _hover={
              value
                ? {}
                : {
                    bgColor: "black",
                    color: "black",
                    _after: {
                      content: '"Listo"',

                      position: "absolute",
                      zIndex: 1,
                      color: "white",
                    },
                  }
            }
            onClick={() => {
              executeOrder({
                variables: {
                  id: row.original.id,
                  status: {
                    stage_status: true,
                  },
                },
              });
            }}
          >
            {value ? "listo" : "Aun no"}
          </Button>
        ),
      },
      {
        Header: "Producido",
        accessor: "production_status",
        Cell: ({ value, row }) => (
          <Button
            width="6em"
            height="2.7em"
            backgroundColor="transparent"
            color="black"
            isDisabled={value}
            _hover={
              value
                ? {}
                : {
                    bgColor: "colors.green.400",
                    color: "colors.green.400",
                    _after: {
                      content: '"Producir"',

                      position: "absolute",
                      zIndex: 1,
                      color: "white",
                    },
                  }
            }
            onClick={() => {
              produceOrder({
                variables: {
                  id: row.original.id,
                  status: {
                    production_status: true,
                  },
                },
              });
            }}
          >
            {value ? "listo" : "Aun no"}
          </Button>
        ),
      },
      {
        Header: "cancelar",
        Cell: ({ row }) => (
          <IconButton
            backgroundColor="rgb(255,20,20)"
            aria-label="eliminar-cancelar"
            icon={<Icon icon={trash} color="white" />}
            onClick={() => {
              const verify = confirm("Seguro de cancelar este pedido?");
              return verify ? deleteOrder({ variables: { id: row.original.id } }) : null;
            }}
          />
        ),
      },
      { Header: "Abono", accessor: "abono", Cell: ({ value }) => `${value}$` },
      { Header: "Monto restante", accessor: "monto", Cell: ({ value }) => `${value}$` },
      { Header: "Total", accessor: "total", Cell: ({ value }) => `${value}$` },
      {
        Header: "Productos",
        accessor: "products",
        Cell: ({ value }) => {
          const products = [];
          value.forEach((i) => {
            products.push(
              <>
                <Badge>
                  {i.product.name}:{i.quantity}
                </Badge>
                <br />
              </>,
            );
          });
          return products;
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
            orientation="landscape"
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
