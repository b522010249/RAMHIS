import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
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

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const items = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: "Dashboard",
    content: <Piechart />,
  },
  { key: "2", icon: <DesktopOutlined />, label: "Option 2" },
  { key: "3", icon: <ContainerOutlined />, label: "Option 3" },
  {
    key: "sub1",
    label: "Request",
    icon: <SolutionOutlined />,
    children: [
      { key: "5", label: "porter", content: <PorterRequestForm /> },
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
  const [collapsed, setCollapsed] = useState();
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
        onCollapse={(collapsed)=> setCollapsed(collapsed)}
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
              padding: 10,
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
