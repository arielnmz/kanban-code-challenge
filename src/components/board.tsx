import Column from "./column";

export default function Board() {
  return (
    <div
      className={
        "h-full flex flex-row flex-nowrap justify-start space-x-4 p-2 pb-4"
      }
    >
      <Column columnId={"1"} />
      <Column columnId={"2"} />
      <Column columnId={"3"} />
    </div>
  );
}
