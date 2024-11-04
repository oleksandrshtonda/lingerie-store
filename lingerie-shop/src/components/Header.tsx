import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Оголошення типу для категорій
interface Category {
  id: number;
  name: string;
}

const Header = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Отримання категорій через API
    axios.get('http://127.0.0.1:8080/api/v1/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories', error));
  }, []);

  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Логотип та кнопка меню */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img src="/images/LOGO.png" alt="Lingerie Logo" className="h-10" />
          </Link>
          {/* Кнопка меню ближче до логотипу */}
          <button className="flex items-center space-x-2 focus:outline-none">
            <img src="/images/components-icon.png" alt="Menu Icon" className="h-6 w-6" />
            <span className="text-white uppercase">Menu</span>
          </button>
        </div>

        {/* Іконки для пошуку, профілю, улюблених і кошика з навігацією */}
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

      {/* Навігація по категоріях */}
      <nav className="bg-gray-100 py-2">
        <ul className="flex justify-center space-x-6">
          {categories.map(category => (
            <li key={category.id}>
              <Link to={`/category/${category.name.toLowerCase()}`} className="text-black hover:text-gray-600">
                {category.name.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
