import React, { useState } from 'react';
import api from '../../api/api';

const PrivacySettings = () => {
  const [prefs, setPrefs] = useState({
    allowLocation: false,
    shareWithPartners: false,
    marketingEmails: false,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setPrefs({ ...prefs, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/privacy', prefs);
      setMessage('Privacy settings updated.');
    } catch (err) {
      setMessage('Failed to update privacy settings.');
    }
  };

  return (
    <div>
      <h2>Privacy Preferences</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          <input type="checkbox" name="allowLocation" checked={prefs.allowLocation} onChange={handleChange} />
          Allow location tracking
        </label><br/>
        <label>
          <input type="checkbox" name="shareWithPartners" checked={prefs.shareWithPartners} onChange={handleChange} />
          Share data with partners
        </label><br/>
        <label>
          <input type="checkbox" name="marketingEmails" checked={prefs.marketingEmails} onChange={handleChange} />
          Receive marketing emails
        </label><br/>
        <button type="submit">Save Preferences</button>
      </form>
    </div>
  );
};

export default PrivacySettings;
