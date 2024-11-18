import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section contact-info">
          <img src="/images/LOGO1.png" alt="Lingerie Logo" className="footer-logo" />
          <p className="hotline">Free hotline:</p>
          <p className="phone-number">8 888 888-88-88</p>
          <div className="social-icons">
            <img src="/images/youtube.png" alt="YouTube" />
            <img src="/images/instagram.png" alt="Instagram" />
            <img src="/images/facebook.png" alt="Facebook" />
            <img src="/images/twitter.png" alt="Twitter" />
          </div>
        </div>

        <div className="footer-section footer-links">
          <h4>TIPS FOR BUYER</h4>
          <p>What is my size?</p>
          <p>Panty shapes</p>
          <p>Bra shapes</p>
          <p>Laundry care</p>
          <p>Help desk</p>
        </div>

        <div className="footer-section footer-links">
          <h4>CATALOGUE</h4>
          <p>Bras</p>
          <p>Panties</p>
          <p>Swimwear</p>
          <p>Sleepwear</p>
          <p>Home linen</p>
        </div>

        <div className="footer-section footer-links">
          <h4>INFORMATION</h4>
          <p>About us</p>
          <p>Contacts</p>
          <p>Order Status</p>
          <p>Privacy policy</p>
          <p>Terms of use</p>
        </div>

        <div className="footer-section subscribe-section">
          <h4>SUBSCRIBE TO NEWS</h4>
          <p>Subscribe to receive news about trends, collections and new promotions.</p>
          <input type="email" className="email-input" placeholder="Enter your e-mail" />
          <button className="subscribe-button">SUBSCRIBE</button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Lingerie. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
