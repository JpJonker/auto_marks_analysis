import { Container, Box } from "@mui/material";

import { NavBar, Footer } from "./components";
import { AsmtMarkTool } from "./containers";

const App = () => {
  return (
    <>
      <NavBar />
      <Container fixed>
        <header></header>
        <main>
          <AsmtMarkTool />
        </main>
      </Container>
    </>
  );
};

export default App;
