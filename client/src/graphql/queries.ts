import { gql } from '@apollo/client';

export const GET_ALL_LISTS = gql`
  query GetAllLists($userId: String!) {
    getAllLists(userId: $userId) {
      _id
      title
      date # Add the appropriate date field from your schema
      items {
        # Define fields for items
      }
    }
  }
`;
