import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Hypervisors from './Hypervisors';
import VirtualMachines from './VirtualMachines';
import { SideMenu } from './components/SideMenu';
import { fetchMachines, fetchHyps } from './Api';
import './App.css';

const useStyles = makeStyles({
  rootContainer: {
    padding: '0 !important'
  },
  table: {
    width: '100%',
    flexGrow: '1'
  },
  paper: {
    width: '100%',
    overflowX: 'auto',
  },
  formControl: {
    width: 100,
    marginRight: 20
  }
});


function App() {
  const classes = useStyles();
  
  const [activeTab, setActiveTab] = useState(0);
  const onChangeTab = (e, newTab) => setActiveTab(newTab);

  const [isLoading, setIsLoading] = useState(false);
  const [hypsData, setHypsData] = useState([]);
  const [virtsData, setVirtsData] = useState([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const hypsResp = await fetchHyps();
    const virtsResp = await fetchMachines();

    const hyps = hypsResp.map(({id, attributes}) => ({id, ...attributes}));
    const virts = virtsResp.map(({id, attributes: { xml, ...attributes }, relationships}) => {
        const hypId = relationships.hypervisor.data.id;

        const relativeHypervisor = hyps.find(({ id }) => id === hypId);

        const { name } = relativeHypervisor;

        return {
          id,
          ...attributes,
          hypName: name
        };
    });

    setIsLoading(false)

    setHypsData(hyps);
    setVirtsData(virts);
  }, []);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <Box>
        <Grid container>
          <Grid xs={1}>
            <SideMenu activeTab={activeTab} onChange={onChangeTab} />
          </Grid>
          <Grid xs={11}>
            <Paper>
              <VirtualMachines 
                data={virtsData}
                classes={classes}
                activeTab={activeTab} 
                isLoading={isLoading}
              />
              <Hypervisors 
                data={hypsData}
                classes={classes} 
                activeTab={activeTab} 
                isLoading={isLoading}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
