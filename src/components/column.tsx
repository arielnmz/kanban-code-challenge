import Card from "./card";

export default function Column() {
  return (
    <div
      className={
        "flex flex-col justify-start rounded drop-shadow bg-neutral-700"
      }
    >
      {/*Title and drag and drop target*/}
      <div className={"p-2 font-bold"}>Title</div>
      {/*Cards*/}
      <div className={"flex flex-col justify-start space-y-2 px-2"}>
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
