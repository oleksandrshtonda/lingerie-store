import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Глобальний Header
import Footer from './components/Footer'; // Глобальний Footer
import Homepage from './pages/Homepage'; // Головна сторінка
import CatalogPage from './pages/CatalogPage'; // Сторінка каталогу
import Search from './pages/Search'; // Пошук
import Profile from './pages/Profile'; // Профіль користувача
import Cart from './pages/Cart'; // Кошик
import Favorites from './pages/Favorites'; // Вибране
import CheckoutPage from './pages/CheckoutPage'; // Сторінка оформлення замовлення
import SignIn from './pages/SignIn'; // Авторизація
import SignUp from './pages/SignUp'; // Реєстрація
import NotFound from './pages/NotFound'; // Сторінка 404
import { FavoritesProvider } from './store/FavoritesContext'; // Провайдер для контексту вибраного
import { CartProvider } from './store/CartContext'; // Провайдер для контексту кошика

const App = () => {
  // Логування змінних середовища (пам'ятайте: не виводьте конфіденційну інформацію у продакшн!)
  if (process.env.NODE_ENV === 'development') {
    console.log('API URL:', process.env.REACT_APP_API_URL);
    console.log('API USER:', process.env.REACT_APP_API_USER);
    console.log('API PASS:', process.env.REACT_APP_API_PASS);
  }

  return (
    <FavoritesProvider> {/* Контекст для управління обраними товарами */}
      <CartProvider> {/* Контекст для управління кошиком */}
        <Router>
          <Header /> {/* Глобальна шапка сайту */}
          <main>
            <Routes>
              {/* Маршрути сторінок */}
              <Route path="/" element={<Homepage />} /> {/* Головна сторінка */}
              <Route path="/sign-in" element={<SignIn />} /> {/* Авторизація */}
              <Route path="/sign-up" element={<SignUp />} /> {/* Реєстрація */}
              <Route path="/search" element={<Search />} /> {/* Пошук */}
              <Route path="/profile" element={<Profile />} /> {/* Профіль */}
              <Route path="/favorites" element={<Favorites />} /> {/* Вибране */}
              <Route path="/cart" element={<Cart />} /> {/* Кошик */}
              <Route path="/catalog" element={<CatalogPage />} /> {/* Каталог */}
              <Route path="/checkout" element={<CheckoutPage />} /> {/* Оформлення замовлення */}
              <Route path="*" element={<NotFound />} /> {/* 404 Сторінка не знайдена */}
            </Routes>
          </main>
          <Footer /> {/* Глобальний футер */}
        </Router>
      </CartProvider>
    </FavoritesProvider>
  );
};

export default App;
