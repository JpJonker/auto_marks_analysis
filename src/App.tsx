import React from "react";
import { NavBar, Footer } from "./components";
import { AsmtMarkTool, Home, About, Blog } from "./containers";

const App = () => {
  return (
    <div>
      <header></header>
      <main>
        <AsmtMarkTool />
      </main>
    </div>
  );
};

export default App;
