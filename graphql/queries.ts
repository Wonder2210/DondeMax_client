import { gql } from "@apollo/client";

export const GET_DATA_STORE = gql`
  query ProductsData($size: Int! = 12, $cursor: Int! = 0, $type: String = "", $preservation: String = "") {
    searchProducts(size: $size, cursor: $cursor, type: $type, preservation: $preservation) {
      total
      results {
        id
        name
        image
        precio
      }
    }
    productTypes {
      id
      type
    }
    productPreservation {
      id
      type
    }
  }
`;

export const GET_BASE_PRODUCTS = gql`
  query GetProductsBase($size: Int! = 12, $cursor: Int! = 0, $type: String = "", $preservation: String = "") {
    searchProducts(size: $size, cursor: $cursor, type: $type, preservation: $preservation) {
      total
      results {
        id
        name
        image
        info
        type
      }
    }
    productTypes {
      id
      type
    }
    productPreservation {
      id
      type
    }
  }
`;

export const GET_PROVIDERS = gql`
  query GetProviders {
    providers {
      id
      name
      RIF
      phone
      direction
    }
  }
`;

export const GET_DATA_AUDITORIAS = gql`
  query Logs {
    ordersLog {
      id_pedido
      user_db
      date
      delivered
      stage
      production
      action_name
    }
    storageLog {
      id_material
      id_provider
      user_db
      action_name
      date
    }
    productsLog {
      user_db
      id_product
      action_name
      date
    }
    sessionLog {
      id_user
      username
      date
      action_name
    }
  }
`;

export const GET_DATA_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      role
      phone
    }
  }
`;

export const GET_DATA_CLIENTS = gql`
  query GetClients {
    clients {
      id
      name
      cedula
      nationality
      phone
    }
  }
`;

export const GET_DATA_MERCANCIA = gql`
  query GetStorage {
    storage {
      id
      expiration_date
      brand
      uniteds
      weight
      united_weight
      material {
        id
        nombre
        type {
          name
        }
      }
      provider {
        id
        name
        RIF
        phone
        direction
      }
    }
    materialsStage {
      id
      name
      uniteds
      weight
    }
    providers {
      name
      id
    }
    materials {
      id
      nombre
      onStock {
        uniteds
        weight
      }
      type {
        id
        name
      }
    }
    materialTypes {
      id
      type: name
    }
  }
`;

export const GET_DATA_PEDIDOS = gql`
  query GetOrders {
    clients {
      id
      type: name
    }
    productList: getProducts {
      id
      type: name
      price: precio
    }

    materialsStage {
      id
      name
      uniteds
      weight
    }
    orders {
      id
      pay_method
      delivery_date
      note
      delivery_status
      production_status
      stage_status
      abono
      monto
      total
      creator {
        name
      }
      client {
        name
      }
      products {
        id
        quantity
        product {
          name
        }
        materials {
          id
          material_name
          quantity
        }
      }
    }
  }
`;

export const GET_DATA_INDEX = gql`
  query Get {
    orders {
      id
      delivery_status
      products {
        id
      }
    }
    materialsStage {
      name
      weight
    }
    users {
      id
    }
    clients {
      id
    }
    getProducts {
      id
    }
    providers {
      id
    }
  }
`;

export const GET_DATA_PRODUCTS = gql`
  query GetProducts {
    searchProducts(size: 10, cursor: 0) {
      total
      results {
        id
        name
        image
        info
        type
        precio
        available
        materials {
          quantity
          id
          material {
            id
            nombre
          }
        }
      }
    }
    materials {
      id
      type: nombre
    }
    productTypes {
      id: type
      type
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id)
  }
`;
