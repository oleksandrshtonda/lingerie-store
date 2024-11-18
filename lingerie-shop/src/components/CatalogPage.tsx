import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import { useFavorites } from '../store/FavoritesContext';
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
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    brand: '',
    color: '',
    size: '',
    priceRange: [0, 500],
  });

  const { addToFavorites } = useFavorites(); // Додаємо функцію addToFavorites

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/products`)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products', error));
  }, []);
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedFilters({ ...selectedFilters, [name]: value });
  };

  return (
    <div className="catalog-page">
      {/* Breadcrumb для навігації */}
      <Breadcrumb
        paths={[
          { label: 'Home', path: '/' },
          { label: 'Catalog', path: '/catalog' },
          { label: 'Sets', path: '/catalog/sets' },
        ]}
      />

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

</div>
</div>
);
};

export default CatalogPage;
