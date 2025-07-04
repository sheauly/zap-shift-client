import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PayMentFrom from './payMentFrom';


const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);


const PayMent = () => {
    return (
        <Elements stripe={stripePromise}>
            <PayMentFrom></PayMentFrom>
        </Elements>
    );
};

export default PayMent;