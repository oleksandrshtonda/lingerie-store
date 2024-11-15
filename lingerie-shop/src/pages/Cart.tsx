// Cart.tsx
import React from 'react';
import Footer from '../components/Footer'; // Імпортуємо футер

const Cart: React.FC = () => {
  return (
    <div className="cart-page">
      <h1>Cart</h1>
      <p>These are the items in your cart.</p>
      
      {/* Тут можна додати список товарів у кошику та функції для їх оновлення */}
      
      <Footer /> {/* Додаємо футер */}
    </div>
  );
};

export default Cart;
