import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Category, initialCategories } from '../models/category';
import { BASE_URL } from '../config'; // Імпортуйте базовий URL
import '../styles.scss'; // Імпорт SCSS файлу

const Header = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/categories`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories', error));
  }, []);

  return (
    <header className="header">
      <div className="container mx-auto flex justify-between items-center">
        {/* Логотип та кнопка меню */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img src="/images/LOGO.png" alt="Lingerie Logo" className="h-10" />
          </Link>
          <button className="menu-button">
            <img src="/images/components-icon.png" alt="Menu Icon" className="h-6 w-6" />
            <span className="menu-text">Menu</span>
          </button>
        </div>

        {/* Іконки для пошуку, профілю, улюблених і кошика */}
        <div className="flex space-x-4">
          <Link to="/search" title="Search">
            <img src="/images/search-icon.png" alt="Search Icon" className="h-6" />
          </Link>
          <Link to="/profile" title="User Profile">
            <img src="/images/user-icon.png" alt="User Icon" className="h-6" />
          </Link>
          <Link to="/favorites" title="Favorites">
            <img src="/images/favorite-icon.png" alt="Favorite Icon" className="h-6" />
          </Link>
          <Link to="/cart" title="Cart">
            <img src="/images/cart-icon.png" alt="Cart Icon" className="h-6" />
          </Link>
        </div>
      </div>

      {/* Секція категорій під основним меню */}
      <div className="categories-section">
        {categories.map((category, index) => (
          <button key={index} className="category-button">
            {category.name}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
