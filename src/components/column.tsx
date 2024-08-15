import Card from "./card";
import { useCallback } from "react";

// Custom hooks

function useDnDTarget() {
  const handleDrop = useCallback((e: any) => {
    e.preventDefault();
    const payload = e.dataTransfer.getData("text/json");
    console.log("drop event", JSON.parse(payload));
    return false;
  }, []);

  const handleDragOver = useCallback((e: any) => {
    e.preventDefault();
    return false;
  }, []);

  return [handleDrop, handleDragOver];
}

export default function Column(props: { columnId: string }) {
  const [handleDrop, handleDragOver] = useDnDTarget();

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
      <div className={"flex flex-col justify-start space-y-2 px-2"}>
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
