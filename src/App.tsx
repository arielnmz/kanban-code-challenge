import React from "react";
import "./App.css";
import Board from "./components/board";

function App() {
  return (
    <div className={"h-full flex flex-col justify-start"}>
      <header>
        <nav>
          <div>Mini-Kanban</div>
        </nav>
      </header>
      <section className={"h-full"}>
        <Board />
      </section>
    </div>
  );
}

export default App;
