import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Breadcrumb from '../components/Breadcrumb';
import { useFavorites } from '../store/FavoritesContext';
import './CatalogPage.scss';

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
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: [],
    brands: [],
    colors: [],
    sizes: [],
    styles: [],
  });
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    categories: [],
    brand: [],
    color: [],
    size: [],
    style: [],
    fromPrice: 0,
    toPrice: 500,
    isSales: false,
  });
  const [error, setError] = useState<string>('');
  const { addToFavorites } = useFavorites();

  const fetchFilters = async () => {
    try {
      const response = await axiosInstance.get('/filters');
      setFilterOptions(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching filter options:', err);
      setError('Failed to fetch filter options.');
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/products', selectedFilters);
      setProducts(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFilters();
    fetchProducts();
  }, []);

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
      {error && <p className="error-message">{error}</p>}
      <Breadcrumb
        paths={[{ label: 'Home', path: '/' }, { label: 'Catalog', path: '/catalog' }]}
      />
      <div className="catalog-content">
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

        <section className="product-grid">
          {isLoading ? (
            <p>Loading products...</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <p>{product.name}</p>
                <p>${product.price.toFixed(2)}</p>
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
