import { Layout } from "antd";

import { NavBar, Tool, Guide, AppFooter, TermsOfService, PrivacyPolicy } from "./components";
import { Route, Routes } from "react-router-dom";
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
            <Route path='/' element={<Tool />} />
            <Route path='/guide' element={<Guide />} />
            <Route path='/terms-of-service' element={<TermsOfService />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
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
