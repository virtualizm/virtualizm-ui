import React from 'react';
import TabPanel from './TabPanel';
import MaterialTable from 'material-table';
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

const Modal = ({handleClose, data}) => {
  return (
    <div className='modal'>
      <button onClick={handleClose}>Close</button>

      {renderList(data)}
    </div>
  )
}

const Hypervisors = ({ activeTab, isLoading, data }) => {
  const [modal, setModal] = React.useState(null);

  const handleOpen = (e, data) => {
    setModal(data);
  };

  const handleClose = () => {
    setModal(null);
  };

  return (
    <TabPanel activeTab={activeTab} index={0}>
      {modal && <Modal data={modal} handleClose={handleClose}/>}
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