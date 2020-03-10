import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../TabPanel';
import { StoreContext } from '../../StoreProvider';
import { rebootVm } from '../../Api';
import {makeStyles} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import CloseIcon from '@material-ui/icons/Close';



const useStyles = makeStyles(() => ({
  vmMenu: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
  },
  menuItem: {
    paddingRight: '25px'
  },
  closeTab: {
    float: 'right'
  },
}));

function renderList(data){
  if (data) {
    return (
      <ul>
        { Object.keys(data).map((field) => {
          const label = data[field];
          const isObject = typeof label === 'object';

          if(isObject) {
            return <li>{field} {renderList(label)}</li>;
          }

          return (
            <li key={field}>{`${field}: ${label}`}</li>
          )
        })}
      </ul>
    );
  }
}


const MachineInfo = (props) => {
    const classes = useStyles();
    const [tab, setTab] = useState(0);
    const param = props.match.params.id;

    const { store } = useContext(StoreContext);

    const handleChangeTab = (event, newValue) => {
      setTab(newValue);
    };

    const handlers = {
      changeTab: (event, newValue) => {
        setTab(newValue);
      },
      closeTab: (event) => {
        event.preventDefault();
        props.history.push('/virtual_machines');
      },
      start: () => {},
      reboot: async (event) => {
        event.preventDefault();
        const confirm = window.confirm('Are you sure you want to reboot the virtual machine? All unsaved data will be lost!');
        if (confirm) {
          // await rebootVm(fields.id);
        }
      },
      reset: () => ({}),
      shutdown: () =>({}),
      poweroff: () => ({}),
      suspend: () => ({}),
      pause: () => ({}),
      resume: () =>({}),
      restore: () => ({})

    };

    const vmActionsMenuItems = [
      {
        name: 'Start',
        handler: handlers.start
      },
      {
        name: 'Reboot',
        handler: handlers.reboot
      },
      {
        name: 'Shut down',
        handler: handlers.shutdown
      },
      {
        name: 'Power off',
        handler: handlers.poweroff
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
      {
        name: <CloseIcon />,  // use icon instead text
        handler: handlers.closeTab,
        className: classes.closeTab
      },
    ];

    const item = store.machines.find(({id}) => id === param);

    const { xml, ...fields} = item;

    const host = window.location.host;

    const isLocalhost = host.indexOf('localhost') !== -1

    const url = `${isLocalhost ? 'http://10.255.10.222:8081' : `http://${host}`}/spice/index.html?host=10.255.10.222&port=8081&vmInfoToken=${item.id}`;

    return (
      <div className='modal'>
          <div className={classes.vmMenu}>
            {
              vmActionsMenuItems.map(((value) => {
                return (
                  <Link href="#" onClick={value.handler} className={value.className ? value.className : classes.menuItem}>
                    {value.name}
                  </Link>
                );
              }))
            }

          </div>


          <Tabs value={tab} onChange={handleChangeTab}>
            <Tab label='General'/>
            <Tab label='XML'/>
            <Tab label='Console'/>
          </Tabs>

          <TabPanel activeTab={tab} index={0}>
            {renderList(fields)}
          </TabPanel>
          <TabPanel activeTab={tab} index={1}>
            <p className="xml">
              {xml}
            </p>
          </TabPanel>
          <TabPanel activeTab={tab} index={2}>
            <p className="console">
              <iframe src={url} title="qwe" width='100%' height='100%' id='console' className={classes.console} />
            </p>
          </TabPanel>
      </div>
    )
  }

  export default withRouter(MachineInfo);
