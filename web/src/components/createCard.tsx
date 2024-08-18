import Icon from "@mdi/react";
import { mdiCheckBold } from "@mdi/js";
import { Dispatch, useCallback, useContext, useState } from "react";
import { BoardState } from "../store";

function useCreateField(
  column: string,
): [string, Dispatch<string>, () => void] {
  const [cardContent, setCardContent] = useState("");
  const [, { createCard }] = useContext(BoardState)!;

  const saveCard = useCallback(async () => {
    await createCard({ id: "", column, content: cardContent });
    setCardContent("");
  }, [column, cardContent, createCard, setCardContent]);

  return [cardContent, setCardContent, saveCard];
}

export default function CreateCard(props: { column: string }) {
  const [cardContent, setCardContent, saveCard] = useCreateField(props.column);

  return (
    <div className={"flex rounded bg-neutral-800 drop-shadow p-2 min-h-32"}>
      <div className={"flex grow flex-col space-y-2"}>
        {/*Edit area*/}
        <textarea
          value={cardContent}
          onChange={(e) => setCardContent(e.target.value)}
          className={"grow rounded bg-neutral-700 drop-shadow"}
        />
        {/*Save button*/}
        <div className={"flex flex-row justify-end"}>
          <button onClick={saveCard} className={"text-green-200"}>
            <Icon path={mdiCheckBold} title={"Create card"} size={1}></Icon>
          </button>
        </div>
      </div>
    </div>
  );
}
