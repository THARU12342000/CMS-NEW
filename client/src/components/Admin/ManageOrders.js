import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Manage Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <p><strong>User:</strong> {order.customer}</p>
            <p><strong>Product:</strong> {order.product?.name}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageOrders;
