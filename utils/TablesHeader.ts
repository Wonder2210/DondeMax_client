import {parseISO} from "date-fns";

export const auditorias = [
    [
      {
        Header: "ID pedido",
        accessor: "id_pedido",
      },
      {
        Header: "Usuario",
        accessor: "user_db",
      },
      {
        Header: "Entregado",
        accessor: "delivered",
        Cell: ({ value }) => (value ? "Listo" : "Todavia"),
      },
      {
        Header: "Listo para entregar",
        accessor: "stage",
        Cell: ({ value }) => (value ? "Listo" : "Todavia"),
      },
      {
        Header: "Producido",
        accessor: "production",
        Cell: ({ value }) => (value ? "Listo" : "Todavia"),
      },
      {
        Header: "Accion ejecutada",
        accessor: "action_name",
      },
      {
        Header: "Fecha",
        accessor: "date",
        Cell: ({ value }) => {
          const date = parseISO(value);

          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();

          console.log(year);
          return day + "-" + month + "-" + year;
        },
      },
    ],
    [
      {
        Header: "ID pedido",
        accessor: "id_material",
      },
      {
        Header: " ID Usuario",
        accessor: "id_provider",
      },
      {
        Header: "Usuario",
        accessor: "user_db",
      },
      {
        Header: "Accion ejecutada",
        accessor: "action_name",
      },
      {
        Header: "Fecha",
        accessor: "date",
        Cell: ({ value }) => {
          const date = parseISO(value);

          const day = date.getDate();
          const month = date.getMonth()+1;
          const year = date.getFullYear();

          console.log(year);
          return day + "-" + month + "-" + year;
        },
      },
    ],
    [
      {
        Header: "Creador ID",
        accessor: "user_db",
      },
      {
        Header: "ID Producto",
        accessor: "id_product",
      },
      {
        Header: "Accion ejecutada",
        accessor: "action_name",
      },
      {
        Header: "Fecha",
        accessor: "date",
        Cell: ({ value }) => {
          const date = parseISO(value);

          const day = date.getDate();
          const month = date.getMonth();
          const year = date.getFullYear();

          console.log(year);
          return day + "-" + month + "-" + year;
        },
      },
    ],
    [
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
          let dateString = value;
          const date = parseISO(value);

          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();

          console.log(year);
          return day + "-" + month + "-" + year;
        },
      },
    ],
  ]

 export const usuarios = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "Nombre",
      accessor: "name",
    },
    {
      Header: "Rol",
      accessor: "role",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Telefono",
      accessor: "phone",
    },
  ];

  export const clientes = [{
    Header: "id",
    accessor: "id",
  },
  {
    Header: "Nombre",
    accessor: "name",
  },
  {
    Header: "Nacionalidad",
    accessor: "nationality",
  },
  {
    Header: "Cedula",
    accessor: "cedula",
  },
  {
    Header: "Telefono",
    accessor: "phone",
  },];

  export const mercancia = [
    [
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
      
    ],
    [
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
        Cell: ({ value }) => String(value + "Kg"),
      },
      {
        Header: "Peso Neto",
        Cell: ({ row }) => String(row.original["uniteds"] * row.original["weight"] + "Kg"),
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

          return day + "-" + month + "-" + year;
        },
      },
    ],
    [
      {
        Header: "tipo",
        accessor: "name",
      },

      {
        Header: "Peso",
        accessor: "weight",
        Cell: ({ value }) => `${value}Kg`,
      },
    ],
  ]