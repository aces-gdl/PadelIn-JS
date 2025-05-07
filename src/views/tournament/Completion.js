import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function Completion(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const PaymentIntent = searchParams.get('payment_intent');
  const PaymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
  const redirect_status = searchParams.get('redirect_status');

  return (
    <>
      <h1>Gracias por tu pago 🎉</h1>
      <p>El estado de tu pago es: {redirect_status}</p>
      <p>Intento de pago: {PaymentIntent}</p>
      <p>Secreto del intento de pago: {PaymentIntentClientSecret}</p>
      <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/views/tournament")}
            >Continuar</Button>
    </>
  )
}

export default Completion;
