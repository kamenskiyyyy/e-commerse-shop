/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput, OrderCreateInput } from '../.keystone/schema-types';
import { graphql } from './index';
import scriptConfig from '@lib/stripe';

interface Arguments {
  token: string;
}


async function checkout(
  root: any,
  { token }: Arguments,
  context: KeystoneContext,
): Promise<OrderCreateInput> {
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error('Sorry! You must be signed in to create an order!');
  }

  const user = await context.lists.User.findOne({
    where: { id: userId }, resolveFields: graphql`
          id
          name
          email
          cart {
          id
          quantity
          product {
          name price description id photo {
          id
          image {
          id
          publicUrlTransformed
          }
          }
          }
          }
    `,
  });

  const cartItems = user.cart.filter(cartItem => cartItem.product);
  const amount = cartItems.reduce((tally: number, cartItem: CartItemCreateInput) => {
    return tally + cartItem.quantity! * cartItem.product!.price;
  }, 0);

  const charge = await scriptConfig.paymentIntents.create({
    amount,
    currency: 'USD',
    confirm: true,
    payment_method: token
  }).catch((error) => {
    throw new Error(error.message)
  }).then()
}

export default checkout;
