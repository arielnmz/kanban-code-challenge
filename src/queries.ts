import { gql } from "@apollo/client";

export const GET_BOARD = gql`
  query GetBoard {
    board {
      cards {
        id
        column
        content
      }
    }
  }
`;

export const CREATE_CARD = gql`
  mutation CreateCard($column: String!, $content: String!) {
    createCard(column: $column, content: $content) {
      ok
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation UpdateCard($id: ID!, $column: String!, $content: String!) {
    updateCard(Id: $id, column: $column, content: $content) {
      ok
    }
  }
`;

export const DELETE_CARD = gql`
  mutation DeleteCard($id: ID!) {
    deleteCard(Id: $id) {
      ok
    }
  }
`;
