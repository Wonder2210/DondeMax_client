/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useTable, useSortBy, Column } from "react-table";

type props = {
  columns: Column<object>[];
  data: Array<object>;
  width?: string;
  ref?: React.Ref<HTMLDivElement>;
  id?: string;
};

const Table: React.FC<props> = ({ columns, data, width, ref, id = "table" }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy);

  return (
    <Box width={width} paddingX="2em" margin="1em auto" boxShadow="2px 1px 0 #d6d6d6" overflowX="auto">
      <style jsx>
        {`
          .row {
            background: #fff;
            transition: 0.05s background ease;
          }
          .row:hover {
            background: #ececec;
          }
        `}
      </style>
      <table {...getTableProps()} style={{ width: "100%" }} id={id}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    // borderBottom: "solid 3px black",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                  <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="row">
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "0.8em",
                        borderWidth: "0px 0px 1px 0px",
                        // borderColor: "#BeBeBe",
                      }}
                    >
                      <Flex justifyContent="center">{cell.render("Cell")}</Flex>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Box>
  );
};

export default Table;
