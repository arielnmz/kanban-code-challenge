import React from "react";
import "./App.css";
import Board from "./components/board";

function App() {
  return (
    <div>
      <header>
        <nav>
          <div>Mini-Kanban</div>
        </nav>
      </header>
      <section>
        <Board />
      </section>
    </div>
  );
}

export default App;
