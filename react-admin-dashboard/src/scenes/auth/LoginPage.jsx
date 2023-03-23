import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import FormInput from '../../components/FormInput';
import { useLoginUserMutation } from './api/authApi';

const loginSchema = yup.object({
  email: yup.string().min(1, 'Email address is required').email('Email Address is invalid'),
  password: yup
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

const LoginPage = () => {
  // 👇 API Login Mutation
  const [loginUser, { isLoading, isError, error, isSuccess }] = useLoginUserMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/';
  const defaultValues = {
    email: 'nhanvo@admin.com',
    password: 'nhanvo',
  };

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });
  React.useEffect(() => {
    if (isSuccess) {
      toast.success('You successfully logged in');
      navigate(from);
    }
    if (isError) {
      if (Array.isArray(error.data.error)) {
        error.data.error.forEach((el) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error(error.data.message, {
          position: 'top-right',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (methods.isSubmitSuccessful) {
      methods.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.isSubmitSuccessful]);

  const onSubmitHandler = (values) => {
    loginUser(values);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormInput type="email" name="email" label="Email" />
              </Grid>
              <Grid item xs={12}>
                <FormInput type="password" name="password" label="Password" />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="/register">{"Don't have an account? Registration at here"}</Link>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default LoginPage;
