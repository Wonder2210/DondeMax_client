import React from "react";
import { Box, Flex } from "@chakra-ui/core";
import { useTable } from "react-table";

type props = {
  columns: Array<object>;
  data: Array<object>;
  width?: string;
  ref?: React.Ref<HTMLDivElement>;
  id?: string;
};

const Table: React.FC<props> = ({ columns, data, width, ref, id = "table" }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <Box
      width={width}
      padding="2em"
      margin="1em auto"
      overflowX={{ base: "auto", sm: "auto", md: "hidden", lg: "hidden", xl: "hidden" }}
    >
      <table {...getTableProps()} style={{ width: "100%" }} id={id}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px black",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        borderWidth: "0px 0px 1px 0px",
                        borderColor: "black",
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