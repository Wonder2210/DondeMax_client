import { gql } from "@apollo/client";

export const GET_TYPES = gql`
  query types {
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

export const GET_DATA = gql`
  query ProductsData($size: Int! = 12, $cursor: Int! = 0, $type: String = "", $preservation: String = "") {
    products(size: $size, cursor: $cursor, type: $type, preservation: $preservation) {
      total
      results {
        id
        name
        image
      }
    }
  }
`;

export const GET_BASE_PRODUCTS = gql`
  query GetProductsBase($size: Int! = 12, $cursor: Int! = 0, $type: String = "", $preservation: String = "") {
    products(size:$size, cursor:$cursor, type:$type, preservation:$preservation ){
    total
    results{
      id
      name
      image
      info
      type
    }
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

export const CREATE_PROVIDER = gql`
  mutation CreateProvider($name: String!, $RIF: String!, $phone: String!, $direction: String!) {
    createProvider(provider: { name: $name, RIF: $RIF, phone: $phone, direction: $direction }) {
      id
    }
  }
`;

export const UPDATE_PROVIDER = gql`
  mutation UpdateProvider($id: Int!, $name: String, $RIF: String, $phone: String, $direction: String) {
    updateProvider(provider: { id: $id, name: $name, RIF: $RIF, phone: $phone, direction: $direction }) {
      id
    }
  }
`;

export const DELETE_PROVIDER = gql`
  mutation DeleteProvider($id : Int!){
  deleteProvider(id:$id)
}
`;

export const GET_MERCANCIA = gql`
  query GET_MATERIALS {
    materials {
      id
      nombre
      onStock{
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

export const CREATE_MATERIAL = gql`
  mutation CreateMaterial($nombre: String!, $type: Int!) {
    createMaterial(material: { nombre: $nombre, type: $type }) {
      id
    }
  }
`;

export const UPDATE_MATERIAL = gql`
  mutation UpdateMaterial($id: Int!, $nombre: String!, $type: Int!) {
    updateMaterial(id: $id, material: { nombre: $nombre, type: $type }) {
      id
      nombre
    }
  }
`;

export const DELETE_MATERIAL = gql`
  mutation DeleteMaterial($id: Int!) {
    deleteMaterial(id: $id)
  }
`;
