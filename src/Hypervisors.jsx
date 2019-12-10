import React from 'react';
import pretty from 'prettysize';
import MaterialTable from 'material-table';
import TabPanel from './TabPanel';

const Hypervisors = ({ activeTab, isLoading, data }) => {
  return (
    <TabPanel activeTab={activeTab} index={1}>
      <MaterialTable
        title='Hypervisors'
        data={ data }
        isLoading={isLoading}
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Name', field: 'name' },
          { title: 'CPUs', field: 'cpus' },
          { title: 'mhz', field: 'mhz' },
          { title: 'Total Memory', field: 'total-memory', render: (data) => pretty(data['total-memory'])},
        ]}
      />
    </TabPanel>
  );
}

export default Hypervisors;