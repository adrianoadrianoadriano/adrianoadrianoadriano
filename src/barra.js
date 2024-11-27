import React, { useState, useContext } from 'react';
import SideDrawer from './components/SideDrawer';
import { CartContext } from './conText/CartContext';
import { SiEagle } from 'react-icons/si'; // Importa l'icona dell'aquila

import './barra.css';

function Barra() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { cartItems } = useContext(CartContext);

  // Calcolare il numero totale di articoli nel carrello, sommandone le quantità
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="navbar">
      <div className="navbar-brand">CONTRADA CORO</div>
      <nav className="navbar-nav">
        <a href="/prodotti">Prodotti</a>
        <a href="/contatti">Contatti</a>
      </nav>
      <div className="cart-icon" onClick={() => setDrawerOpen(true)}>
        {/* Sostituire l'icona del carrello con l'icona dell'aquila */}
        <SiEagle size={30} color="#fff" />
        <span className="cart-count">{totalItems}</span> {/* Mostra il totale degli articoli nel carrello */}
      </div>
      <SideDrawer isOpen={isDrawerOpen} closeDrawer={() => setDrawerOpen(false)} />
    </header>
  );
}

export default Barra;
