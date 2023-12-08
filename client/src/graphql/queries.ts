import { gql } from '@apollo/client';

export const GET_ALL_LISTS = gql`
  query GetAllLists($userId: String!) {
    getAllLists(userId: $userId) {
      title
    }
  }
`;
