import React from "react";
import { Dashboard } from "@/layouts/Dashboard";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Flex, useDisclosure } from "@chakra-ui/core";
import { IconButton } from "@/atoms/Buttons";
import { SubHeader } from "@/atoms/Text";
import { Icon } from "@iconify/react";
import { TableActions } from "@/molecules/ActionButtons";
import { Table } from "@/organisms/Table";
import Plus from "@iconify/icons-cil/plus";
import { Mercancia } from "@/organisms/Forms";
import { CREATE_MATERIAL, DELETE_MATERIAL, GET_MERCANCIA, UPDATE_MATERIAL } from "@/utils/queries";

const mercancia = () => {
  const defaultState = {
    edit: false,
    data: {
      id: 0,
      type: 0,
      nombre: "",
    },
  };

  const [editData, setEditData] = React.useState(defaultState);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },

      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Tipo",
        accessor: "type",
        Cell: ({ value }) => String(value.name),
      },
      {
        Header: "Acciones",
        Cell: ({ row }) => (
          <TableActions
            onDelete={() => deleteMaterial({ variables: { id: row.original.id } })}
            onUpdate={() => {
              setEditData({
                edit: true,
                data: { id: row.original.id, type: row.original.type.id, nombre: row.original.nombre },
              });
              onOpen();
            }}
          />
        ),
      },
    ],
    [],
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading } = useQuery(GET_MERCANCIA, { pollInterval: 500 });
  const [createMaterial] = useMutation(CREATE_MATERIAL, { onCompleted: onClose });
  const [deleteMaterial] = useMutation(DELETE_MATERIAL);
  const onSubmit = ({ nombre, type }) => {
    createMaterial({ variables: { nombre: nombre, type: Number(type) } });
  };
  const resetState = () => setEditData({ ...defaultState });
  const closeAndReset = () => {
    resetState();
    onClose();
  };
  const [updateMaterial] = useMutation(UPDATE_MATERIAL, { onCompleted: closeAndReset });
  const onEdit = (data) =>
    updateMaterial({ variables: { id: editData.data.id, nombre: data.nombre, type: Number(data.type) } });

  return (
    <Dashboard>
      {loading ? (
        <h1>Loading bro</h1>
      ) : (
        <>
          <Mercancia
            isOpen={isOpen}
            onClose={closeAndReset}
            isEditing={editData.edit}
            onSubmit={onSubmit}
            typeList={data.materialTypes}
            onEdit={onEdit}
            values={editData.data}
          />
          <Flex height="5em" justifyContent="space-between" alignItems="center">
            <SubHeader>Mercancia</SubHeader>
            <IconButton
              aria-label="add-more"
              onClick={onOpen}
              backgroundColor="colors.rose.600"
              icon={<Icon icon={Plus} color="white" />}
            />
          </Flex>
          <Table columns={columns} data={data.materials} />
        </>
      )}
    </Dashboard>
  );
};

export default mercancia;
