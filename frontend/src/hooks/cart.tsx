import React, { createContext, useCallback, useState, useContext } from 'react';

export interface Game {
  id: string;
  price: number;
  name: string;
}
export interface Cart {
  games: Game[];
  total_price: number;
}

interface CartContextData {
  cart: Cart;
  addToCart(game: Game): void;
  removeFromCart(game: Game): void;
  startCart(): void;
  isOnCart(game: Game): boolean;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<Cart>(() => {
    const data = localStorage.getItem('@GameStore:cart');
    if (!data)
      return {
        games: [],
        total_price: 0,
      } as Cart;
    return JSON.parse(data) as Cart;
  });

  const addToCart = useCallback(
    (data: Game) => {
      const { id, price } = data;
      if (
        cart.games.length === 0 ||
        cart.games.every(({ id: _id }) => _id !== id)
      ) {
        cart.total_price += Number(price);
        cart.games.push(data);
        localStorage.setItem('@GameStore:cart', JSON.stringify(cart));
        setCart(cart);
      }
    },
    [cart],
  );

  const removeFromCart = useCallback(
    (data: Game) => {
      if (cart.games.find(({ id }) => id === data.id)) {
        cart.total_price -= data.price;
        cart.games = cart.games.filter(({ id }) => id !== data.id);
        localStorage.setItem('@GameStore:cart', JSON.stringify(cart));

        setCart(cart);
      }
    },
    [cart],
  );

  const startCart = useCallback(() => {
    const data = {
      total_price: 0,
      games: [],
    };
    localStorage.setItem('@GameStore:cart', JSON.stringify(data));

    setCart(data as Cart);
  }, []);

  const isOnCart = useCallback(
    (data: Game) => {
      return !!cart.games.find(({ id }) => id === data.id);
    },
    [cart.games],
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, startCart, isOnCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

function useCart(): CartContextData {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within an CartProvider');
  }

  return context;
}

export { CartProvider, useCart };
