import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShopNowButton from '../images/Primary.button123.png'; // Path to the button image
import './Homepage.scss'; // Import the SCSS file
import { Product } from '../models/product';
import { BASE_URL } from '../config'; // Import BASE_URL from config.ts

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

const Homepage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products', error));

    axios
      .get(`${BASE_URL}/api/v1/products/on-sales`)
      .then((response) => setSales(response.data))
      .catch((error) => console.error('Error fetching sales', error));
  }, []);

  const handleCategoryClick = (category: string) => {
    axios
      .get(`${BASE_URL}/api/v1/category?name=${category}`)
      .then((response) => {
        setProducts(response.data);
        console.log(`Products in ${category} category`, response.data);
      })
      .catch((error) => console.error(`Error fetching ${category} products`, error));
  };

  return (
    <div style={{ fontFamily: "'Raleway', sans-serif" }}>
      <section
        className="banner-section"
        style={{ backgroundImage: "url('/images/banner-background.png')" }}
      >
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <h1 className="banner-title">
            BREAK PATTERNS <br />
            <span className="banner-highlight">TOGETHER WITH US</span>
          </h1>
          <p className="banner-description">
            In our store, you can buy ready-made designer underwear or bring to life any of your sketches. Also, you can choose a gift for your loved one.
          </p>
          <img src={ShopNowButton} alt="Shop Now Button" className="mt-4" />
        </div>
        <div className="help-desk-button">HELP DESK</div>
      </section>

      <section className="collection-section">
        <h2 className="collection-title">New Collection</h2>
        <p className="collection-description">
          It is created for real connoisseurs of simplicity.
        </p>

        <div className="product-container">
          <div className="product">
            <img src="/images/Sets-picture.png" alt="Sets" className="product-image" />
            <button className="product-button">
              <ArrowIcon color="white" /> SETS
            </button>
          </div>

          <div className="product">
            <img src="/images/Swimwear-picture.png" alt="Swimwear" className="product-image" />
            <button className="product-button">
              <ArrowIcon color="white" /> SWIMWEAR
            </button>
          </div>

          <div className="product" style={{ transform: 'translateY(-90px)' }}>
            <img src="/images/Home.linen.png" alt="Home Linen" className="product-image" />
            <button className="product-button">
              <ArrowIcon color="white" /> HOME LINEN
            </button>
          </div>
          <div style={{ position: 'relative' }}>
            <div className="product" style={{ transform: 'translateY(-90px)' }}>
              <img src="/images/Sleep.wea.picture.png" alt="Sleepwear" className="product-image" />
              <button className="product-button">
                <ArrowIcon color="white" /> SLEEPWEAR
              </button>
            </div>
            <button className="view-all-button">
              <ArrowIcon color="#AC643E" />
              <span>VIEW ALL COLLECTIONS</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
