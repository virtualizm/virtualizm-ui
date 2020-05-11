import React from "react";
import PropTypes from "prop-types";
import { Layout, Button, Dropdown, Menu, PageHeader } from "antd";
import { Filter } from "../Filter";
import { setVmState } from "../../utils/api";
import styles from "./styles.module.scss";

const { Header } = Layout;
const headerStyles = {
  backgroundColor: "#fafafa",
  border: "1px solid rgb(235, 237, 240)"
};

const vmStates = {
  RUNNING: "running",
  SHUTDOWN: "shutdown",
  SHUTOFF: "shutoff",
  SUSPEND: "suspend",
  RESUME: "resume",
  REBOOT: "reboot",
  RESET: "reset",
  PAUSE: "pause",
  RESTORE: "restore",
};

const vocabulary = {
  reboot:
    "Are you sure you want to reboot $name?",
  running:
    "Are you sure you want to shut down $name?",
  shutdown:
    "Are you sure you want to shut down $name?",
  shutoff:
    "Are you sure you want to power off $name?",
  suspend: "Are you sure you want to suspend $name?",
  resume: "Are you sure you want to resume $name?",
  pause: "Are you sure you want to pause $name?",
};

const Container = props => {
  const { handleClose, showBackBtn, id, name, state } = props;

  const vmActionsHandler = state => {
    const confirmationText = vocabulary[state].replace("$name", name);

    let confirmed = window.confirm(confirmationText);
    if (confirmed) {
      return setVmState(id, state);
    }
  };

  function handleStateChange({ key }) {
    vmActionsHandler(key);
  }

  const menu = (
    <Menu>
      <Menu.Item key={vmStates.RESET} onClick={handleStateChange}>
        Force Reset
      </Menu.Item>
      <Menu.Item key={vmStates.SHUTDOWN} onClick={handleStateChange}>
        Shut Down
      </Menu.Item>
      <Menu.Item key={vmStates.SHUTOFF} onClick={handleStateChange}>
        Force Shut Off
      </Menu.Item>
      <Menu.Item key={vmStates.PAUSE} onClick={handleStateChange}>
        Pause
      </Menu.Item>
      <Menu.Item key={vmStates.RESUME} onClick={handleStateChange}>
        Resume
      </Menu.Item>
      <Menu.Item key={vmStates.RESTORE} onClick={handleStateChange}>
        Restore
      </Menu.Item>
    </Menu>
  );

  const stateText = state !== vmStates.RUNNING ? "Start" : "Reboot";
  const activeHandler =
    state !== vmStates.RUNNING
      ? () => vmActionsHandler(vmStates.RUNNING)
      : () => vmActionsHandler(vmStates.REBOOT);

  return (
    <PageHeader
      style={headerStyles}
      onBack={showBackBtn ? () => handleClose() : ""}
      title={showBackBtn ? name : <Filter />}
      extra={
        showBackBtn ? [
          <Dropdown.Button
            overlay={menu}
            className={styles.dropdown}
            onClick={activeHandler}
          >
            {stateText}
          </Dropdown.Button>
        ] : [""]
      }
    >
    </PageHeader >
  );
};

Container.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(null)])
    .isRequired,
  state: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  showBackBtn: PropTypes.bool.isRequired,
};

export const HeaderComponent = React.memo(Container);
