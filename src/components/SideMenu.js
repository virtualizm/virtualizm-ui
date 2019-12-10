import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';


const useStyles = makeStyles({
    menu: {
        marginRight: 20
    }
});

export const SideMenu = ({activeTab, onChange}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.menu}>
            <Tabs
                orientation="vertical"
                value={activeTab}
                onChange={onChange}
            >
                <Tab label="VM"></Tab>
                <Tab label="H"></Tab>
            </Tabs>
        </Paper>
    )
}