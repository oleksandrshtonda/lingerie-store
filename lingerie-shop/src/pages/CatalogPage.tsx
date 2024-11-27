import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; // Використовуємо кастомний axios для роботи з API
import Breadcrumb from '../components/Breadcrumb'; // Компонент для показу шляху (навігації)
import { useFavorites } from '../store/FavoritesContext'; // Використовуємо контекст для додавання в "Улюблене"
import './CatalogPage.scss'; // Імпортуємо стилі
import { getAllCategories } from '../services/CategoryService';
import { searchProducts } from '../services/ProductService';


// Інтерфейси для опису структури продукту та фільтрів
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface FilterOptions {
  categories: string[];
  brands: string[];
  colors: string[];
  sizes: string[];
  styles: string[];
}

interface SelectedFilters {
  categories: string[];
  brand: string[];
  color: string[];
  size: string[];
  style: string[];
  fromPrice: number;
  toPrice: number;
  isSales: boolean;
}

const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Список продуктів
  const [isLoading, setIsLoading] = useState(false); // Стан завантаження
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: [],
    brands: [],
    colors: [],
    sizes: [],
    styles: [],
  }); // Опції для фільтрів
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    categories: [],
    brand: [],
    color: [],
    size: [],
    style: [],
    fromPrice: 0,
    toPrice: 500,
    isSales: false,
  }); // Вибрані фільтри
  const [error, setError] = useState<string>(''); // Для відображення помилок
  const { addToFavorites } = useFavorites(); // Функція для додавання продукту в "Улюблене"

  // Функція для отримання опцій фільтрів
  const fetchFilters = async () => {
    try {
      const categoriesResponse = await getAllCategories();
      setFilterOptions((prev) => ({
        ...prev,
        categories: categoriesResponse.data.map((cat: any) => cat.name),
      }));
      setError('');
    } catch (err) {
      console.error('Error fetching filter options:', err);
      setError('Failed to fetch filter options.');
    }
  };

  // Функція для отримання продуктів (з урахуванням вибраних фільтрів)
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await searchProducts(selectedFilters);
      setProducts(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products.');
    } finally {
      setIsLoading(false);
    }
  };

  // Викликаємо fetchFilters і fetchProducts після першого рендера
  useEffect(() => {
    fetchFilters();
    fetchProducts();
  }, []);

  // Функція для зміни фільтрів
  const handleFilterChange = (
    category: keyof SelectedFilters,
    value: string | number | boolean
  ) => {
    setSelectedFilters((prevFilters) => {
      if (Array.isArray(prevFilters[category])) {
        const updatedCategory = prevFilters[category] as string[];
        const updatedValues = updatedCategory.includes(value as string)
          ? updatedCategory.filter((item) => item !== value)
          : [...updatedCategory, value as string];
        return { ...prevFilters, [category]: updatedValues };
      }
      return { ...prevFilters, [category]: value };
    });
  };

  return (
    <div className="catalog-page">
      {/* Відображення помилок */}
      {error && <p className="error-message">{error}</p>}

      {/* Навігаційний хлібний шлях */}
      <Breadcrumb
        paths={[{ label: 'Home', path: '/' }, { label: 'Catalog', path: '/catalog' }]}
      />

      <div className="catalog-content">
        {/* Секція фільтрів */}
        <aside className="filters">
          <h3>Filters</h3>
          <div className="filter-section">
            <h4>Categories</h4>
            {filterOptions.categories.map((category) => (
              <label key={category}>
                <input
                  type="checkbox"
                  onChange={() => handleFilterChange('categories', category)}
                  checked={selectedFilters.categories.includes(category)}
                />
                {category}
              </label>
            ))}
          </div>
          <button className="save-filters-button" onClick={fetchProducts}>
            Save Filters
          </button>
        </aside>

        {/* Секція продуктів */}
        <section className="product-grid">
          {isLoading ? (
            <p>Loading products...</p> // Відображення стану завантаження
          ) : (
            products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <p>{product.name}</p>
                <p>${product.price.toFixed(2)}</p>
                {/* Додавання в "Улюблене" */}
                <button onClick={() => addToFavorites(product)}>♡ Add to Favorites</button>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default CatalogPage;
