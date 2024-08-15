import Card from "./card";

export default function Column() {
  return (
    <div className={" rounded bg-neutral-700"}>
      <div className={"p-2 font-bold"}>Title</div>
      <div className={"flex flex-col justify-start space-y-2 px-2"}>
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
