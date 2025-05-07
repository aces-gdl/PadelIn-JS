import { PaymentElement } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { Button } from "@mui/material";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    // Fetch the amount from your server
    const getAmount = async () => {
      try {
        const response = await axios.get("/v1/stripe/get-payment-amount");
        setAmount(response.data.amount);
      } catch (error) {
        console.log('Error getting amount')
      }
    }
    getAmount();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/views/stripecompletion`,
      },
    });

    if (response.error.type === "card_error" || response.error.type === "validation_error") {
      setMessage(response.error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement
        id="payment-element"
        options={{
          defaultValues: {
            billingDetails: {
              name: 'Juan Navarro 2',

            }
          },
          fields: {
            billingDetails: {
              name: 'auto',

            }
          },
        }}
      />
      <Button variant='contained' disabled={isProcessing || !stripe || !elements} id="submit" type='submit'>
        <span id="button-text">
          {isProcessing ? "Processing ... " : `Pay ${amount / 100}`}
        </span>
      </Button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
