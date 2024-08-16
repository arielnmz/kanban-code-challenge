import Column from "./column";
import { BoardState, useBoardStateContext } from "../store";
import { BoardT, ColumnT } from "../typedefs";

function useReducedBoard(board: BoardT) {
  const reducedBoard = board.cards.reduce<Record<string, ColumnT>>(
    (cols, card) => {
      if (Object.hasOwn(cols, card.column)) {
        cols[card.column].cards.push(card);
      } else {
        cols[card.column] = {
          id: card.column,
          cards: [card],
        };
      }
      return cols;
    },
    {},
  );
  return Object.values(reducedBoard);
}

export default function Board() {
  const boardState = useBoardStateContext();
  const [board] = boardState;

  const columns = useReducedBoard(board);
  console.log("showing cols", columns);

  return (
    <div
      className={
        "h-full flex flex-row flex-nowrap justify-start space-x-4 p-2 pb-4"
      }
    >
      <BoardState.Provider value={boardState}>
        {columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </BoardState.Provider>
    </div>
  );
}
