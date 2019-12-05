import React, { 
  useState,
  useEffect
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Hypervisors from './Hypervisors';
import VirtualMachines from './VirtualMachines';
import { fetchHyps, fetchMachines } from './Api';
import './App.css';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    flexGrow: '1'
  },
  paper: {
    width: '100%',
    overflowX: 'auto',
  },
  header: {
    display: 'flex'
  },
  formControl: {
    width: 100,
    marginRight: 20
  },
  menu: {
    marginRight: 20
  }
});


function App() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [filter, setFilter] = useState({
    id: '',
    name: ''
  });

  const onChangeTab = (e, newTab) => setActiveTab(newTab);

  const classes = useStyles();

  const onFetch = activeTab === 0 ? fetchMachines : fetchHyps;

  const fetchAndSave = async (filters) => {
    const newData = await onFetch(filters);

    setData(newData);
  }

  useEffect(() => {
    fetchAndSave()
  }, [activeTab])

  const onChangeFilter = field => ({target}) => {
    const newFilter = {
      ...filter,
      [field]: target.value
    };

    setFilter(newFilter);
  };

  const filteredData = data && data.data.filter(({id, attributes}) => {
    if(id.indexOf(filter.id) !== -1 && attributes.name.indexOf(filter.name) !== -1) {
      return true;
    }

    return false;
  });

  return (
    <div className="App">
      <Box>
        <Container>
          <Grid container>
            <Grid item xs='2'>
              <Paper className={classes.menu}>
                <Tabs
                  orientation="vertical"
                  value={activeTab}
                  onChange={onChangeTab}
                >
                  <Tab label="VM"></Tab>
                  <Tab label="H"></Tab>
                </Tabs>
              </Paper>
            </Grid>
            <Grid item xs='10'>
              <Paper>
              <Container>
                <Grid cotainer className={classes.header}>
                  <Grid item >
                    <TextField id="standard-basic" label="Id" onChange={onChangeFilter('id')} />
                    <TextField id="standard-basic" label="Name" onChange={onChangeFilter('name')} />
                  </Grid>
                </Grid>
              </Container>
              {/* virtual machines */}
              <VirtualMachines classes={classes} activeTab={activeTab} data={filteredData}/>

              {/* hypervisers */}
             <Hypervisors classes={classes} activeTab={activeTab} data={filteredData} />
             </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

export default App;
