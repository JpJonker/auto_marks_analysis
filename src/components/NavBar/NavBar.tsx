import { Link } from "react-router-dom";
import { Row, Col, Typography, Space } from "antd";

const NavBar = () => {
  return (
    <Row justify='space-between' align='middle'>
      <Col>
        <Link to='/'>
          <Typography.Title level={4} style={{ margin: 0, color: "#fff" }}>
            Auto Excel Tool
          </Typography.Title>
        </Link>
      </Col>
      <Col>
        <Row justify='space-evenly'>
          <Space direction='horizontal'>
            <Col>
              <a href='mailto:devjp2020@yahoo.com'>
                <Typography style={{ color: "#fff" }}>Contact me</Typography>
              </a>
            </Col>
          </Space>
        </Row>
      </Col>
    </Row>
  );
};

export default NavBar;
