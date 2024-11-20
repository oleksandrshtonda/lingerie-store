import React from 'react';
import { useCart } from '../store/CartContext'; // Імпорт контексту для кошика
import './CartIcon.scss'; // Імпорт стилів для іконки

const CartIcon: React.FC = () => {
  const { cart } = useCart(); // Отримуємо кількість товарів у кошику

  return (
    <div className="cart-icon">
      <img src="/images/cart-icon.png" alt="Cart" />
      {cart.length > 0 && <span className="badge">{cart.length}</span>}
    </div>
  );
};

export default CartIcon;
