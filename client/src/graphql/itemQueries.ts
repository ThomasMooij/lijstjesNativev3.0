import { gql } from '@apollo/client';

// LIST QUERIES
export const CREATE_ITEM_MUTATION = gql`
mutation Mutation($input: CreateItemInput!) {
  createItem(input: $input) {
    name
    userId {
      firstName
    }
  }
}
`;