import React from "react";
import PropTypes from "prop-types";
import {
  ThunderboltOutlined,
  DesktopOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import styles from "./styles.module.scss";

export const SideMenuComponent = ({ handleLogout }) => {
  return (
    <div className={styles.menu}>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1">
          <Link to="/virtual_machines">
            <DesktopOutlined />
            <span className={styles.menuItemText}>Machines</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/hypervisors">
            <ThunderboltOutlined />
            <span className={styles.menuItemText}>Hypervisors</span>
          </Link>
        </Menu.Item>
      </Menu>
      <Menu theme="dark">
        <Menu.Item key="2" onClick={handleLogout}>
          <LogoutOutlined />
          <span className={styles.menuItemText}>Logout</span>
        </Menu.Item>
      </Menu>
    </div>
  );
};

SideMenuComponent.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};
