import Card from "./card";
import { useCallback } from "react";

// Custom hooks

function useDnDTarget(
  columnId: string,
  updateCard: (cardId: string) => Promise<void>,
) {
  const handleDrop = useCallback(async (e: any) => {
    e.preventDefault();
    const payload = e.dataTransfer.getData("text/plain");
    await updateCard(payload);
    return false;
  }, []);

  const handleDragOver = useCallback((e: any) => {
    e.preventDefault();
    return false;
  }, []);

  return [handleDrop, handleDragOver];
}

function useUpdateCard(columnId: string) {
  return useCallback(
    async (cardId: string) => {
      console.log("Call API to move card", cardId, "to", columnId);
    },
    [columnId],
  );
}

export default function Column(props: { columnId: string }) {
  const handleUpdateCard = useUpdateCard(props.columnId);
  const [handleDrop, handleDragOver] = useDnDTarget(
    props.columnId,
    handleUpdateCard,
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={
        "flex flex-col justify-start rounded drop-shadow bg-neutral-700"
      }
    >
      {/*Title and drag and drop target*/}
      <div className={"p-2 font-bold"}>{props.columnId}</div>
      {/*Cards*/}
      <div className={"flex flex-col justify-start min-w-96 space-y-2 px-2"}>
        <Card card={{ id: props.columnId + "-1", content: "" }} />
        <Card card={{ id: props.columnId + "-2", content: "" }} />
        <Card card={{ id: props.columnId + "-3", content: "" }} />
      </div>
    </div>
  );
}
