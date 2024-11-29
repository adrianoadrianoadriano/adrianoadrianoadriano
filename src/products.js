import React, { useState, useEffect } from 'react';
import ProductCard from './components/productcard';
import VariantProductCard from './components/variantproductcard';
import './products.css';

function Products() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Maglietta',
      price: 19.99,
      sizes: ['S', 'M', 'L', 'XL'],
      image: 'https://img.joomcdn.net/fe3087a473680d32dc9113c76d935541dbedf899_original.jpeg',
    },
    {
      id: 2,
      name: 'Felpa',
      price: 39.99,
      sizes: ['S', 'M', 'L', 'XL'],
      image: 'https://ae01.alicdn.com/kf/S3a4208764fc04215a0d2b49dc53d78e4C.jpg_640x640q90.jpg',
    },
    {
      id: 3,
      name: 'Cappellino',
      price: 14.99,
      sizes: ['S', 'M', 'L'],
      image: 'https://ae01.alicdn.com/kf/S9a9a674d9f7a4b5fa858f584ec259b9bC.jpg_640x640q90.jpg',
    },
    {
      id: 4,
      name: 'Fazzolettone',
      price: { Classico: 20.0, Seta: 40.0 },
      sizes: ['Classico', 'Seta'],
      image: 'https://www.ilcittadinoonline.it/wp-content/uploads/originali/1288094236093.jpg',
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
      <h1></h1>
      <div className="products-grid">
        {products.map((product) => {
          // Decidere quale componente utilizzare
          if (product.name === 'Fazzolettone') {
            // Usa il VariantProductCard per il Fazzolettone
            return <VariantProductCard key={product.id} product={product} />;
          }
          // Usa il ProductCard per gli altri prodotti
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}

export default Products;
