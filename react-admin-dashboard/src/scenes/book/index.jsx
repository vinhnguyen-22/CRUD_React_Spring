import { Box, Button, IconButton } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { mockDataContacts } from '../../data/mockData';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';
import { CreateOutlined, DeleteOutline, EditOutlined } from '@mui/icons-material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDeleteBookMutation, useGetAllBooksQuery } from './api/bookApi';
import DataTable from './components/DataTable';
import { useMemo } from 'react';
import { useState } from 'react';

const Book = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isLoading, isFetching, isError, isSuccess, error, data } = useGetAllBooksQuery(
    { pageNumber: 0, pageSize: 10 },
    { refetchOnFocus: true, refetchOnReconnect: true }
  );
  const [deleteBook] = useDeleteBookMutation();
  const onDeleteHandler = (id) => {
    if (window.confirm('Are you sure ' + id)) {
      deleteBook(id);
    }
  };

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: 'coverPhotoURL',
            header: () => 'Photo',
            cell: (info) => {
              return <img src={info.getValue()} width="100" />;
            },
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'title',
            header: () => 'Title',
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: 'Info',
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: 'author',
            header: () => 'Author',
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'isbnNumber',
            header: () => <span>isbnNumber</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'price',
            header: 'Price',
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'language',
            header: 'Language',
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'genre',
            header: 'Genre',
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: 'Action',
        footer: (props) => props.column.id,
        cell: (data) => {
          return (
            <Box display={'flex'}>
              <Link to={`/book/${data.row.original.id}`}>
                <IconButton>
                  <EditOutlined />
                </IconButton>
              </Link>

              <IconButton onClick={() => onDeleteHandler(data.row.original.id)}>
                <DeleteOutline />
              </IconButton>
            </Box>
          );
        },
      },
    ],
    []
  );

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Book" subtitle="List of Book for Future Reference" />
        <Box>
          <Link to="/create-book">
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 20px',
              }}
            >
              <CreateOutlined sx={{ mr: '10px' }} />
              Add book
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
        {!isLoading && <DataTable {...{ data: data, columns }} />}
      </Box>
    </Box>
  );
};

export default Book;
