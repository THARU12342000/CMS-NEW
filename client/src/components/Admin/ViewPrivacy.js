import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const ViewPrivacy = () => {
  const [prefs, setPrefs] = useState([]);

  useEffect(() => {
    api.get('/privacy')
      .then(res => setPrefs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Privacy Preferences</h2>
      <ul>
        {prefs.map(p => (
          <li key={p._id}>
            <p><strong>User:</strong> {p.customer}</p>
            <p>Allow Location: {p.allowLocation ? 'Yes' : 'No'}</p>
            <p>Partners: {p.shareWithPartners ? 'Yes' : 'No'}</p>
            <p>Marketing Emails: {p.marketingEmails ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewPrivacy;
