import React from "react";
import "./App.css";
import Board from "./components/board";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const apiUrl = process.env.REACT_APP_API_URL || "/api/gql";

const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache(),
});

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
        <ApolloProvider client={client}>
          <Board />
        </ApolloProvider>
      </section>
    </div>
  );
}

export default App;
