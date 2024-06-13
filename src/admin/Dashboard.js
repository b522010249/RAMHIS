import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  TeamOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import PorterRequestForm from "../functions/Requestporter";
import Piechart from "./Piechart";
import Header from "../dashboard/header";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const items = [
  { key: "1", icon: <PieChartOutlined />, label: "Dashboard",content:<Piechart/> },
  { key: "2", icon: <DesktopOutlined />, label: "Option 2" },
  { key: "3", icon: <ContainerOutlined />, label: "Option 3" },
  {
    key: "sub1",
    label: "Employee",
    icon: <TeamOutlined />,
    children: [
      { key: "5", label: "AddEmployee", content: <PorterRequestForm /> },
      { key: "6", label: "Option 6" },
      { key: "7", label: "Option 7" },
      { key: "8", label: "Option 8" },
    ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    children: [
      { key: "9", label: "Option 9" },
      { key: "10", label: "Option 10" },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          { key: "11", label: "Option 11" },
          { key: "12", label: "Option 12" },
        ],
      },
    ],
  },
];

export default function Dashboard({ user, onLogout }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedContent, setSelectedContent] = useState(items[0].content);

  const handleMenuClick = (content) => {
    setSelectedContent(content);
  };
  const handleCancel = () => {
    setSelectedContent(items[0].content); // Reset selected content to default
  };

  const renderSubMenu = (subMenu) => (
    <SubMenu key={subMenu.key} icon={subMenu.icon} title={subMenu.label}>
      {subMenu.children.map((child) => (
        <Menu.Item
          key={child.key}
          onClick={() => handleMenuClick(child.content)}
        >
          {child.label}
        </Menu.Item>
      ))}
    </SubMenu>
  );

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => console.log(broken)}
        onCollapse={(collapsed, type) => console.log(collapsed, type)}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {items.map((item) =>
            item.children ? (
              renderSubMenu(item)
            ) : (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                onClick={() => handleMenuClick(item.content)}
              >
                {item.label}
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header user={user} onLogout={onLogout} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: "100vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
              <Routes>
                <Route path="/dashboard" element={<Piechart />} />
                <Route path="/porter" element={<PorterRequestForm onCancel={handleCancel} />} />
                <Route path="/option2" element={<div>Option 2 Content</div>} />
                <Route path="/option3" element={<div>Option 3 Content</div>} />
                {/* Add more routes as needed */}
                <Route path="/" element={<Piechart />} />
              </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          RamHIS ©{new Date().getFullYear()} Created by Krit
        </Footer>
      </Layout>
    </Layout>
  );
}
