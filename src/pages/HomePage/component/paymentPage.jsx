// src/pages/Payment/PaymentPage.jsx
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './checkOutFrom';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_payment_key);


const PaymentPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Complete Your Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default PaymentPage;
