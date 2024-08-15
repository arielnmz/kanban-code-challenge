import Icon from "@mdi/react";
import { mdiDelete, mdiDragVertical } from "@mdi/js";
import {
  Dispatch,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// Custom hooks

function useDnDSource(
  cardId: string,
  targetRef: MutableRefObject<Element | null>,
) {
  return useCallback(
    (e: any) => {
      if (targetRef.current) {
        (e as DragEvent).dataTransfer?.setData("text/plain", cardId);
      }
    },
    [targetRef],
  );
}

function useDnDHandle(targetRef: MutableRefObject<Element | null>) {
  const handleDragStart = useCallback(() => {
    if (targetRef.current) {
      targetRef.current.setAttribute("draggable", "true");
    }
  }, [targetRef]);

  const handleDragEnd = useCallback(() => {
    if (targetRef.current) {
      targetRef.current.setAttribute("draggable", "false");
    }
  }, [targetRef]);

  return [handleDragStart, handleDragEnd];
}

function useOptimisticDeleteCard(cardId: string): [boolean, () => void] {
  const [isDeleted, setIsDeleted] = useState(false);
  const deleter = useCallback(async () => {
    console.log("Call to API to remove card", cardId);
    setIsDeleted(true);
  }, [cardId]);
  return [isDeleted, deleter];
}

function useToggleableEditField(
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>,
  card: {
    id: string;
    content: string;
  },
): [string, Dispatch<string>, boolean, () => void, () => void] {
  const [isEditMode, setIsEditMode] = useState(false);
  const [optimisticCardContent, setOptimisticCardContent] = useState(
    card.content,
  );

  useEffect(() => {
    if (isEditMode) {
      textareaRef.current?.focus();
    } else {
      textareaRef.current?.blur();
    }
  }, [isEditMode]);

  const editCard = useCallback(() => {
    setIsEditMode(true);
  }, []);

  const saveCard = useCallback(() => {
    const finalText = textareaRef.current?.value || "";
    console.log("API call to update card", card, "new text", finalText);
    setIsEditMode(false);
  }, [textareaRef]);

  return [
    optimisticCardContent,
    setOptimisticCardContent,
    isEditMode,
    editCard,
    saveCard,
  ];
}

export default function Card(props: { card: { id: string; content: string } }) {
  const cardRef = useRef(null);

  const sourceDragStart = useDnDSource(props.card.id, cardRef);
  const [handleDragStart, handleDragEnd] = useDnDHandle(cardRef);
  const [isDeleted, handleDeleteCard] = useOptimisticDeleteCard(props.card.id);
  const textareaRef = useRef(null);
  const [
    optimisticCardContent,
    setOptimisticCardContent,
    isEditMode,
    editCard,
    saveCard,
  ] = useToggleableEditField(textareaRef, props.card);

  return (
    <div
      ref={cardRef}
      onDragStart={sourceDragStart}
      onDragEnd={handleDragEnd}
      className={
        "flex rounded bg-neutral-800 drop-shadow p-2 min-h-32 " +
        (isDeleted ? "hidden" : "")
      }
    >
      <div className={"flex grow"}>
        {/*Content*/}
        <div className={"flex grow"}>
          {/*Text area*/}
          <div
            onClick={editCard}
            className={"grow " + (isEditMode ? "hidden" : "")}
          >
            {optimisticCardContent}
          </div>
          {/*Edit area*/}
          <textarea
            ref={textareaRef}
            value={optimisticCardContent}
            onChange={(e) => setOptimisticCardContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                saveCard();
              }
            }}
            className={
              "grow rounded bg-neutral-700 drop-shadow " +
              (isEditMode ? "" : "hidden")
            }
          ></textarea>
        </div>
        {/*Tools*/}
        <div className={"flex flex-col justify-between shrink"}>
          {/*Drag*/}
          <div className={""}>
            <button
              onMouseDown={handleDragStart}
              onMouseUp={handleDragEnd}
              className={"hover:cursor-move"}
            >
              <Icon path={mdiDragVertical} title="Drag" size={1} />
            </button>
          </div>
          {/*Delete*/}
          <div>
            <button onClick={handleDeleteCard}>
              <Icon path={mdiDelete} title="Remove" size={1} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
