import { createContext, FC, useContext, useState } from 'react';

const LocalStateContext = createContext({
  cartOpen: false,
});
const LocalStateProvider = LocalStateContext.Provider;

const CartStateProvider: FC = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  return (
    // @ts-ignore
    <LocalStateProvider value={{ cartOpen, toggleCart, closeCart, openCart }}>
      {children}
    </LocalStateProvider>
  );
};

function useCart() {
  return useContext(LocalStateContext);
}

export { CartStateProvider, useCart };
