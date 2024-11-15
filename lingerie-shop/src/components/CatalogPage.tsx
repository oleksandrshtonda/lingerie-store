// CatalogPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CatalogPage.scss';
import { BASE_URL } from '../config';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  available: boolean;
  brand: string;
  color: string;
  rating: number;
}

const CatalogPage: React.FC = () => {
  // Стан для продуктів та фільтрів
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    brand: '',
    color: '',
    size: '',
    priceRange: [0, 500],
  });

  // Завантаження продуктів при завантаженні сторінки
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/products`)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products', error));
  }, []);

  // Обробка зміни фільтрів
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedFilters({ ...selectedFilters, [name]: value });
  };

  return (
    <div className="catalog-page">
      {/* Бокова панель з фільтрами */}
      <aside className="filters">
        <h3>Filters</h3>
        <div className="filter-section">
          <h4>Brand</h4>
          <label>
            <input type="checkbox" name="brand" value="Victoria's Secret" onChange={handleFilterChange} />
            Victoria's Secret
          </label>
          <label>
            <input type="checkbox" name="brand" value="Calvin Klein" onChange={handleFilterChange} />
            Calvin Klein
          </label>
          {/* Додаткові бренди за потреби */}
        </div>
        <div className="filter-section">
          <h4>Color</h4>
          <label>
            <input type="checkbox" name="color" value="Black" onChange={handleFilterChange} />
            Black
          </label>
          <label>
            <input type="checkbox" name="color" value="White" onChange={handleFilterChange} />
            White
          </label>
          {/* Додаткові кольори за потреби */}
        </div>
        <div className="filter-section">
          <h4>Size</h4>
          <label>
            <input type="checkbox" name="size" value="S" onChange={handleFilterChange} />
            S
          </label>
          <label>
            <input type="checkbox" name="size" value="M" onChange={handleFilterChange} />
            M
          </label>
          {/* Додаткові розміри за потреби */}
        </div>
        <div className="filter-section">
          <h4>Price</h4>
          <input
            type="range"
            name="priceRange"
            min="0"
            max="500"
            value={selectedFilters.priceRange[1]}
            onChange={(e) =>
              setSelectedFilters({
                ...selectedFilters,
                priceRange: [0, Number(e.target.value)],
              })
            }
          />
          <span>${selectedFilters.priceRange[1]}</span>
        </div>
      </aside>

      {/* Сітка продуктів */}
      <section className="product-grid">
        <h2>Catalog of Sets</h2>
        <div className="products">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <p className="product-name">{product.name}</p>
                <p className="product-price">${product.price}</p>
              </div>
              <button className="favorite-button">♡</button>
            </div>
          ))}
        </div>
        <button className="load-more-button">+ VIEW MORE ITEMS</button>
      </section>

      {/* Нижня частина сторінки */}
      <div className="bottom-section">
        {/* Банер подарунків */}
        <section className="gift-banner">
          <h2>Gifts are always nice</h2>
          <p>When ordering linen individually, you are guaranteed to receive a gift as a set of sleepwear.</p>
          <button className="learn-more-button">LEARN MORE</button>
        </section>

        {/* Футер */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <img src="/images/LOGO1.png" alt="Lingerie Logo" className="footer-logo" />
              <p>Free hotline:</p>
              <p className="phone-number">8 888 888-88-88</p>
              <div className="social-icons">
                <img src="/images/youtube.png" alt="YouTube" />
                <img src="/images/facebook.png" alt="Facebook" />
                <img src="/images/instagram.png" alt="Instagram" />
                <img src="/images/twitter.png" alt="Twitter" />
              </div>
            </div>
            <div className="footer-links">
              <h4>TIPS FOR BUYER</h4>
              <p>What is my size?</p>
              <p>Panty shapes</p>
              <p>Bra shapes</p>
              <p>Laundry care</p>
              <p>Help desk</p>
            </div>
            <div className="footer-links">
              <h4>CATALOGUE</h4>
              <p>Bras</p>
              <p>Panties</p>
              <p>Swimwear</p>
              <p>Sleepwear</p>
              <p>Home linen</p>
            </div>
            <div className="footer-links">
              <h4>INFORMATION</h4>
              <p>About us</p>
              <p>Contacts</p>
              <p>Order Status</p>
              <p>Privacy policy</p>
              <p>Terms of use</p>
            </div>
            <div className="subscribe-section">
              <h4>SUBSCRIBE TO NEWS</h4>
              <p>Subscribe to receive news about trends, collections, and new promotions.</p>
              <input type="email" className="email-input" placeholder="Enter your e-mail" />
              <button className="subscribe-button">SUBSCRIBE</button>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 Lingerie. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CatalogPage;
