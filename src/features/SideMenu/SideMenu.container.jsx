import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import { SideMenuComponent } from "./SideMenu.component";
import { deleteSessions } from "../../utils/api";

export const SideMenuContainer = () => {
  const history = useHistory();

  const handleLogout = useCallback(
    async e => {
      try {
        await deleteSessions();
        history.push("/auth");
      } catch (e) {
        message.error("Something went wrong :C");
      }
    },
    [history]
  );

  return <SideMenuComponent handleLogout={handleLogout} />;
};
