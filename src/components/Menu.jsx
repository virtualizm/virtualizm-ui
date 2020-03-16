import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Menu } from "antd";
import { ThunderboltOutlined, DesktopOutlined } from "@ant-design/icons";
import { deleteSessions } from "../utils/api";
import "../App.scss";

const SideMenu = ({ isOpen, history }) => {
  const handleLogout = async e => {
    try {
      await deleteSessions();
      history.push("/auth");
    } catch (e) {
      // handle error here
    }
  };

  return (
    <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
      <Menu.Item key="1" className="menu-item">
        <Link to="/virtual_machines">
          <DesktopOutlined />
          <span className="menu-item__text">Machines</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2" className="menu-item">
        <Link to="/hypervisors">
          <ThunderboltOutlined />
          <span className="menu-item__text">Hypervisors</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(SideMenu);
