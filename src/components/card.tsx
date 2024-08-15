import Icon from "@mdi/react";
import { mdiDelete, mdiDragVertical } from "@mdi/js";

export default function Card() {
  return (
    <div
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
            <button draggable={true} className={"hover:cursor-move"}>
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
