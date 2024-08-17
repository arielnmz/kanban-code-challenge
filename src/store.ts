// A very simple store implementation using state, context and callbacks

import { createContext, useCallback, useEffect, useState } from "react";
import { BoardT, CardT } from "./typedefs";
import { gql, useQuery } from "@apollo/client";

export type BoardStateType = [
  BoardT,
  {
    createCard: (card: CardT) => Promise<void>;
    updateCard: (card: CardT) => Promise<void>;
    deleteCard: (cardId: string) => Promise<void>;
  },
];
const GET_BOARD = gql`
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
export const BoardState = createContext<BoardStateType | null>(null);

export function useBoardStateContext(): BoardStateType {
  const [board, setBoard] = useState<BoardT>({ cards: [] });

  const { loading, error, data, refetch } = useQuery(GET_BOARD);

  useEffect(() => {
    if (!data) return;
    console.log("API call to get the board", data);

    setBoard(data["board"]);
  }, [data]);

  const createCard = useCallback(async (card: CardT) => {
    console.log("API call to create card", card);
    await refetch();
  }, []);
  const updateCard = useCallback(async (card: CardT) => {
    console.log("API call to update card", card);
    await refetch();
  }, []);
  const deleteCard = useCallback(async (cardId: string) => {
    console.log("API call to delete card", cardId);
    await refetch();
  }, []);

  return [board, { createCard, updateCard, deleteCard }];
}
