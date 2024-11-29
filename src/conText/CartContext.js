import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, variant, variantType) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.variant === variant
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item === existingItem
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, variant, variantType, quantity: 1 }];
      }
    });
  };

  // Funzione per aumentare la quantità
  const increaseQuantity = (productId, variant) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.variant === variant
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Funzione per diminuire la quantità
  const decreaseQuantity = (productId, variant) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId && item.variant === variant
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // Rimuove l'elemento se la quantità è zero
    );
  };

  const removeFromCart = (productId, variant) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId || item.variant !== variant)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Salva il carrello in localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Recupera il carrello da localStorage
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
