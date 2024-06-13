import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  CalendarOutlined,
  ProductOutlined,
  ContainerOutlined,
  DesktopOutlined,
  TeamOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import PorterRequestForm from "../functions/Requestporter";
import Piechart from "./Piechart";
import Header from "../dashboard/header";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Tasks from "./Tasks";
import Employee from "./Employee";

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
  { key: "2", icon: <DesktopOutlined />, label: "Tasks" ,path: "/tasks",},

  {
    key: "sub1",
    label: "Employee",
    path:"/employee",
    icon: <TeamOutlined />,
    
    children: [
      { key: "3", icon: <CalendarOutlined />, label: "Calendar",path: "/Calendar", },
      { key: "4", icon: <ContainerOutlined />, label: "Employee" ,path: "/employee",},
    ],
  },
  { key: "5", icon: <ProductOutlined />, label: "Suppleis",path: "/suppleis", },
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
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
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
              
                background: "#fff",
              }}
            >
              <Routes>
                <Route path="/dashboard" element={<Piechart />} />
                <Route path="/Tasks" element={<Tasks/>} />
                <Route path="/employee" element={<Employee/>} />
                <Route path="/Calendar" element={<div>Calendar</div>} />
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
