import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '.checkoutfrom';

// Carica la chiave pubblica di Stripe
const stripePromise = loadStripe('YOUR_PUBLIC_STRIPE_KEY');

function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <div className="checkout-container">
        <h2>Pagamento</h2>
        <CheckoutForm />
      </div>
    </Elements>
  );
}

export default Checkout;