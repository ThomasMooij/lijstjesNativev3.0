import { gql } from '@apollo/client';

// LIST QUERIES
export const GET_USER_LISTS = gql`
query GetList($userId: ID!) {
  getAllLists(userId: $userId) {
    _id
    title
    items {
      name
    }
  }
}
`;
export const GET_USER_SAVED_LISTS = gql`
  query Query($id: ID!) {
    getUser(_id: $id) {
      savedLists {
        _id
        date
        title
        userId {
          firstName
        }
      }
    }
  }
`;
//CREATE LIST Mutaion
export const CREATE_LIST_MUTATION = gql`
  mutation Mutation($input: CreateListInput!) {
  createList(input: $input) {
    title
  }
}
`;
//RECIPE QUERIES
export const GET_USER_RECIPES = gql`
query Query($userId: ID!) {
  getUserRecipes(id: $userId) {
    _id
    items {
      name
    }
    name
  }
}
`;
export const GET_USER_SAVED_RECIPES = gql`
query Query($id: ID!) {
  getUser(_id: $id) {
    savedRecipes {
      _id
      name
      userId {
        firstName
      }
    }
  }
}
`