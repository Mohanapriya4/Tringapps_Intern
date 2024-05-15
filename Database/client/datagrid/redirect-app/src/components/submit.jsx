import React , { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid from Material-UI
import axios from 'axios';


export default function Sub() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
      fetchData();
    }, []);

  const columns = [
    
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phoneNumber', headerName: 'Phoneno', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    
  ];

  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/users');
      setUsers(response.data.map((user, index) => ({ ...user, id: index + 1 })));
    } catch (err) {
      console.err('Error fetching data:', err);
    }
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={users} columns={columns} pageSize={5} />
    </div>
  );
}

