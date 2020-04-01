import React from "react";
import PropTypes from "prop-types";
import { Layout, Button, Dropdown, Menu } from "antd";
import { Filter } from "../Filter";
import { setVmState } from "../../utils/api";
import styles from "./styles.module.scss";

const { Header } = Layout;
const headerStyles = { padding: "0 16px" };

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
    "Are you sure you want to reboot $name? All unsaved data will be lost!",
  running:
    "Are you sure you want to shut down $name? All unsaved data will be lost!",
  shutdown:
    "Are you sure you want to shut down $name? All unsaved data will be lost!",
  shutoff:
    "Are you sure you want to power off $name? All unsaved data will be lost!",
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
      <Menu.Item key={vmStates.SHUTDOWN} onClick={handleStateChange}>
        Shut down
      </Menu.Item>
      <Menu.Item key={vmStates.SHUTDOFF} onClick={handleStateChange}>
        Shut off
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

  const stateText = state !== "running" ? "Start" : "Reboot";
  const activeHandler =
    state !== "running"
      ? () => vmActionsHandler(vmStates.RUNNING)
      : () => vmActionsHandler(vmStates.REBOOT);

  return (
    <Header style={headerStyles}>
      {showBackBtn ? (
        <>
          <Button onClick={handleClose}>Close</Button>
          <Dropdown.Button
            overlay={menu}
            className={styles.dropdown}
            onClick={activeHandler}
          >
            {stateText}
          </Dropdown.Button>
        </>
      ) : (
        <Filter />
      )}
    </Header>
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
