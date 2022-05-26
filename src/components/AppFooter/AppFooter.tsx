import React from "react";
import { Link } from "react-router-dom";
import { Row, Space, Typography } from "antd";

const AppFooter = () => {
  return (
    <Row justify='end'>
      <Space direction='horizontal'>
        <Link to='/terms-of-service'>
          <Typography style={{ color: "white" }}>Term of Service</Typography>
        </Link>
        <Link to='/privacy-policy'>
          <Typography style={{ color: "white" }}>Privacy Policy</Typography>
        </Link>
        <Typography style={{ color: "white" }}>&copy; 2202 Dev Jp</Typography>
      </Space>
    </Row>
  );
};

export default AppFooter;
