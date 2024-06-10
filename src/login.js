import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Typography,
  message,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React, { useState,useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./config/firebase";
const Login = ({ onLogin }) => {


  const onFinish = async (values) => {
    const { username, password } = values;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );

      const userId = userCredential.user.uid;
      const userDocRef = doc(db, "Employees", userId);
      const userDocSnapshot = await getDoc(userDocRef);
      let user
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();


        const departmentDocRef = userData.department;
        const departmentDocSnapshot = await getDoc(departmentDocRef);

        if (departmentDocSnapshot.exists()) {
          const departmentData = departmentDocSnapshot.data();
          user = {
            role: userData.role,
            department: departmentData.name,
            name: userData.name
          };

        } else {
          message.error("Department does not exist!");
        }

        message.success("Login successful!");
        onLogin(user)
      } else {
        message.error("No such user data!");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row align="middle" justify="space-around">
      <Col xs={20} sm={15} md={10} lg={10} xl={7}>
        <Card>
          <Typography.Title a>Signin</Typography.Title>
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
