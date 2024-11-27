import React, { useState, useEffect } from 'react';
import ProductCard from './components/productcard';
import './products.css';

function Products() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Maglietta',
      price: 19.99 ,
      sizes: ['S', 'M', 'L', 'XL'],
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Felpa',
      price: 39.99,
      sizes: ['S', 'M', 'L', 'XL'],
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Cappellino',
      price: 14.99,
      sizes: ['S', 'M', 'L'],
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      name: 'Fazzolettone',
      price: { Classico: 20.00, Seta: 40.00 },
      sizes: ['Classico', 'Seta'],
      image: 'https://via.placeholder.com/150',
    },
  ]);

  // Fetching products from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Errore nel recupero dei prodotti');
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((error) => console.error('Errore nella fetch:', error));
  }, []);

  return (
    <div className="products-page">
      <h1>Prodotti</h1>
      <div className="products-grid">
        {products.map((product) => {
          // Check if the price is an object
          const price = typeof product.price === 'object' ? product.price.Classico : product.price;
          
          return (
            <ProductCard 
              key={product.id} 
              product={{...product, price}} // pass the selected price to the ProductCard
            />
          );
        })}
      </div>
    </div>
  );
}

export default Products;
