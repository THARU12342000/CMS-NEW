import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const ViewAgreements = () => {
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    api.get('/agreements')
      .then(res => setAgreements(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>View All User Agreements</h2>
      <ul>
        {agreements.map(ag => (
          <li key={ag._id}>
            <p><strong>User:</strong> {ag.customer}</p>
            <p>{ag.content}</p>
            <p><strong>Date:</strong> {new Date(ag.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAgreements;
