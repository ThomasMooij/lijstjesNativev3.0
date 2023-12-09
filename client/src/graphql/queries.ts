import { gql } from '@apollo/client';

export const GET_USER_LISTS = gql`
  query GetUserLists($userId: ID!) {
    getAllLists(userId: $userId) {
      _id
      title
    }
  }
`;