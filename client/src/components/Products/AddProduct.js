import React, { useState } from 'react';
import api from '../../api/api';

const AddProduct = () => {
  const [form, setForm] = useState({ name: '', description: '', price: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', form);
      setMessage('Product added successfully');
      setForm({ name: '', description: '', price: '' });
    } catch (err) {
      setMessage('Failed to add product');
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} value={form.name} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} value={form.description} required />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} value={form.price} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
