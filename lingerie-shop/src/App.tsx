import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Імпортуємо Header
import Footer from './components/Footer'; // Імпортуємо Footer
import Search from './pages/Search'; // Сторінка "Search"
import Profile from './pages/Profile'; // Сторінка "Profile"
import Cart from './pages/Cart'; // Сторінка "Cart"
import Favorites from './pages/Favorites'; // Сторінка "Favorites"
import { FavoritesProvider } from './store/FavoritesContext'; // Контекст для Favorites
import { CartProvider } from './store/CartContext'; // Контекст для Cart
import Homepage from './components/Homepage'; // Сторінка "Homepage"
import CatalogPage from './components/CatalogPage'; // Сторінка "CatalogPage"
import CheckoutPage from './pages/CheckoutPage'; // Сторінка "CheckoutPage"
import SignIn from './pages/SignIn'; // Імпортуємо сторінку "SignIn"
import SignUp from './pages/SignUp'; // Імпортуємо сторінку "SignUp"

const App = () => {
  return (
    <FavoritesProvider> {/* Обгортка для FavoritesProvider */}
      <CartProvider> {/* Обгортка для CartProvider */}
        <Router>
          <Header />
          <main>
            <Routes>
              {/* Головна сторінка */}
              <Route path="/" element={<Homepage />} />
              {/* Сторінки навігації */}
              <Route path="/sign-in" element={<SignIn />} /> {/* Додано маршрут для SignIn */}
              <Route path="/sign-up" element={<SignUp />} /> {/* Додано маршрут для SignUp */}
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/cart" element={<Cart />} />
              {/* Сторінка каталогу */}
              <Route path="/catalog" element={<CatalogPage />} />
              {/* Сторінка оформлення замовлення */}
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </main>
          <Footer /> {/* Додаємо футер у нижній частині */}
        </Router>
      </CartProvider>
    </FavoritesProvider>
  );
};
console.log('API URL:', process.env.REACT_APP_API_URL);
console.log('API USER:', process.env.REACT_APP_API_USER);
console.log('API PASS:', process.env.REACT_APP_API_PASS);


export default App;
