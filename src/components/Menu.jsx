import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter, Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(() => ({
    link: {
        textDecoration: 'none',
        color: '#000'
    }
}))

const Menu = ({isOpen}) => {
    const classes = useStyles();

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
        </div>
      )
};

export default withRouter(Menu);