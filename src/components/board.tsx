import Column from "./column";

export default function Board() {
  return (
    <div
      className={
        "h-full flex flex-row flex-nowrap justify-start space-x-4 p-2 pb-4"
      }
    >
      <Column />
      <Column />
      <Column />
    </div>
  );
}
