import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {withRouter} from "react-router-dom";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {setVmState} from "../../../Api";

const vmStates = {
  RUNNING: 'running',
  SHUTDOWN: 'shutdown',
  SHUTOFF: 'shutoff',
  SUSPEND: 'suspend',
  RESUME: 'resume',
  REBOOT: 'reboot',
  RESET: 'reset',
  PAUSE: 'pause',
  RESTORE: 'restore'
};

const useStyles = makeStyles(() => ({
  closeTab: {
    float: 'right'
  },
  dropDownMenu: {
    marginTop: '40px'
  }
}));

const MachineMenu = (props) => {
  const classes = useStyles();

  const [dropDownAnchor, setDropDownAnchor] = useState(null);

  const vmActionsHandler = (event, state, confirmation) => {
    event.preventDefault();
    let confirmed = true;
    if (confirmation) {
      confirmed = window.confirm(confirmation);
    }
    if (confirmed) {
      return setVmState(props.vm.id, state);
    }
  };


  const handlers = {
    toggleActionsMenu: (event) => {
      dropDownAnchor ? setDropDownAnchor(null) : setDropDownAnchor(event.currentTarget);
    },
    closeTab: (event) => {
      event.preventDefault();
      props.history.push('/virtual_machines');
    },
    start: async (event) => await vmActionsHandler(event, vmStates.RUNNING),
    reboot: async (event) => await vmActionsHandler(event, vmStates.REBOOT, `Are you sure you want to reboot ${props.vm.name}? All unsaved data will be lost!`),
    reset: async (event) => await vmActionsHandler(event, vmStates.RESET, `Are you sure you want to reset ${props.vm.name}? All unsaved data will be lost!`),
    shutdown: async (event) => await vmActionsHandler(event, vmStates.SHUTDOWN, `Are you sure you want to shut down ${props.vm.name}? All unsaved data will be lost!`),
    shutoff: async (event) => await vmActionsHandler(event, vmStates.SHUTOFF, `Are you sure you want to power off ${props.vm.name}? All unsaved data will be lost!`),
    suspend: async (event) => await vmActionsHandler(event, vmStates.SUSPEND, `Are you sure you want to suspend ${props.vm.name}?`),
    pause: async (event) => await vmActionsHandler(event, vmStates.PAUSE, `Are you sure you want to pause ${props.vm.name}?`),
    resume: async (event) => await vmActionsHandler(event, vmStates.RESUME),
    restore: async (event) => await vmActionsHandler(event, vmStates.RESTORE),
  };

  const otherActionItems = [
    {
      name: 'Shut down',
      handler: handlers.shutdown
    },
    {
      name: 'Shut off',
      handler: handlers.shutoff
    },
    {
      name: 'Suspend',
      handler: handlers.suspend
    },
    {
      name: 'Pause',
      handler: handlers.pause
    },
    {
      name: 'Resume',
      handler: handlers.resume
    },
    {
      name: 'Restore',
      handler: handlers.restore
    },
  ];

  return (
    <div>
      <ButtonGroup>
        <Button
          onClick={handlers.start}
          color='primary'
        >
          Start
        </Button>
        <Button
          onClick={handlers.reboot}
          color='secondary'
        >
          Reboot
        </Button>
        <Button
          color='primary'
          onClick={handlers.toggleActionsMenu}
        >
          <ArrowDropDownIcon />
        </Button>

      </ButtonGroup>

      <Menu
        anchorEl={dropDownAnchor}
        open={Boolean(dropDownAnchor)}
        onClose={handlers.toggleActionsMenu}
        className={classes.dropDownMenu}
        transitionDuration={0}
      >
        {
          otherActionItems.map(item => (
            <MenuItem
              onClick={item.handler}
            >
              {item.name}
            </MenuItem>
          ))
        }
      </Menu>

      <Button
        onClick={handlers.closeTab}
        className={classes.closeTab}
      >
        <CloseIcon />
      </Button>
    </div>
  );

};

export default withRouter(MachineMenu);
