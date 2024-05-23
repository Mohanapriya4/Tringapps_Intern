import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export default function Sub() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [editRowId, setEditRowId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
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

  const handleDeleteAll = async () => {
    if (selectedRows.length === 0) {
      console.warn('No rows selected');
      return;
    }
  
    try {
      console.log('Deleting selected rows:', selectedRows); // Debugging line
      await axios.delete('http://localhost:8081/delete_users', { data: { ids: selectedRows } });
      fetchData();
      setSelectedRows([]);
    } catch (err) {
      console.error('Error deleting selected data:', err);
    }
  };
   
  const handleCreateUser = () => {
    navigate('/'); // Navigate to your login page
    
  };

  

  const columns = [
    { field: 'userId', headerName: 'ID', width: 90, editable: false },
    { field: 'username', headerName: 'Username', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    { field: 'phoneNumber', headerName: 'Phoneno', width: 150, editable: true },
    { field: 'birthDate', headerName: 'Birth Date', width: 150, editable: true },
    { field: 'gender', headerName: 'Gender', width: 150, editable: true },
    { field: 'address', headerName: 'Address', width: 200, editable: true },
    { field: 'country', headerName: 'Country', width: 150, editable: true },
    { field: 'city', headerName: 'City', width: 150, editable: true },
    { field: 'region', headerName: 'Region', width: 150, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (cellValues) => (
        editRowId === cellValues.id ? (
          <IconButton
            color="primary"
            onClick={(event) => {
              handleSave(event, cellValues);
            }}
          >
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton
            color="primary"
            onClick={(event) => {
              handleEdit(event, cellValues);
            }}
          >
            <EditIcon />
          </IconButton>
        )
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      renderCell: (cellValues) => (
        <IconButton
          color="secondary"
          onClick={(event) => {
            handleDelete(event, cellValues);
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/users');
      setUsers(response.data.map((user) => ({ ...user, id: user.userId })));
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div style={{ height: 600, width: '80%' }}>
      <Button onClick={handleCreateUser} style={{ margin: '20px', background: 'blue', color: 'white' }}>
        Create user
      </Button>
      <Button onClick={handleDeleteAll} style={{ margin: '20px', background: 'red', color: 'white' }}>
        Delete Selected
      </Button>
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
        checkboxSelection
        disableSelectionOnClick
        onRowSelectionModelChange={(ids) => {
          console.log('Selected IDs:', ids); // Debug: Log selected IDs
          setSelectedRows(ids);
        }}
      />
    </div>
  </div>
  );
}
