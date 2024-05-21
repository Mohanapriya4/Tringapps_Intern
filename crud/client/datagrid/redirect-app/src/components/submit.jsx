import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { Button } from '@mui/material';

export default function Sub() {
  const [users, setUsers] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [editRowId, setEditRowId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleEdit = (event, cellValues) => {
    setEditRowId(cellValues.id);
    setEditRowsModel((prevEditRowsModel) => ({
      ...prevEditRowsModel,
      [cellValues.id]: true,
    }));
  };

  const handleSave = async (event, cellValues) => {
    const { id } = cellValues.row;
    try {
      await axios.put(`http://localhost:8081/edit_user/${id}`, cellValues.row);
      setEditRowsModel((prevEditRowsModel) => ({
        ...prevEditRowsModel,
        [cellValues.id]: false,
      }));
      setEditRowId(null);
      fetchData();
    } catch (err) {
      console.error('Error saving data:', err);
    }
  };

  const handleDelete = async (event, cellValues) => {
    try {
      await axios.delete(`http://localhost:8081/delete_user/${cellValues.row.id}`);
      fetchData();
    } catch (err) {
      console.error('Error deleting data:', err);
    }
  };

  const columns = [
    { field: 'userId', headerName: 'ID', width: 90, editable: false },
    { field: 'username', headerName: 'Username', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    { field: 'phoneNumber', headerName: 'Phoneno', width: 150, editable: true },
    { field: 'city', headerName: 'City', width: 150, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (cellValues) => (
        editRowId === cellValues.id ? (
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleSave(event, cellValues);
            }}
          >
            Save
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleEdit(event, cellValues);
            }}
          >
            Edit
          </Button>
        )
      ),
    },
    {
      field: 'Delete',
      headerName: 'Delete',
      width: 150,
      renderCell: (cellValues) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={(event) => {
            handleDelete(event, cellValues);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/users');
      setUsers(response.data.map((user, index) => ({ ...user, id: user.userId })));
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        editRowsModel={editRowsModel}
        onEditRowModelChange={(newModel) => setEditRowsModel(newModel)}
        components={{
          Toolbar: GridToolbar,
        }}
        onCellClick={handleCellClick}
        onRowClick={handleRowCellClick}
      />
    </div>
  );
}
