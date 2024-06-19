import React, { useEffect, useState } from "react";
import { Button, Col, Layout, Menu, Row, Space, Typography, theme } from "antd";
import PTasks from "./PTasks";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
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
  const [hasWork, setHasWork] = useState(false); // State to determine if the porter has work
  useEffect(() => {
    const docRef = doc(db, "Employees", user.id);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        // Check if the 'work' field exists and is not empty
        if (docSnap.data().work) {
          setHasWork(true); // There is work
  
        } else {
          setHasWork(false); // No work (work field is empty or does not exist)
        }
      } else {
        console.log("No such document!");
      }
    });

    return () => unsubscribe(); // Unsubscribe from snapshot listener when component unmounts or user changes
  }, [user]);
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

          <Row>
            {hasWork ? (
              <Col span={24}>
                Working
              </Col>
            ) : (
              <Col span={24}><PTasks /></Col>
            )}
          </Row>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED{hasWork}
      </Footer>
    </Layout>
  );
};

export default Porter;
