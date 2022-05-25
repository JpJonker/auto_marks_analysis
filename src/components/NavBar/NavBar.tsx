import { Link } from "react-router-dom";
import { Row, Col, Typography, Space } from "antd";

const NavBar = () => {
  return (
    <Row justify='space-between' align='middle'>
      <Col>
        <Link to='/'>
          <Typography.Title level={2} style={{ margin: 0, color: "#fff" }}>
            Logo
          </Typography.Title>
        </Link>
      </Col>
      <Col>
        <Row justify='space-evenly'>
          <Col>
            <Link to='/guide'>
              <Typography style={{ color: "#fff" }}>Guide</Typography>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default NavBar;
