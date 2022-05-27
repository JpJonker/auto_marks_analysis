import React from "react";
import { Link } from "react-router-dom";
import { Row, Space, Typography } from "antd";

const AppFooter = () => {
  return (
    <Row justify='end'>
      <Space direction='horizontal'>
        <Typography style={{ color: "white" }}>&copy; 2202 Dev Jp</Typography>
      </Space>
    </Row>
  );
};

export default AppFooter;
