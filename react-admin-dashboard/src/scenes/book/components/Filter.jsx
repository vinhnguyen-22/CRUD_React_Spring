import { InputBase } from '@mui/material';
import React from 'react';

const Filter = ({ column, table }) => {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2">
      <InputBase
        type="number"
        value={columnFilterValue?.[0] ?? ''}
        onChange={(e) => column.setFilterValue((old) => [e.target.value, old?.[1]])}
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <InputBase
        type="number"
        value={columnFilterValue?.[1] ?? ''}
        onChange={(e) => column.setFilterValue((old) => [old?.[0], e.target.value])}
        placeholder={`Max`}
        className="w-24 border shadow rounded"
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  ) : (
    <InputBase
      value={columnFilterValue ?? ''}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
      inputProps={{ 'aria-label': 'search' }}
    />
  );
};

export default Filter;
