import React, { useState } from 'react';
import TabPanel from './TabPanel';
import MaterialTable from 'material-table';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import pretty from 'prettysize';
import './App.css';

const renderLabel = ({state}) => {
  const className = state === 'running' ? 'running': 'down';

  return (
    <div className={`label ${className}`}>
      {state}
    </div>
  );
}

function renderList(data){
  return (
    <ul>
      {Object.keys(data).map((field) => {
        const label = data[field];
        const isObject = typeof label === 'object';
        
        if(isObject) {
          return <li>{field} {renderList(label)}</li>;
        }

        return (
          <li>{`${field}: ${label}`}</li>
        )
      })}    
    </ul>
  );
}

const Modal = ({handleClose, data, isLoading}) => {
  const [tab, setTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  }

  const { xml, ...fields} = data;

  const host = window.location.host;

  const isLocalhost = host.indexOf('localhost') !== -1

  const url = `${isLocalhost ? 'http://10.255.10.222:8081' : host}/spice/index.html?host=10.255.10.222&port=8081&vmInfoToken=${data.id}`;

  return (
    <div className='modal'>
      {isLoading ? 'updating...' : (
        <>
        <button onClick={handleClose}>Close</button>
        <Tabs value={tab} onChange={handleChangeTab}>
          <Tab label='General'/>
          <Tab label='XML'/>
        </Tabs>
  
        <TabPanel activeTab={tab} index={0}>
          {renderList(fields)}
          <iframe src={url} title="qwe" width='100%' height='100%' id='myiframe'></iframe>
        </TabPanel>
        <TabPanel activeTab={tab} index={1}>
          <p className="xml">
            {xml}
          </p>
        </TabPanel>
        </>
      )}
    </div>
  )
}

const Hypervisors = ({ activeTab, isLoading, data, updateVirt }) => {
  const [modal, setModal] = React.useState(null);

  const handleOpen = (e, data) => {
    updateVirt(data.id);
    setModal(data);
  };

  const handleClose = () => {
    setModal(null);
  };

  return (
    <TabPanel activeTab={activeTab} index={0}>
      {modal && <Modal data={modal} handleClose={handleClose} isLoading={isLoading}/>}
      <MaterialTable
        title='Virtual Machines'
        data={ data }
        isLoading={isLoading}
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Name', field: 'name' },
          { title: 'State', field: 'state', render: renderLabel },
          { title: 'memory', field: 'memory', render: ({memory}) => pretty(memory)},
          { title: 'CPUs', field: 'cpus' },
          { title: 'Hypervisor', field: 'hypName'}
        ]}
        actions={[{
            icon: 'visibility',
            tooltip: 'Show',
            onClick: handleOpen
          }]}
      />
    </TabPanel>
  );
}

export default Hypervisors;