import React, { useState, useContext } from 'react';
import { CartContext } from '../conText/CartContext';
import './productcard.css';

function VariantProductCard({ product }) {
  const [selectedVariant, setSelectedVariant] = useState('');
  const { addToCart } = useContext(CartContext);

  const handleVariantChange = (event) => {
    setSelectedVariant(event.target.value);
  };

  const handleAddToCart = () => {
    if (selectedVariant) {
      const price = product.price[selectedVariant];
      addToCart({ ...product, price }, selectedVariant, 'Tipo');
      alert(`Aggiunto al carrello: ${product.name}, Tipo: ${selectedVariant}`);
    } else {
      alert('Per favore seleziona un tipo.');
    }
  };

  // Mostra il prezzo o un placeholder coerente
  const currentPrice = selectedVariant
    ? `€ ${product.price[selectedVariant].toFixed(2)}`
    : '€ --,--';

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image"  />
      <h3>{product.name}: </h3>
      <p style={{ height: '20px', lineHeight: '20px' }}>{currentPrice}</p> {/* Altezza fissa per il prezzo */}
      <label>
      <span>Tipo:&nbsp;&nbsp;&nbsp;</span>
        <select value={selectedVariant} onChange={handleVariantChange}>
          <option value="" disabled>
            Seleziona un tipo
          </option>
          {product.sizes.map((variant) => (
            <option key={variant} value={variant}>
              {variant}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleAddToCart}>Aggiungi al Carrello</button>
    </div>
  );
}

export default VariantProductCard;
