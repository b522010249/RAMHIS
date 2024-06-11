import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import {
  ProductOutlined,
  ContainerOutlined,
  DesktopOutlined,
  CalendarOutlined,
  PieChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import PorterRequestForm from "../functions/Requestporter";
import Piechart from "./Piechart";
import Header from "../dashboard/header";

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const items = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: "Dashboard",
    content: <Piechart />,
  },
  { key: "2", icon: <DesktopOutlined />, label: "Tasks" },

  {
    key: "sub1",
    label: "Employee",
    icon: <TeamOutlined />,
    children: [
      { key: "3", icon: <CalendarOutlined />, label: "Calendar" },
      { key: "4", icon: <ContainerOutlined />, label: "Employee" },
    ],
  },
  { key: "5", icon: <ProductOutlined />, label: "Suppleis" },
];

export default function Dashboard({ user, onLogout }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedContent, setSelectedContent] = useState(items[0].content);

  const handleMenuClick = (content) => {
    setSelectedContent(content);
  };

  const renderContent = () => {
    if (selectedContent === "porter" && user.department === "porter") {
      return <PorterRequestForm />;
    }
    return selectedContent;
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
            {renderContent()}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          RamHIS ©{new Date().getFullYear()} Created by Krit
        </Footer>
      </Layout>
    </Layout>
  );
}
