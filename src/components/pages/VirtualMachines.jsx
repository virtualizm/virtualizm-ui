import React, { useEffect, useContext, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import MaterialTable from 'material-table';
import pretty from 'prettysize';
import { fetchVirtualMachines } from '../../Api';
import { addMachines, startLoading, stopLoading, StoreContext } from '../../StoreProvider'
import '../../App.scss';

const renderLabel = ({state}) => {
  const className = state === 'running' ? 'running': 'down';

  return (
    <div className={`label ${className}`}>
      {state}
    </div>
  );
}

const VirtualMachines = (props) => {
  const { store, dispatch } = useContext(StoreContext);

  const { isLoading, machines } = store;

  const fetchData = useCallback(async () => {
    dispatch(startLoading());
    const json = await fetchVirtualMachines();

    if(!json.errors) {
      dispatch(addMachines(json.data));
    }

    dispatch(stopLoading());
  }, [dispatch]);

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  const handleOpen = (e, data) => {
    props.history.push(`/virtual_machines/${data.id}`);
  };

  return (
    <React.Fragment>
      <MaterialTable
        title='Virtual Machines'
        data={ machines }
        isLoading={isLoading}
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Name', field: 'name' },
          { title: 'State', field: 'state', render: renderLabel },
          { title: 'memory', field: 'memory', render: ({memory}) => pretty(memory)},
          { title: 'CPUs', field: 'cpus' },
          { title: 'Hypervisor', field: 'hypervisor.name'}
        ]}
        actions={[{
            icon: 'visibility',
            tooltip: 'Show',
            onClick: handleOpen
          }]}
      />
    </React.Fragment>
  );
}

export default withRouter(VirtualMachines);
