import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import UsersPage from "./screens/users.page.tsx";
import { FireOutlined, TeamOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import "./App.scss";
import axios from "axios";

const items: MenuProps["items"] = [
  {
    label: <Link to="/">Home</Link>,
    key: "home",
    icon: <FireOutlined />,
  },
  {
    label: <Link to="/users">Manage users</Link>,
    key: "users",
    icon: <TeamOutlined />,
  },
];

const Header = () => {
  const [current, setCurrent] = useState("home");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

const LayoutAdmin = () => {
  const getAllUsersWithoutPaginateByAxios = async () => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/api/v1/auth/login",
        data: {
          username: "admin@gmail.com",
          password: "123456",
        },
      });

      localStorage.setItem("access_token", response.data.data.access_token);
    } catch (error) {}
  };

  useEffect(() => {
    getAllUsersWithoutPaginateByAxios();
  }, []);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <App /> },
      {
        path: "users",
        element: <UsersPage />,
      },
    ],
  },

  {
    path: "/tracks",
    element: <div>Manage tracks</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
