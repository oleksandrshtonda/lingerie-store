import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import './ProductPage.scss';
import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../config';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  laundryCare: string[];
  colorOptions: string[];
  sizes: string[];
  rating: number;
  reviews: Review[];
}

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const ProductPage: React.FC = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch product details
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/products/${productId}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error('Error fetching product details:', error));
  }, [productId]);

  const handleQuantityChange = (operation: 'increment' | 'decrement') => {
    setQuantity((prev) =>
      operation === 'increment' ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page">
      {/* Breadcrumb */}
      <Breadcrumb
        paths={[
          { label: 'Home', path: '/' },
          { label: 'Catalog', path: '/catalog' },
          { label: product.name, path: `/product/${product.id}` },
        ]}
      />

      <div className="product-container">
        {/* Product Images */}
        <div className="product-images">
          <div className="thumbnail-list">
            {product.colorOptions.map((color, index) => (
              <img
                key={index}
                src={`/images/products/${color}.png`}
                alt={`Thumbnail ${color}`}
                className="thumbnail"
              />
            ))}
          </div>
          <img
            src={product.image}
            alt={product.name}
            className="main-image"
          />
        </div>

        {/* Product Details */}
        <div className="product-details">
          <h1>{product.name.toUpperCase()}</h1>
          <p className="product-code">Code: {product.id}</p>

          <div className="product-colors">
            <h4>Colour</h4>
            <div className="color-options">
              {product.colorOptions.map((color, index) => (
                <span
                  key={index}
                  className="color-dot"
                  style={{ backgroundColor: color }}
                ></span>
              ))}
            </div>
          </div>

          <div className="product-sizes">
            <h4>Size</h4>
            <div className="size-options">
              {product.sizes.map((size, index) => (
                <span key={index} className="size-option">
                  {size}
                </span>
              ))}
            </div>
          </div>

          <div className="product-price">
            <h4>Price</h4>
            <p>${product.price.toFixed(2)}</p>
          </div>

          {/* Quantity Selector */}
          <div className="quantity-selector">
            <button onClick={() => handleQuantityChange('decrement')}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange('increment')}>+</button>
          </div>

          {/* Add to Cart */}
          <button className="add-to-cart-button">ADD TO CART</button>
        </div>
      </div>

      {/* Product Description */}
      <div className="product-description">
        <h3>Description</h3>
        <p>{product.description}</p>
      </div>

      {/* Laundry Care */}
      <div className="laundry-care">
        <h3>Laundry Care</h3>
        <ul>
          {product.laundryCare.map((care, index) => (
            <li key={index}>{care}</li>
          ))}
        </ul>
      </div>

      {/* Reviews */}
      <div className="reviews">
        <h3>Reviews ({product.reviews.length})</h3>
        {product.reviews.slice(0, 2).map((review, index) => (
          <div key={index} className="review">
            <p>{review.comment}</p>
            <span>
              <strong>{review.name}</strong> - {review.date}
            </span>
          </div>
        ))}
        <Link to={`/product/${product.id}/reviews`} className="view-more">
          View More Reviews
        </Link>
      </div>

      {/* Footer */}
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
  );
};

export default ProductPage;
