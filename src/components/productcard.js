import React, { useState, useContext } from 'react';
import { CartContext } from '../conText/CartContext';
import './productcard.css';

function ProductCard({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(''); // Stato per la variante selezionata
  const { addToCart } = useContext(CartContext);

  // Gestisce il cambio di variante
  const handleVariantChange = (event) => {
    setSelectedVariant(event.target.value);
  };

  // Aggiunge il prodotto al carrello
  const handleAddToCart = () => {
    if (selectedVariant) {
      const price = product.price[selectedVariant] || product.price; // Supporto per prezzi statici e varianti
      addToCart({ ...product, selectedVariant, price });
      alert(`Aggiunto al carrello: ${product.name}, Variante: ${selectedVariant}`);
    } else {
      alert('Per favore seleziona una variante.');
    }
  };

  // Determina il testo del menu a tendina in base al prodotto
  const dropdownLabel = product.name === 'Fazzolettone' ? 'Seleziona un tipo' : 'Seleziona una taglia';

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>
        Prezzo:{' '} 
        {selectedVariant
          ? `€${(product.price[selectedVariant] || product.price).toFixed(2)}`
          : product.price}
      </p>

      {product.sizes && (
        <label>
                {product.name === 'Fazzolettone' ? (<span>Tipo:&nbsp;&nbsp;&nbsp;</span>) : 'Taglia:'}
          <select value={selectedVariant} onChange={handleVariantChange}>
            <option value="" disabled>
              {dropdownLabel}
            </option>
            {product.sizes.map((variant) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </select>
        </label>
      )}

      <button onClick={handleAddToCart}>Aggiungi al Carrello</button>
    </div>
  );
}

export default ProductCard;
