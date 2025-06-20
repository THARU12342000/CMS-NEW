import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Manage Products</h2>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            <p><strong>{p.name}</strong> - LKR {p.price}</p>
            <p>{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;
