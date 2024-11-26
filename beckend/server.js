const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Variabili temporanee per carrello e ordini
let cart = [];
let orders = [];

// Endpoint per ottenere gli articoli nel carrello
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

// Endpoint per aggiungere o aggiornare un articolo nel carrello
app.post('/api/cart', [
  body('id').isInt(),
  body('name').isString(),
  body('price').isFloat({ gt: 0 }),
  body('size').isString(),
  body('quantity').isInt({ gt: 0 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, name, price, size, quantity } = req.body;
  const existingItem = cart.find(item => item.id === id && item.size === size);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id, name, price, size, quantity });
  }

  res.json(cart);
});

// Endpoint per rimuovere un articolo specifico dal carrello
app.delete('/api/cart/:id', (req, res) => {
  const { id } = req.params;
  cart = cart.filter(item => item.id !== parseInt(id));
  res.json(cart);
});

// Endpoint per svuotare il carrello
app.delete('/api/cart', (req, res) => {
  cart = [];
  res.json({ message: 'Carrello svuotato' });
});

// Endpoint per inviare un ordine
app.post('/api/orders', (req, res) => {
  const order = { id: orders.length + 1, items: [...cart] };
  orders.push(order);
  cart = []; // Svuota il carrello dopo l'ordine
  res.status(201).json(order);
});

// Endpoint per ottenere una lista degli ordini
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Middleware per la gestione degli errori
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Errore del server');
});

// Avvio del server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});
