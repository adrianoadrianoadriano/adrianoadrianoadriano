import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../conText/CartContext';
import { useAuth } from '../conText/AuthContext'; // Contesto di autenticazione
import './SideDrawer.css';

function SideDrawer({ isOpen, closeDrawer }) {
  const navigate = useNavigate();
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);
  const { isAuthenticated, login, register } = useAuth();
  
  // Stato per il popup
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false); // Stato per la modalità di registrazione
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Funzione per cambiare i valori nel form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Funzione per il login/registrazione
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isRegisterMode) {
      // Registrazione
      register(formState.name, formState.email, formState.password);
    } else {
      // Login
      login(formState.email, formState.password);
    }
    setIsLoginVisible(false); // Chiudi il popup dopo il login/registrazione
  };

  // Funzione per mostrare il form di registrazione
  const showRegisterForm = () => {
    setIsRegisterMode(true);
  };

  // Funzione per mostrare il form di login
  const showLoginForm = () => {
    setIsRegisterMode(false);
  };

  // Funzione per gestire il checkout
  const handleCheckout = () => {
    closeDrawer();
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      setIsLoginVisible(true); // Mostra il popup di login
    }
  };

  // Calcolo del totale del carrello
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`side-drawer ${isOpen ? 'open' : ''}`}>
      <button onClick={closeDrawer} className="close-btn">X</button>

      {/* Sezione di Login (o pulsante di login) */}
      <div className="login-section">
        {!isAuthenticated ? (
          <div>
            <h3>Effettua il login per procedere</h3>
            <button onClick={() => setIsLoginVisible(true)} className="login-btn">Accedi</button>
          </div>
        ) : (
          <div>
            <h3>Benvenuto, utente autenticato!</h3>
            <button onClick={handleCheckout} className="checkout-btn">Procedi con l'acquisto</button>
          </div>
        )}
      </div>
      
      {/* Sezione del Carrello */}
      <div className="cart-section">
        <button onClick={handleCheckout} className="cart-toggle-btn">
          {cartItems.length === 0 ? "Carrello vuoto" : `Mostra Carrello (${cartItems.length})`}
        </button>
        {cartItems.length > 0 && (
          <div className="cart-details">
            {cartItems.map((item, index) => (
              <div key={index} className="drawer-cart-item">
                <img src={item.image} alt={item.name} className="drawer-item-image" />
                <div className="drawer-item-details">
                  <p>{item.name} - Taglia: {item.size}</p>
                  <p>Prezzo: €{item.price}</p>
                  <div className="drawer-item-controls">
                    <button onClick={() => decreaseQuantity(item.id, item.size)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id, item.size)}>+</button>
                    <button onClick={() => removeFromCart(item.id, item.size)}>Rimuovi</button>
                  </div>
                </div>
              </div>
            ))}
            <h3>Totale: €{total.toFixed(2)}</h3>
          </div>
        )}
      </div>

      {/* Popup di Login/Registrazione */}
      {isLoginVisible && (
        <div className="login-popup">
          <div className="login-popup-container">
            <button className="close-popup-btn" onClick={() => setIsLoginVisible(false)}>X</button>
            {!isRegisterMode ? (
              <>
                <h3>Accedi</h3>
                <form onSubmit={handleFormSubmit}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formState.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button type="submit">Accedi</button>
                </form>
                <button onClick={showRegisterForm} className="switch-to-register-btn">Non hai un account? Registrati</button>
                <button onClick={() => console.log("Login con Google")} className="google-login-btn">Accedi con Google</button>
              </>
            ) : (
              <>
                <h3>Registrati</h3>
                <form onSubmit={handleFormSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formState.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button type="submit">Registrati</button>
                </form>
                <button onClick={showLoginForm} className="switch-to-login-btn">Hai già un account? Accedi</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SideDrawer;
