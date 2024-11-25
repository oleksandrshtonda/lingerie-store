import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.scss';
import axiosInstance from '../utils/axiosInstance';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

// Component for Arrow Icon
const ArrowIcon = ({ color }: { color: string }) => (
  <svg
    width="24"
    height="12"
    viewBox="0 0 24 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginRight: '8px' }}
  >
    <path
      d="M1 6H21M21 6L16 1M21 6L16 11"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Homepage: React.FC = () => {
  const [newCollectionProducts, setNewCollectionProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [tailoringProducts, setTailoringProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>(''); // Для відображення помилок
  const [isLoading, setIsLoading] = useState(false); // Для відображення стану завантаження

  // Функція для завантаження продуктів
  const fetchProducts = async (url: string, setState: React.Dispatch<React.SetStateAction<Product[]>>) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(url);
      setState(response.data);
      setError(''); // Очищаємо попередню помилку
    } catch (err) {
      console.error(`Error fetching ${url}:`, err);
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts('/products?filter=new-collection&start=5&limit=4', setNewCollectionProducts);
    fetchProducts('/products?filter=best-sellers', setBestSellers);
    fetchProducts('/products/on-sales', setSaleProducts);
    fetchProducts('/products?filter=tailoring', setTailoringProducts);
  }, []);

  return (
    <div className="homepage">
      {error && <p className="error-message">{error}</p>}
      <section className="banner-section">
        <div className="banner-content">
          <h1 className="banner-title">
            BREAK PATTERNS <span className="highlight">WITH US</span>
          </h1>
          <p className="banner-description">
            In our store, you can buy ready-made designer underwear or bring to life any of your sketches.
          </p>
          <Link to="/catalog" className="shop-now-button">
            <ArrowIcon color="#1F1F21" /> SHOP NOW
          </Link>
        </div>
        <div className="help-desk-button">HELP DESK</div>
      </section>

      <section className="collection-section">
        <h2 className="section-title">New Collection</h2>
        <div className="product-grid">
          {newCollectionProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <button className="product-button">
                <ArrowIcon color="white" /> {product.name.toUpperCase()}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
