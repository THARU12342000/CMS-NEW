import React, { useState } from 'react';
import api from '../../api/api';

const ConsentForm = () => {
  const [consentText, setConsentText] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/agreements', { content: consentText });
      setMessage('Consent submitted successfully.');
      setConsentText('');
    } catch (err) {
      setMessage('Failed to submit consent.');
    }
  };

  return (
    <div>
      <h2>Consent Form</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={consentText}
          onChange={(e) => setConsentText(e.target.value)}
          placeholder="Enter your consent here"
          required
        />
        <button type="submit">Submit Consent</button>
      </form>
    </div>
  );
};

export default ConsentForm;
