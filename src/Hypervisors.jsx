import React, { useMemo} from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TabPanel from './TabPanel';

const Hypervisors = ({ activeTab, classes, data }) => {
    const rows = useMemo(() => {
        if(!data) return [];

        return data.map(({id, attributes}) => ({id, ...attributes}));
    }, [data]);

    return (
    <TabPanel activeTab={activeTab} index={1}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>CPUs</TableCell>
            <TableCell>mhz</TableCell>
            <TableCell>Total-memory</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {rows.map(row => (
          <TableRow key={row.name}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.cpus}</TableCell>
            <TableCell>{row.mhz}</TableCell>
            <TableCell>{row['total-memory']}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
    </TabPanel>
    )
}

export default Hypervisors;