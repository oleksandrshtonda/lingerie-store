import React from 'react'; // Імпортуємо React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Імпортуємо Header
import Footer from './components/Footer'; // Імпортуємо Footer
import Search from './pages/Search'; // Сторінка "Search"
import Profile from './pages/Profile'; // Сторінка "Profile"
import Cart from './pages/Cart'; // Сторінка "Cart"
import Favorites from './pages/Favorites'; // Сторінка "Favorites"
import { FavoritesProvider } from './store/FavoritesContext'; // Контекст для Favorites
import Homepage from './components/Homepage'; // Сторінка "Homepage"
import CatalogPage from './components/CatalogPage'; // Сторінка "CatalogPage"
import SignIn from './pages/SignIn'; // Імпортуємо сторінку "SignIn"
import SignUp from './pages/SignUp'; // Імпортуємо сторінку "SignUp"

const App = () => {
  return (
    <FavoritesProvider> {/* Обгортка для FavoritesProvider */}
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
          </Routes>
        </main>
        <Footer /> {/* Додаємо футер у нижній частині */}
      </Router>
    </FavoritesProvider>
  );
};

export default App;
