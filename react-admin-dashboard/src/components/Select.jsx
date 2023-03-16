import React from 'react';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export const Select = ({ name, label, children, ...props }) => {
  const labelId = `${name}-label`;

  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <FormControl {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MuiSelect {...field} name={name} error={!!errors[name]} fullWidth labelId={labelId} label={label}>
            {children}
          </MuiSelect>
        )}
      />
    </FormControl>
  );
};
