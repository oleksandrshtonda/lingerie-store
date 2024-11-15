// Favorites.tsx
import React from 'react';
import Footer from '../components/Footer'; // Імпортуємо футер

const Favorites: React.FC = () => {
  return (
    <div className="favorites-page">
      <h1>Favorites</h1>
      <p>Your favorite products will appear here.</p>
      
      {/* Тут можна додати список улюблених продуктів */}
      
      <Footer /> {/* Додаємо футер */}
    </div>
  );
};

export default Favorites;
