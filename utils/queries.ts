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
