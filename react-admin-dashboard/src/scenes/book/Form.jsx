import { Box, Button, Grid, MenuItem } from '@mui/material';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from '../../components/FormInput';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Header from '../../components/Header';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import { ListOutlined } from '@mui/icons-material';
import { Select } from '../../components/Select';
import { bookApi, useCreateBookMutation, useGetBookQuery, useUpdateBookMutation } from './api/bookApi';
import { toast } from 'react-toastify';

export const BookSchema = yup
  .object()
  .shape({
    title: yup.string().required('title is required'),
    author: yup.string().required('author is required'),
    coverPhotoURL: yup.string().required('coverPhotoURL is required'),
    isbnNumber: yup.number().required('isbnNumber is required'),
    price: yup.number().required('price is required'),
    language: yup.string().required('language is required'),
    genre: yup.string().required('genre is required'),
  })
  .required();
export const Form = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const params = useParams();
  const navigate = useNavigate();
  const languages = bookApi.endpoints.getAllLanguages.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });
  const genres = bookApi.endpoints.getAllGenres.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const [createBook, { isLoading, isError, error, isSuccess }] = useCreateBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const book = useGetBookQuery(params.bookId, { refetchOnFocus: true, refetchOnReconnect: true });

  const defaultValues = {
    title: 'abc',
    author: 'vasdvas',
    coverPhotoURL: 'vasdvsa',
    isbnNumber: 1,
    price: 200,
    language: '',
    genre: '0',
  };
  const methods = useForm({
    resolver: yupResolver(BookSchema),
    defaultValues,
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success(book.data ? 'Book updated successfully' : 'Book created successfully');
      navigate('/book');
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
    if (methods.formState.isSubmitting) {
      methods.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.formState.isSubmitting]);

  const onSubmitHandler = (values) => {
    if (values.id != 0) {
      createBook(values);
    } else {
      updateBook(values);
    }
  };
  useEffect(() => {
    if (book.data) {
      methods.defaultValues = null;
      const fields = ['id', 'title', 'author', 'coverPhotoURL', 'isbnNumber', 'price', 'language', 'genre'];
      fields.forEach((field) => methods.setValue(field, book.data[field]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book]);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Book" subtitle="List of Book for Future Reference" />
        <Box>
          <Link to="/book">
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 20px',
              }}
            >
              <ListOutlined sx={{ mr: '10px' }} />
              List book
            </Button>
          </Link>
        </Box>
      </Box>

      <Box
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <FormProvider {...methods}>
          <Box component="form" noValidate autoComplete="off" onSubmit={methods.handleSubmit(onSubmitHandler)}>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={6} md={6}>
                <FormInput variant="outlined" label="title" name="title" />
              </Grid>

              <Grid item xs={6} md={6}>
                <FormInput variant="outlined" label="author" name="author" />
              </Grid>

              <Grid item xs={6} md={6}>
                <FormInput variant="outlined" label="coverPhotoURL" name="coverPhotoURL" />
              </Grid>

              <Grid item xs={6} md={6}>
                <FormInput type="number" variant="outlined" label="isbnNumber" name="isbnNumber" />
              </Grid>

              <Grid item xs={12} md={12}>
                <FormInput type="number" variant="outlined" label="price" name="price" />
              </Grid>

              <Grid item xs={6} md={6}>
                <Select fullWidth id="genre" name="genre" label="Genre" variant="outlined" margin="normal">
                  <MenuItem value="0">-- None --</MenuItem>
                  {!genres.isLoading &&
                    genres.data.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
              <Grid item xs={6} md={6}>
                <Select fullWidth id="language" name="language" label="Language" variant="outlined" margin="normal">
                  <MenuItem value="0">-- None --</MenuItem>
                  {!languages.isLoading &&
                    languages.data.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              fullWidth
              sx={{ py: '0.8rem', mt: 4, backgroundColor: '#2363eb' }}
              type="submit"
            >
              Save Book
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
};
