/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput, OrderCreateInput } from '../.keystone/schema-types';
import { graphql } from './index';
import scriptConfig from '../lib/stripe';

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
    payment_method: token,
  }).catch((error) => {
    throw new Error(error.message);
  });

  const orderItems = cartItems.map((cartItem) => {
    return {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.product.quantity,
      photo: {
        connect: { id: cartItem.product.photo.id },
      },
    };
  });
  const order = await context.lists.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: userId } },
    },
  });

  const cartItemIds = cartItems.map((cartItem) => cartItem.id);
  await context.lists.CartItem.deleteMany({ ids: cartItemIds });
  return order;
}

export default checkout;
