import React from 'react';
import { useState, useContext } from 'react';
import SideDrawer from './components/SideDrawer';
import { CartContext } from './conText/CartContext';
import './barra.css';

function Barra() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { cartItems } = useContext(CartContext);

  return (
    <header className="navbar">
      <div className="navbar-brand">CONTRADA CORO</div>
      <nav className="navbar-nav">
        <a href="/prodotti">Prodotti</a>
        <a href="/contatti">Contatti</a>
      </nav>
      <div className="cart-icon" onClick={() => setDrawerOpen(true)}>
        <i className="fas fa-shopping-cart"></i>
        <span className="cart-count">{cartItems.length}</span>
      </div>
      <SideDrawer isOpen={isDrawerOpen} closeDrawer={() => setDrawerOpen(false)} />
    </header>
  );
}

export default Barra;