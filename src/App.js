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
    padding: '0 !important',
    minHeight: '100vh'
  },
  grid: {
    minHeight: '100vh'
  },
  table: {
    width: '100%',
    flexGrow: '1'
  },
  paper: {
    minHeight: '100vh'
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
    const virts = virtsResp.map(({id, attributes, relationships}) => {
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

  const updateVirt = useCallback(async (filterId) => {
    setIsLoading(true);
    const virtsResp = await fetchMachines({id: filterId});
    const { id, attributes, relationships } = virtsResp[0];

    const hypId = relationships.hypervisor.data.id;

    const relativeHypervisor = hypsData.find(({ id }) => id === hypId);

    const { name } = relativeHypervisor;

    const newVirt = {
      id,
      ...attributes,
      hypName: name
    };

    const {id: oldVirtIndex} = virtsData.find(({id}) => id === filterId);

    virtsData[oldVirtIndex] = newVirt;

    setVirtsData([...virtsData]);
    setIsLoading(false)
  }, [hypsData, virtsData]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <Box height='100%' className={classes.rootContainer}>
        <Grid container className={classes.grid} >
          <Grid xs={1}>
            <SideMenu activeTab={activeTab} onChange={onChangeTab} />
          </Grid>
          <Grid xs={11}>
            <Paper className={classes.paper}>
              <VirtualMachines 
                data={virtsData}
                classes={classes}
                activeTab={activeTab} 
                isLoading={isLoading}
                updateVirt={updateVirt}
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
