import { Layout } from "antd";

import { NavBar, Tool } from "./components";
import { Route, Routes } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.scss";

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Layout className='app'>
      <Header>
        <NavBar />
      </Header>
      <Layout>
        <Content className='app__content-container'>
          <Routes>
            <Route path='/' element={<Tool />} />
          </Routes>
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default App;
