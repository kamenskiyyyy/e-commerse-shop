import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import SickButton from '@components/styles/SickButton';
import { FormEventHandler, useState } from 'react';
import { StripeError } from '@stripe/stripe-js/types/stripe-js/stripe';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCart } from '@lib/cartState';
import { CURRENT_USER_QUERY } from '@components/User';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
  mutation ($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY!}`);

function CheckoutForm() {
  const [error, setError] = useState<StripeError | null>(null);
  const [Loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { closeCart } = useCart();
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    { refetchQueries: [{ query: CURRENT_USER_QUERY }] }
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error, paymentMethod } = await stripe?.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (error) {
      setLoading(false);
      return setError(error);
    }
    const order = await checkout({ variables: { token: paymentMethod?.id } });
    closeCart();
    await router.push({
      pathname: '/order/[id]',
      query: { id: order.data.checkout.id },
    });

    setLoading(false);
  };

  return (
    <CheckoutFormStyles aria-disabled={Loading} onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12, color: 'red' }}>{error.message}</p>}
      {graphQLError && (
        <p style={{ fontSize: 12, color: 'red' }}>{error?.message}</p>
      )}
      <CardElement />
      <SickButton disabled={Loading}>Check out now</SickButton>
    </CheckoutFormStyles>
  );
}

export function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}
