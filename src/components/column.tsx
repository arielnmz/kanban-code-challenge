import Card from "./card";
import { useCallback, useContext, useState } from "react";
import { BoardState } from "../store";
import { ColumnT } from "../typedefs";
import CreateCard from "./createCard";

// Custom hooks

function useDnDTarget(columnId: string) {
  const [, { updateCard }] = useContext(BoardState)!;
  const handleDrop = useCallback(
    async (e: any) => {
      e.preventDefault();
      const payload = e.dataTransfer.getData("text/plain");
      await updateCard({ id: payload, column: columnId, content: "" });
      return false;
    },
    [updateCard, columnId],
  );

  const handleDragOver = useCallback((e: any) => {
    e.preventDefault();
    return false;
  }, []);

  return [handleDrop, handleDragOver];
}

export default function Column(props: { column: ColumnT }) {
  const [handleDrop, handleDragOver] = useDnDTarget(props.column.id);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={
        "flex flex-col justify-start rounded drop-shadow bg-neutral-700"
      }
    >
      {/*Title and drag and drop target*/}
      <div className={"p-2 font-bold"}>{props.column.id}</div>
      {/*Cards*/}
      <div className={"flex flex-col justify-start min-w-96 space-y-2 px-2"}>
        {props.column.cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}

        {/*New card*/}
        <div className={isHovered ? "" : "hidden"}>
          <CreateCard column={props.column.id} />
        </div>
      </div>
    </div>
  );
}
