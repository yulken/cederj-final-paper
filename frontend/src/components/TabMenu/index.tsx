import React, { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container, LinkLists, UserInfo } from './styles';
import { useAuth } from '../../hooks/auth';
import { useCart } from '../../hooks/cart';

interface NOfElements {
  nOfItems?: number;
}
const TabMenu: React.FC<NOfElements> = ({ nOfItems }) => {
  const { user } = useAuth();
  const { cart } = useCart();
  const [nOfItemsOnCart, setNOfItemsOnCart] = useState<number>(
    cart.games.length,
  );

  useEffect(() => {
    setNOfItemsOnCart(nOfItems || cart.games.length);
  }, [cart, nOfItems]);
  return (
    <Container>
      <LinkLists>
        <Link to="/">Loja</Link>
        {user && <Link to="/library">Biblioteca</Link>}
        {user && <Link to="/redeem-code">Códigos</Link>}
        {user && <Link to="/history">Histórico</Link>}
      </LinkLists>
      <UserInfo>
        {user ? (
          <>
            <Link to="/profile">Perfil</Link>
            <Link to="/cart">
              <FiShoppingCart /> ({nOfItemsOnCart})
            </Link>
            <div>Créditos: {user.balance}</div>
          </>
        ) : (
          <Link to="/signin">Login</Link>
        )}
      </UserInfo>
    </Container>
  );
};

export default TabMenu;
