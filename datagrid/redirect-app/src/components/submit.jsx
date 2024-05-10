import React from 'react';
import { useCookies } from 'react-cookie';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid from Material-UI



export default function Sub() {
  const [cookies] = useCookies();
  const users = cookies.users || [];

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phoneNumber', headerName: 'Phoneno', width: 150 },
  ];

  // Create rows from users array
  const rows = users.map((user, index) => ({
    id: index + 1, // Use index + 1 as ID
    username: user.username,
    city: user.city,
    email: user.email,
    phoneNumber: user.phoneNumber, 
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
