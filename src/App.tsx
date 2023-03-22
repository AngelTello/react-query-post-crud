import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Posts from "./components/posts/Posts.component";

import "./App.css";
import PostDetail from "./components/posts/PostDetail.component";
import Home from "./Home.component";

const { Header, Content, Footer } = Layout;

const menuItems = [
  {
    key: "/",
    label: "Home",
  },
  {
    key: "/posts",
    label: "Posts",
  },
];

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/:postId" element={<PostDetail />} />
      </Route>
    </Routes>
  );
};

const AppLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [selectedMenuItem, setSelectedMenuItem] = useState("/");

  const navigate = useNavigate();

  const gotoURL = (e: any) => {
    navigate(e.key);
    setSelectedMenuItem(e.key);
  };

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          items={menuItems}
          selectedKeys={[selectedMenuItem]}
          theme="dark"
          mode="horizontal"
          onClick={gotoURL}
        />
      </Header>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        <div
          className="site-layout-content"
          style={{ background: colorBgContainer }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by ATello
      </Footer>
    </Layout>
  );
};

export default App;
