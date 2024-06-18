import React from "react";
import {
  Button,
  Layout,
  Menu,
  Space,
  Typography,
  theme,
} from "antd";
import PTasks from "./PTasks";

const { Header, Content, Footer } = Layout;
const items = [
  {
    key: "1",
    label: "Home",
  },
  {
    key: "2",
    label: "Tasks History",
  },
];

const Porter = ({ user, onLogout }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          // items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <Space align="center" size={"middle"}>
          <Typography style={{ color: "white" }}>
            Welcome, {user.name.first} {user.name.last}
          </Typography>
          <Button onClick={onLogout}>Logout</Button>
        </Space>
      </Header>
      <Content
        style={{
          padding: "48px 48px",
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <PTasks/>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Porter;
