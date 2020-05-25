import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { message, Layout } from "antd";
import { SideMenuComponent } from "./SideMenu.component";
import { deleteSessions } from "../../utils/api";

const { Sider } = Layout;

const styles = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  left: 0,
};

export const SideMenuContainer = (props) => {
  const history = useHistory();

  const handleLogout = useCallback(
    async (e) => {
      try {
        await deleteSessions();
        history.push("/auth");
      } catch (e) {
        message.error("Something went wrong :C");
      }
    },
    [history]
  );

  return (
    <Sider {...props} style={styles}>
      <SideMenuComponent handleLogout={handleLogout} />
    </Sider>
  );
};
