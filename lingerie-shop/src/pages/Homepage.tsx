import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNewCollection, getBestSellers, getProductsOnSale, getTailoringProducts } from '../services/ProductService'; // Імпортуємо функції окремо
import './Homepage.scss';
import ArrowIcon from '../components/ArrowIcon';


interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

const Homepage: React.FC = () => {
  const [newCollectionProducts, setNewCollectionProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [tailoringProducts, setTailoringProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch new collection
    getNewCollection()
      .then((response) => setNewCollectionProducts(response.data))
      .catch((error: unknown) => {
        console.error('Error fetching new collection products:', error);
        setError('Failed to load new collection products.');
      });

    // Fetch best sellers
    getBestSellers()
      .then((response) => setBestSellers(response.data))
      .catch((error: unknown) => {
        console.error('Error fetching best sellers:', error);
        setError('Failed to load best sellers.');
      });

    // Fetch sale products
    getProductsOnSale()
      .then((response) => setSaleProducts(response.data))
      .catch((error: unknown) => {
        console.error('Error fetching sale products:', error);
        setError('Failed to load sale products.');
      });

    // Fetch tailoring products
    getTailoringProducts()
      .then((response) => setTailoringProducts(response.data))
      .catch((error: unknown) => {
        console.error('Error fetching tailoring products:', error);
        setError('Failed to load tailoring products.');
      });
  }, []);

  return (
    <div className="homepage">
      {/* Banner Section */}
      <section className="banner-section">
        <div className="banner-content">
          <h1 className="banner-title">
            BREAK PATTERNS <span className="highlight">WITH US</span>
          </h1>
          <p className="banner-description">
            In our store, you can buy ready-made designer underwear or bring to life any of your sketches. Also, you can choose a gift for your loved one.
          </p>
          <Link to="/catalog" className="shop-now-button">
            <ArrowIcon color="#1F1F21" /> SHOP NOW
          </Link>
        </div>
        <div className="help-desk-button">HELP DESK</div>
      </section>

      {/* New Collection Section */}
      <section className="collection-section">
        <h2 className="section-title">New Collection</h2>
        <div className="product-grid">
          {newCollectionProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <button className="product-button">{product.name.toUpperCase()}</button>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="best-sellers-section">
        <h2 className="section-title">Best Sellers</h2>
        <div className="product-grid">
          {bestSellers.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <div className="product-info">
                <p>{product.name}</p>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sale Section */}
      <section className="sale-section">
        <h2 className="section-title">Sale</h2>
        <div className="product-grid">
          {saleProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <div className="product-info">
                <p>{product.name}</p>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tailoring Section */}
      <section className="tailoring-section">
        <h2 className="section-title">Tailoring Products</h2>
        <div className="product-grid">
          {tailoringProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <div className="product-info">
                <p>{product.name}</p>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
