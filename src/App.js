import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Barra from './barra';
import Products from './products';
import Contacts from './contact';
import Login from './components/Login';
import Register from './Register';
import { CartProvider } from './conText/CartContext';
import { AuthProvider } from './conText/AuthContext'; // Importa AuthProvider

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <div className="App-header">
              <Barra />
            </div>
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/prodotti" element={<Products />} />
              <Route path="/contatti" element={<Contacts />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
