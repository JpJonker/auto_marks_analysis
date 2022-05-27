import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";

import { NavBar, AppFooter } from "./components";
import { AutoExcelTool, AutoExcelToolGuide } from "./containers";
import "antd/dist/antd.min.css";
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
            <Route path='/' element={<AutoExcelTool />} />
            <Route path='/help' element={<AutoExcelToolGuide />} />
          </Routes>
        </Content>
      </Layout>
      <Footer style={{ backgroundColor: "#001529" }}>
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default App;
