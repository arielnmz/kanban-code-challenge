import Column from "./column";
import { DnDTargetsContext } from "../contexts";

export default function Board() {
  const colRefs: string[] = ["1", "2", "3"];

  return (
    <div
      className={
        "h-full flex flex-row flex-nowrap justify-start space-x-4 p-2 pb-4"
      }
    >
      <DnDTargetsContext.Provider value={colRefs}>
        <Column columnId={"1"} />
        <Column columnId={"2"} />
        <Column columnId={"3"} />
      </DnDTargetsContext.Provider>
    </div>
  );
}
