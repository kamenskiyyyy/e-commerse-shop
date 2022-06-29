import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import SickButton from '@components/styles/SickButton';
import { FormEventHandler } from 'react';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripeLib = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY!}`);

export function Checkout() {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <Elements stripe={stripeLib}>
      <CheckoutFormStyles onSubmit={handleSubmit}>
        <p>hey</p>
        <CardElement />
        <SickButton>Check out now</SickButton>
      </CheckoutFormStyles>
    </Elements>
  );
}
