import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  SolutionOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import PorterRequestForm from "../functions/Requestporter";
import Piechart from "./Piechart";
import Header from "../dashboard/header";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PorterLists from "../functions/PorterLists";

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const items = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: "Dashboard",
    path: "/dashboard",
    content: <Piechart />,
  },
  { key: "2", icon: <DesktopOutlined />, label: "Option 2", path: "/option2" },
  { key: "3", icon: <ContainerOutlined />, label: "Option 3", path: "/option3" },
  {
    key: "sub1",
    label: "Request",
    icon: <SolutionOutlined />,
    children: [
      { key: "5", label: "porter", path: "/porter" },
      { key: "6", label: "Option 6", path: "/option6" },
      { key: "7", label: "Option 7", path: "/option7" },
      { key: "8", label: "Option 8", path: "/option8" },
    ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    children: [
      { key: "9", label: "Option 9", path: "/option9" },
      { key: "10", label: "Option 10", path: "/option10" },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          { key: "11", label: "Option 11", path: "/option11" },
          { key: "12", label: "Option 12", path: "/option12" },
        ],
      },
    ],
  },
];

const Dashboard = ({ user, onLogout }) => {
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
        <Menu.Item key={child.key}>
          <Link to={child.path}>{child.label}</Link>
        </Menu.Item>
      ))}
    </SubMenu>
  );

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed) => console.log(collapsed)}
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
                  <Link to={item.path}>{item.label}</Link>
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
                background: "#fff",
              }}
            >
              <Routes>
                <Route path="/dashboard" element={<Piechart />} />
               
                <Route path="/porter" element={ <PorterLists/>} />
                <Route path="/option2" element={<PorterRequestForm onCancel={handleCancel} />} />
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
    </Router>
  );
};

export default Dashboard;
