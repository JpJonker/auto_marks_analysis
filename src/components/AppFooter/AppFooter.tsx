import React from "react";
import { Link } from "react-router-dom";
import { Row, Space, Typography } from "antd";

const AppFooter = () => {
  return (
    <Row justify='space-between'>
      <Link to='/'>
        <Typography.Title level={4} style={{ color: "#fff" }}>
          Auto Excel Tool
        </Typography.Title>
      </Link>

      <Space direction='vertical'>
        <a href='https://termify.io/privacy-policy/1653482800'>
          <Typography.Text style={{ color: "#fff" }}>Privacy policy</Typography.Text>
        </a>
        <a href='https://termify.io/terms-and-conditions/1653479159'>
          <Typography.Text style={{ color: "#fff" }}>Terms of conditions</Typography.Text>
        </a>
        <Typography style={{ color: "white" }}>&copy; 2202 Dev Jp</Typography>
      </Space>
    </Row>
  );
};

export default AppFooter;
