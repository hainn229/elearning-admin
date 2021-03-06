/* eslint-disable no-unused-vars */
import "antd/dist/antd.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, Redirect } from "react-router-dom";
import { Button, Dropdown, Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  ShoppingOutlined,
  MessageOutlined,
  BookOutlined,
  SettingOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";
import { Router } from "./Router";
import { useAuth } from "../hooks/useAuth";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
export const Index = () => {
  const request = useAuth();
  const user = useSelector((state) => {
    return state.signInReducer.data;
  });
  const [collapsed, setCollapsed] = useState(false);
  if (request.error) {
    return <Redirect to={`/login`} />;
  }
  if (!user) {
    return <Redirect to={`/login`} />;
  }

  const signOut = async () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <Layout className="dashboard">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {collapsed === true ? (
          <h1
            style={{
              color: "white",
              marginTop: 16,
              fontSize: 40,
              textAlign: "center",
            }}
          >
            A
          </h1>
        ) : (
          <h1
            style={{
              color: "white",
              marginTop: 16,
              fontSize: 40,
              textAlign: "center",
            }}
          >
            Admin
          </h1>
        )}

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to={`/`}>Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to={`/users`}>Users</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UnorderedListOutlined />}>
            <Link to={`/categories`}>Categories</Link>
          </Menu.Item>
          <SubMenu key="4" icon={<BookOutlined />} title="Courses">
            <Menu.Item key="s1">
              <Link to={`/courses`}>All Courses</Link>
            </Menu.Item>
            <Menu.Item key="s2">
              <Link to={`/courses/add`}>Add New Course</Link>
            </Menu.Item>
            <Menu.Item key="s3">
              <Link to={`/courses/admin`}>My Courses</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="5" icon={<PayCircleOutlined />}>
            <Link to={`/transactions`}>Transactions</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<ShoppingOutlined />}>
            <Link to={`/orders`}>Orders</Link>
          </Menu.Item>
          <Menu.Item key="comments" icon={<MessageOutlined />} disabled>
            <Link to={`/comments`}>Comments</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Button
            style={{ float: "left", marginTop: 16, marginLeft: 10 }}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed === true ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <Dropdown
            overlay={
              <Menu style={{ textAlign: "center" }}>
                <Menu.Item key="11">Edit Profile</Menu.Item>
                <Menu.Item key="12">
                  <Button type="link" danger onClick={signOut}>
                    Sign Out
                  </Button>
                </Menu.Item>
              </Menu>
            }
            arrow
            placement="bottomLeft"
          >
            <Button
              type="link"
              style={{
                float: "right",
                marginTop: 16,
                marginRight: 10,
              }}
            >
              <SettingOutlined /> Adminstrator
            </Button>
          </Dropdown>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Router />
        </Content>
      </Layout>
    </Layout>
  );
};
