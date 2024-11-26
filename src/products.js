import React, { useState, useEffect } from 'react';
import ProductCard from './components/productcard';
import './products.css';

function Products() {
  // Stato per i prodotti, inizializzato con i dati hardcoded
  const [products, setProducts] = useState([
    { id: 1, name: 'Maglietta', price: 19.99, sizes: ['S', 'M', 'L', 'XL'], image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Felpa', price: 39.99, sizes: ['S', 'M', 'L', 'XL'], image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Cappellino', price: 14.99, sizes: ['S', 'M', 'L'], image: 'https://via.placeholder.com/150' },
  ]);

  // Effettua la richiesta al backend per ottenere i prodotti
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Errore nel recupero dei prodotti');
        }
        return response.json();
      })
      .then((data) => {
        // Aggiorna i prodotti solo se la fetch ha successo
        if (data && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((error) => console.error('Errore nella fetch:', error));
  }, []); // L'array vuoto fa sì che la fetch avvenga solo una volta al caricamento del componente

  return (
    <div className="products-page">
      <h1>Prodotti</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
