import React from "react";
import Table from "./Table";
import { TableActions } from "../../molecules/ActionButtons";
const ar = [
  {
    Header: "Column 1",
    accessor: "col1", // accessor is the "key" in the data
  },
  {
    Header: "Column 2",
    accessor: "col2",
  },
  {
    Header: "Column 3",
    accessor: "col3",
  },
  {
    Header: "Column 3",
    accessor: "col34",
  },
  {
    Header: "edit",
    Cell: ({ row }) => (
      <TableActions onDelete={() => alert(row.original["col1"])} onUpdate={() => alert(row.original["col1"])} />
    ),
  },
];

const data = [
  {
    col1: "Hello",
    col2: "World",
    col3: "here",
    col34: "here",
  },
  {
    col1: "react-table",
    col2: "rocks",
    col3: "here",
    col34: "here",
  },
  {
    col1: "whatever",
    col2: "you want",
    col3: "here",
    col34: "here",
  },
];
export const tableExample = () => {
  return (
    <div>
      <Table data={data} width="50em" columns={ar} />
    </div>
  );
};

export default {
  title: "Organism/Table",
};
