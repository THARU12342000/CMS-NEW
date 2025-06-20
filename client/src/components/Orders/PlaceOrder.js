import React, { useState, useEffect } from 'react';
import api from '../../api/api';

const PlaceOrder = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      await api.post('/orders', { productId: selectedProduct });
      setMessage('Order placed successfully!');
    } catch (err) {
      setMessage('Order failed.');
    }
  };

  return (
    <div>
      <h2>Place Order</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setSelectedProduct(e.target.value)} required>
          <option value="">Select a product</option>
          {products.map(p => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>
        <button type="submit">Order</button>
      </form>
    </div>
  );
};

export default PlaceOrder;
