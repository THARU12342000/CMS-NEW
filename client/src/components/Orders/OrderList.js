import React, { useState, useEffect } from 'react';
import api from '../../api/api';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error('Error fetching orders:', err));
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order._id}>
              <p><strong>Product:</strong> {order.product?.name || 'N/A'}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Ordered At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
