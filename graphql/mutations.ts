import { gql } from "@apollo/client";

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
  mutation DeleteProvider($id: Int!) {
    deleteProvider(id: $id)
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!, $role: UserRole!, $phone: String!) {
    createUser(user: { name: $name, email: $email, password: $password, role: $role, phone: $phone }) {
      id
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`;

export const UPDATE_USER = gql`
  mutation editUser($id: Int!, $name: String, $email: String, $password: String, $role: UserRole, $phone: String) {
    editUser(user: { id: $id, name: $name, phone: $phone, email: $email, password: $password, role: $role }) {
      id
      name
    }
  }
`;

export const CREATE_CLIENT = gql`
  mutation CreateClient($nationality: String!, $name: String!, $cedula: String!, $phone: String!) {
    createClient(client: { name: $name, cedula: $cedula, phone: $phone, nationality: $nationality }) {
      id
      name
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation updateClient($id: Int!, $nationality: String!, $name: String!, $cedula: String!, $phone: String!) {
    editClient(client: { id: $id, name: $name, cedula: $cedula, phone: $phone, nationality: $nationality }) {
      id
      name
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation DeleteClient($id: Int!) {
    deleteClient(id: $id)
  }
`;

export const ADD_TO_STORAGE = gql`
  mutation AddToStorage(
    $materialId: Int!
    $providerId: Int!
    $uniteds: Int!
    $expirationDate: String!
    $brand: String!
    $weight: Float!
    $united_weight: Float!
  ) {
    addToStore(
      store: {
        materialsId: $materialId
        providerId: $providerId
        uniteds: $uniteds
        united_weight: $united_weight
        expirationDate: $expirationDate
        brand: $brand
        weight: $weight
      }
    ) {
      id
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

export const TAKE_ORDER = gql`
  mutation TakeOrder(
    $client: Int!
    $deliveryDate: String!
    $payMethod: PayMethod!
    $note: String!
    $abono: Float!
    $total: Float!
    $monto: Float!
    $orderProducts: [ProductOrderInput!]!
  ) {
    takeOrder(
      order: {
        client: $client
        deliveryDate: $deliveryDate
        payMethod: $payMethod
        note: $note
        deliveryStatus: false
        stageStatus: false
        productionStatus: false
        abono: $abono
        total: $total
        monto: $monto
        orderProducts: $orderProducts
      }
    ) {
      id
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation update($id: Int!, $status: UpdateOrder!) {
    updatStateOrder(id: $id, state: $status) {
      id
    }
  }
`;

export const PRODUCE_ORDER = gql`
  mutation ProduceOrder($id: Int!) {
    produceOrder(id: $id) {
      id
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: Int!) {
    deleteOrder(id: $id)
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $price: Float!
    $materials: [MaterialProductInput!]!
    $image: Upload!
    $info: String!
    $type: String!
    $rate: Float
  ) {
    createProduct(
      product: {
        name: $name
        precio: $price
        materials: $materials
        image: $image
        info: $info
        type: $type
        rate: $rate
      }
    ) {
      id
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: Int!
    $name: String
    $precio: Float
    $type: String
    $info: String
    $materials: [MaterialProductInput]
    $available: Boolean
    $image: Upload
  ) {
    updateProduct(
      product: {
        id: $id
        name: $name
        precio: $precio
        type: $type
        info: $info
        materials: $materials
        available: $available
        image: $image
      }
    ) {
      id
    }
  }
`;

export const TAKE_ORDER_CLIENT = gql`
  mutation TakeOrderClient(
    $client: Int!
    $deliveryDate: String!
    $payMethod: PayMethod!
    $note: String!
    $total: Float!
    $monto: Float!
    $orderProducts: [ProductOrderInput!]!
  ) {
    takeOrderClient(
      order: {
        client: $client
        deliveryDate: $deliveryDate
        payMethod: $payMethod
        note: $note
        deliveryStatus: false
        stageStatus: false
        productionStatus: false
        abono: 0
        total: $total
        monto: $monto
        orderProducts: $orderProducts
      }
    ) {
      id
    }
  }
`;
