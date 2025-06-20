import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/customers')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Manage Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <p><strong>{user.name}</strong> ({user.email})</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
