import React, { useState, useContext } from 'react';
import { CartContext } from '../conText/CartContext';
import './productcard.css';

function ProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useContext(CartContext);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize);
      alert(`Aggiunto al carrello: ${product.name}, Taglia: ${selectedSize}`);
    } else {
      alert('Per favore seleziona una taglia.');
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>Prezzo: €{product.price}</p>
      
      <label>
        Taglia:
        <select value={selectedSize} onChange={handleSizeChange}>
          <option value="">Seleziona una taglia</option>
          {product.sizes.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </label>

      <button onClick={handleAddToCart}>Aggiungi al Carrello</button>
    </div>
  );
}

export default ProductCard;
