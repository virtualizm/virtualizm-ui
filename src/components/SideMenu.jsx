import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";

export const SideMenu = ({ activeTab, onChange }) => {
  return (
    <Paper>
      <Tabs orientation="vertical" value={activeTab} onChange={onChange}>
        <Tab label="VM"></Tab>
        <Tab label="H"></Tab>
      </Tabs>
    </Paper>
  );
};
