import React from "react";
import { Button, Layout, Space, Typography,theme } from "antd";

const { Header: AntHeader } = Layout;

const Header = ({ user, onLogout }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
  return (
    <AntHeader
      style={{
        padding: 0,
        background: colorBgContainer,
        display: "flex",
        justifyContent: "right",
        paddingRight: "16px",
        overflow: 'initial',
        textWrap:'nowrap'
      }}
    >
      <Space align="center" size={"middle"}>
        <Typography>
          Welcome, {user.name.first} {user.name.last}
        </Typography>
        <Button onClick={onLogout}>Logout</Button>
      </Space>
    </AntHeader>
  );
};

export default Header;
