import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const PrivacyList = () => {
  const [prefs, setPrefs] = useState([]);

  useEffect(() => {
    api.get('/privacy')
      .then(res => setPrefs(res.data))
      .catch(err => console.error('Error fetching privacy prefs:', err));
  }, []);

  return (
    <div>
      <h2>All User Privacy Preferences</h2>
      {prefs.length === 0 ? (
        <p>No preferences found.</p>
      ) : (
        <ul>
          {prefs.map((p, index) => (
            <li key={index}>
              <p><strong>User ID:</strong> {p.customer}</p>
              <p>Allow Location: {p.allowLocation ? 'Yes' : 'No'}</p>
              <p>Share With Partners: {p.shareWithPartners ? 'Yes' : 'No'}</p>
              <p>Marketing Emails: {p.marketingEmails ? 'Yes' : 'No'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PrivacyList;
