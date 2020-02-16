import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter, Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {deleteSessions} from "../Api";

const useStyles = makeStyles(() => ({
  link: {
      textDecoration: 'none',
      color: '#000'
  },
  logout: {
    position: 'absolute',
    bottom: '0px'
  }
}))

const Menu = ({isOpen, history}) => {
  const classes = useStyles();

  const handleLogout = async (e) => {
    try {
      await deleteSessions();
      history.push('/auth')
    } catch (e) {
      // handle error here
    }
  };

    return (
        <div>
            <Link to='/virtual_machines' className={classes.link}>
                <ListItem button>
                    <ListItemText primary={isOpen ? 'Virtual Machines' : 'VM'} />
                </ListItem>
            </Link>
            <Link to='/hypervisors' className={classes.link}>
                <ListItem button>
                    <ListItemText primary={isOpen ? "Hypervisors" : 'H'} />
                </ListItem>
             </Link>
          <ListItem button onClick={handleLogout} className={classes.logout}>
            <ListItemText primary={isOpen ? "Logout" : <ExitToAppIcon />} />
          </ListItem>
        </div>
      )
};

export default withRouter(Menu);
