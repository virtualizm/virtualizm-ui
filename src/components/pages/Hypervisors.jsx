import React, { useEffect, useContext, useCallback } from 'react';
import pretty from 'prettysize';
import MaterialTable from 'material-table';
import { fetchHypervisors } from '../../Api';
import { StoreContext, startLoading, stopLoading, addHypervisors } from '../../StoreProvider';


const Hypervisors = () => {
  const { store, dispatch } = useContext(StoreContext);

  const { isLoading, hypervisors } = store;

  const fetchData = useCallback(async () => {
    dispatch(startLoading());
    const json = await fetchHypervisors();

    if(!json.errors) {
      dispatch(addHypervisors(json.data));
    }

    dispatch(stopLoading());
  }, [dispatch]);

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  return (
    <MaterialTable
        title='Hypervisors'
        data={ hypervisors }
        isLoading={isLoading}
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Name', field: 'name' },
          { title: 'CPUs', field: 'cpus' },
          { title: 'mhz', field: 'mhz' },
          { title: 'Total Memory', field: 'total-memory', render: (data) => pretty(data['total-memory'])},
        ]}
      />
  );
}

export default Hypervisors;