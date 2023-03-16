import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CssTextField } from './styles';

const FormInput = ({ type, variant = 'outlined', name, label, ...props }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <CssTextField
          {...field}
          {...props}
          variant={variant}
          label={label}
          fullWidth
          margin="dense"
          sx={{ mb: '1.5rem' }}
          type={type}
          error={!!errors[name]}
          helperText={errors[name] ? errors[name].message : ''}
        />
      )}
    />
  );
};

export default FormInput;
