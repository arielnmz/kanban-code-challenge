import Icon from "@mdi/react";
import { mdiDelete, mdiDragVertical } from "@mdi/js";
import { MutableRefObject, useCallback, useRef } from "react";

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

export default function Card(props: { cardId: string }) {
  const cardRef = useRef(null);

  const sourceDragStart = useDnDSource(props.cardId, cardRef);
  const [handleDragStart, handleDragEnd] = useDnDHandle(cardRef);

  return (
    <div
      ref={cardRef}
      onDragStart={sourceDragStart}
      onDragEnd={handleDragEnd}
      className={
        "flex rounded bg-neutral-800 drop-shadow p-2 min-w-96 min-h-32"
      }
    >
      <div className={"flex grow"}>
        {/*Content*/}
        <div className={"flex grow"}>
          {/*Text area*/}
          <div className={"grow"}>Card</div>
          {/*Edit area*/}
          <textarea
            className={"grow rounded bg-neutral-700 drop-shadow"}
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
            <button>
              <Icon path={mdiDelete} title="Remove" size={1} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
