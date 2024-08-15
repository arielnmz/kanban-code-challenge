import React from "react";
import "./App.css";
import Board from "./components/board";

function App() {
  return (
    <div className={"h-full flex flex-col justify-start"}>
      <header>
        <nav>
          <div className={"p-2 bg-neutral-800"}>
            <span className={"font-bold"}>Mini-Kanban</span>
          </div>
        </nav>
      </header>
      <section className={"h-full"}>
        <Board />
      </section>
    </div>
  );
}

export default App;
