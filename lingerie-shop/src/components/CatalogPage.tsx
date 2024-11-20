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
  // Стан для фільтрів
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [] as string[], // Масив обраних брендів
    color: [] as string[], // Масив обраних кольорів
    size: [] as string[],  // Масив обраних розмірів
    priceRange: [100, 500], // Діапазон цін
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToFavorites } = useFavorites();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/api/v1/products`, { params: selectedFilters }) // Передаємо обрані фільтри на сервер
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      });
  };

  const handleFilterChange = (category: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters((prevFilters) => {
      const updatedCategory = prevFilters[category] as string[];
  
      const updatedValues = updatedCategory.includes(value)
        ? updatedCategory.filter((item) => item !== value) // `item` вже визначено як рядок
        : [...updatedCategory, value];
  
      return { ...prevFilters, [category]: updatedValues };
    });
  };

  const handleSaveFilters = () => {
    fetchProducts(); // Запит на сервер з оновленими фільтрами
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedPriceRange = [...selectedFilters.priceRange];
    updatedPriceRange[index] = Number(e.target.value);
    setSelectedFilters({ ...selectedFilters, priceRange: updatedPriceRange });
  };

  return (
    <div className="catalog-page">
      <Breadcrumb
        paths={[
          { label: 'Home', path: '/' },
          { label: 'Catalog', path: '/catalog' },
        ]}
      />

      <div className="catalog-content">
        {/* Фільтри */}
        <aside className="filters">
          <h3>Filters</h3>
          {/* Відображення брендів */}
          <div className="filter-section">
            <h4>Brand</h4>
            <label>
              <input
                type="checkbox"
                onChange={() => handleFilterChange('brand', 'Victoria\'s Secret')}
                checked={selectedFilters.brand.includes('Victoria\'s Secret')}
              />
              Victoria's Secret
            </label>
            <label>
              <input
                type="checkbox"
                onChange={() => handleFilterChange('brand', 'Calvin Klein')}
                checked={selectedFilters.brand.includes('Calvin Klein')}
              />
              Calvin Klein
            </label>
          </div>
          {/* Відображення кольорів */}
          <div className="filter-section">
            <h4>Color</h4>
            <label>
              <input
                type="checkbox"
                onChange={() => handleFilterChange('color', 'Black')}
                checked={selectedFilters.color.includes('Black')}
              />
              Black
            </label>
            <label>
              <input
                type="checkbox"
                onChange={() => handleFilterChange('color', 'White')}
                checked={selectedFilters.color.includes('White')}
              />
              White
            </label>
          </div>
          {/* Відображення розмірів */}
          <div className="filter-section">
            <h4>Size</h4>
            <label>
              <input
                type="checkbox"
                onChange={() => handleFilterChange('size', 'S')}
                checked={selectedFilters.size.includes('S')}
              />
              S
            </label>
            <label>
              <input
                type="checkbox"
                onChange={() => handleFilterChange('size', 'M')}
                checked={selectedFilters.size.includes('M')}
              />
              M
            </label>
          </div>
          {/* Відображення діапазону цін */}
          <div className="filter-section">
            <h4>Price</h4>
            <div className="price-range">
              <label>
                From
                <input
                  type="number"
                  value={selectedFilters.priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                />
              </label>
              <label>
                To
                <input
                  type="number"
                  value={selectedFilters.priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                />
              </label>
            </div>
          </div>
          <button className="save-filters-button" onClick={handleSaveFilters}>
            Save Filters
          </button>
        </aside>

        {/* Сітка продуктів */}
        <section className="product-grid">
          <h2>Catalog of Sets</h2>
          {isLoading ? (
            <p>Loading products...</p>
          ) : (
            <div className="products">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">${product.price}</p>
                  </div>
                  <button
                    className="favorite-button"
                    onClick={() => addToFavorites(product)}
                  >
                    ♡
                  </button>
                </div>
              ))}
            </div>
          )}
          <button className="load-more-button">+ VIEW MORE ITEMS</button>
        </section>
      </div>

      {/* Банер подарунків */}
      <section className="gift-banner">
        <h2>Gifts are always nice</h2>
        <p>When ordering linen individually, you are guaranteed to receive a gift as a set of sleepwear.</p>
        <button className="learn-more-button">LEARN MORE</button>
      </section>
    </div>
  );
};

export default CatalogPage;
