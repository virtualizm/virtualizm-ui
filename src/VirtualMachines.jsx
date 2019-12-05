import React, { useMemo} from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TabPanel from './TabPanel';

const Hypervisors = ({activeTab, classes, data}) => {
    const rows = useMemo(() => {
        if(!data) return [];

        return data.map(({id, attributes}) => ({id, ...attributes}));
    }, [data]);

    return (
      <TabPanel activeTab={activeTab} index={0}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Memory</TableCell>
              <TableCell>CPUs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.state}</TableCell>
              <TableCell>{row.memory}</TableCell>
              <TableCell>{row.cpus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TabPanel>
    )
}

export default Hypervisors;