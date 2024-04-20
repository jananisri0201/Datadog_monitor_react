import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const DataTable = ({ data }) => {
  return (
    <Table>
      <TableHead style={{ backgroundColor: 'lightblue' }}>
        <TableRow>
          {/* Dynamically render table headers based on your API data structure */}
          <TableCell>S.NO</TableCell>
          <TableCell>Monitor ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Query</TableCell>
          <TableCell>Created by</TableCell>
          <TableCell>Creator Email</TableCell>
          {/* Add more table cells as needed */}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item,inx) => (
          <TableRow key={item.id}>
            <TableCell>{inx+1} </TableCell>
            <TableCell>{item.id} </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.query}</TableCell>
            <TableCell>{item.creator.name}</TableCell>
            <TableCell>{item.creator.email}</TableCell>


            {/* Add more table cells as needed */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
