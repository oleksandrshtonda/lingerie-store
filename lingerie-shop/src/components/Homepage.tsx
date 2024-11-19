import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Додаємо Link для навігації
import './Homepage.scss';

import { BASE_URL } from '../config';

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



  // Fetch data for different product categories
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/products?filter=new-collection&start=5&limit=4`)
      .then(response => setNewCollectionProducts(response.data))
      .catch(error => console.error('Error fetching new collection products', error));

    axios
      .get(`${BASE_URL}/api/v1/products?filter=best-sellers`)
      .then(response => setBestSellers(response.data))
      .catch(error => console.error('Error fetching best sellers', error));

    axios
      .get(`${BASE_URL}/api/v1/products/on-sales`)
      .then(response => setSaleProducts(response.data))
      .catch(error => console.error('Error fetching sale products', error));

    axios
      .get(`${BASE_URL}/api/v1/products?filter=tailoring`)
      .then(response => setTailoringProducts(response.data))
      .catch(error => console.error('Error fetching tailoring products', error));
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
          {/* Зміна: Використовуємо Link для переходу на /catalog */}
          <Link to="/catalog" className="shop-now-button">
            <ArrowIcon color="#1F1F21" /> SHOP NOW
          </Link>
        </div>
        <div className="help-desk-button">HELP DESK</div>
      </section>

      {/* New Collection Section */}
      <section className="collection-section">
        <h2 className="section-title">New Collection</h2>
        <p className="section-subtitle">It is created for real connoisseurs of simplicity.</p>
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
        <button className="view-all-button">
          <ArrowIcon color="#AC643E" /> VIEW ALL COLLECTIONS
        </button>
      </section>

      {/* Best-Sellers Section */}
      <section className="best-sellers-section">
        <h2 className="section-title">Best-Sellers</h2>
        <div className="product-grid">
          {bestSellers.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <p>{product.name}</p>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="view-all-button">
          <ArrowIcon color="#AC643E" /> VIEW ALL POSITIONS
        </button>
      </section>

      {/* Sale Section */}
      <section className="sale-section">
        <h2 className="section-title">Sale</h2>
        <div className="product-grid">
          {saleProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <p>{product.name}</p>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="view-all-button">
          <ArrowIcon color="#AC643E" /> VIEW ALL POSITIONS
        </button>
      </section>

      {/* Tailoring For You Section */}
      <section className="tailoring-section">
        <h2 className="section-title">Tailoring For You</h2>
        <p className="section-subtitle">Provide us with any sketch that has sunk into your soul, and our craftsmen will bring it to life in a short time.</p>
        <button className="add-sketch-button">
          <ArrowIcon color="#AC643E" /> ADD SKETCH
        </button>
        <div className="tailoring-grid">
          {tailoringProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <p>{product.name}</p>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop Advantages Section */}
      <section className="shop-advantages-section">
        <h3 className="section-title">Our Shop Advantages</h3>
        <div className="advantages-grid">
          <div className="advantage">
            <img src="/images/free-shipping.png" alt="Free Shipping" />
            <p>Free Shipping</p>
          </div>
          <div className="advantage">
            <img src="/images/secure-payment.png" alt="Secure Payment" />
            <p>Secure Payment</p>
          </div>
          <div className="advantage">
            <img src="/images/bonuses.png" alt="Bonuses" />
            <p>Purchase Bonuses</p>
          </div>
          <div className="advantage">
            <img src="/images/easy-return.png" alt="Easy Return" />
            <p>Easy Return</p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us-section">
        <h3 className="section-title">Few Words About Us</h3>
        <p className="section-subtitle">We care about women and create a great service to make them feel comfortable in the right lingerie.</p>
        <button className="instagram-button">
          <ArrowIcon color="#AC643E" /> OUR INSTAGRAM
        </button>
        <div className="instagram-photos">
          <img src="/images/instagram1.png" alt="Instagram 1" />
          <img src="/images/instagram2.png" alt="Instagram 2" />
          <img src="/images/instagram3.png" alt="Instagram 3" />
        </div>
      </section>
        </div>
  );
};

export default Homepage;
