// A very simple store implementation using state, context and callbacks

import { createContext, useCallback, useEffect, useState } from "react";
import { BoardT, CardT } from "./typedefs";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CARD, DELETE_CARD, GET_BOARD, UPDATE_CARD } from "./queries";

export type BoardStateType = [
  BoardT,
  {
    createCard: (card: CardT) => Promise<void>;
    updateCard: (card: CardT) => Promise<void>;
    deleteCard: (cardId: string) => Promise<void>;
  },
];

export const BoardState = createContext<BoardStateType | null>(null);

export function useBoardStateContext(): BoardStateType {
  const [board, setBoard] = useState<BoardT>({ cards: [] });

  const { data, refetch } = useQuery(GET_BOARD);
  const [createCardGql] = useMutation(CREATE_CARD);
  const [updateCardGql] = useMutation(UPDATE_CARD);
  const [deleteCardGql] = useMutation(DELETE_CARD);

  useEffect(() => {
    if (!data) return;
    setBoard(data["board"]);
  }, [data]);

  const createCard = useCallback(
    async (card: CardT) => {
      await createCardGql({ variables: { ...card } });
      await refetch();
    },
    [refetch, createCardGql],
  );

  const updateCard = useCallback(
    async (card: CardT) => {
      await updateCardGql({ variables: { ...card } });
      await refetch();
    },
    [refetch, updateCardGql],
  );

  const deleteCard = useCallback(
    async (cardId: string) => {
      await deleteCardGql({ variables: { id: cardId } });
      await refetch();
    },
    [refetch, deleteCardGql],
  );

  return [board, { createCard, updateCard, deleteCard }];
}
