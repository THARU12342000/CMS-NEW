import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const AgreementList = () => {
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    api.get('/agreements')
      .then(res => setAgreements(res.data))
      .catch(err => console.error('Error fetching agreements:', err));
  }, []);

  return (
    <div>
      <h2>User Agreements</h2>
      {agreements.length === 0 ? (
        <p>No consents found.</p>
      ) : (
        <ul>
          {agreements.map(agreement => (
            <li key={agreement._id}>
              <p>{agreement.content}</p>
              <p><strong>Date:</strong> {new Date(agreement.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AgreementList;
