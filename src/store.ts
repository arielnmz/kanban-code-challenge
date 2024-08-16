// A very simple store implementation using state, context and callbacks

import { createContext, useCallback, useEffect, useState } from "react";
import { BoardT, CardT } from "./typedefs";

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
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (board === null || !synced) {
      console.log("API call to get the board");
      setBoard({
        cards: [
          { id: "1", column: "column-1", content: "test" },
          { id: "2", column: "column-1", content: "test" },
          { id: "3", column: "column-2", content: "test" },
          { id: "4", column: "column-2", content: "test" },
          { id: "5", column: "column-3", content: "test" },
        ],
      });
      setSynced(true);
    }
  }, [board, synced]);

  const createCard = useCallback(async (card: CardT) => {
    console.log("API call to create card", card);
    setSynced(false);
  }, []);
  const updateCard = useCallback(async (card: CardT) => {
    console.log("API call to update card", card);
    setSynced(false);
  }, []);
  const deleteCard = useCallback(async (cardId: string) => {
    console.log("API call to delete card", cardId);
    setSynced(false);
  }, []);

  return [board, { createCard, updateCard, deleteCard }];
}
