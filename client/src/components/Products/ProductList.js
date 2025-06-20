import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <div>
      <h2>Available Packages</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product._id}>
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p><strong>Price:</strong> LKR {product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
