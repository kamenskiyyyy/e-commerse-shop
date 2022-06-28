import Link from 'next/link';
import NavStyles from '@components/styles/NavStyles';
import { useUser } from '@components/User';
import { SignOut } from '@components/SignOut';
import { useCart } from '@lib/cartState';
import CartCount from '@components/CartCount';

export const Nav = () => {
  const user = useUser();
  const { openCart } = useCart();

  return (
    <NavStyles>
      <Link href='/products'>Products</Link>
      {user ? (
        <>
          <Link href='/sell'>Sell</Link>
          <Link href='/orders'>Orders</Link>
          <Link href='/account'>Account</Link>
          <SignOut />
          <button type='button' onClick={openCart}>
            My Cart
            <CartCount
              count={user.cart.reduce(
                (tally, cartItem) => tally + cartItem.quantity,
                0
              )}
            />
          </button>
        </>
      ) : (
        <Link href='/signin'>Sign In</Link>
      )}
    </NavStyles>
  );
};
