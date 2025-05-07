/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import {  Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from './CheckoutForm';
import axios from 'axios';

const StripePayment = (props) => {

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");


    useEffect(() => {

        const getSecret = async () => {
            try {
                const response = await axios.get('/v1/stripe/config')
                let secret = response.data.secret;
                setStripePromise(loadStripe(secret));

            } catch (error) {
                console.log('Error getting secret')
                alert.error('Error al cargar stripe...')
            }
        };
        getSecret();
    }, []);

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const payload = {
                    TournamentID : props.tournamentid,
                    CategoryID : props.categoryid,
                  };
                const response = await axios.post('/v1/stripe/create-payment-intent', payload);
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.log('Error while creating payment intent...')
            }
        }
        createPaymentIntent();
    },[]);


    return (
        <div>
            <h1>React Stripe and the Payment Element</h1>
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
        </div >
    )
}

export default StripePayment