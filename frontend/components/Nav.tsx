import Link from 'next/link';
import NavStyles from '@components/styles/NavStyles';
import { useUser } from '@components/User';

export const Nav = () => {
  const user = useUser();
  return (
    <NavStyles>
      <Link href={'/products'}>Products</Link>
      {user ? (
        <>
          <Link href={'/sell'}>Sell</Link>
          <Link href={'/orders'}>Orders</Link>
          <Link href={'/account'}>Account</Link>
        </>
      ) : (
        <>
          <Link href={'/signin'}>Sign In</Link>
        </>
      )}
    </NavStyles>
  );
};
