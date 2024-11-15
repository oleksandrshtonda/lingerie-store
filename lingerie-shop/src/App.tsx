import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';

import Footer from './components/Footer';  // Імпортуємо футер
// Виправлений шлях до Homepage та CatalogPage
import Homepage from './components/Homepage';
import CatalogPage from './components/CatalogPage'; // Доданий компонент CatalogPage

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* Головна сторінка */}
          <Route path="/" element={<Homepage />} />

          {/* Сторінки навігації */}
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />

          {/* Сторінка каталогу */}
          <Route path="/catalog" element={<CatalogPage />} /> {/* Додано маршрут для каталогу */}
          
          {/* Додаткові сторінки або категорії */}
          {/* Наприклад, сторінки категорій */}
          {/* <Route path="/category/:categoryName" element={<Category />} /> */}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
