import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const ViewAuditLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get('/audit')
      .then(res => setLogs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Audit Logs</h2>
      <ul>
        {logs.map(log => (
          <li key={log._id}>
            <p><strong>Action:</strong> {log.action}</p>
            <p><strong>User:</strong> {log.user}</p>
            <p><strong>Time:</strong> {new Date(log.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAuditLogs;
