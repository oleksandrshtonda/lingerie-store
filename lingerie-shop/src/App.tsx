import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
// Виправлений шлях до Homepage
import Homepage from './components/Homepage';


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
          
          {/* Додаткові сторінки або категорії */}
          {/* Наприклад, сторінки категорій */}
          {/* <Route path="/category/:categoryName" element={<Category />} /> */}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
