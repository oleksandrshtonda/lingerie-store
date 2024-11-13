import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Логотип та контактна інформація */}
        <div className="flex flex-col items-center md:items-start">
          <img src="/images/LOGO.png" alt="Lingerie Logo" className="h-10 mb-4" />
          <p className="text-lg font-semibold">Free hotline:</p>
          <p className="text-xl font-bold">8 888 888-88-88</p>
          <div className="flex space-x-4 mt-4">
            <img src="/images/youtube.png" alt="YouTube" className="w-6 h-6" />
            <img src="/images/instagram.png" alt="Instagram" className="w-6 h-6" />
            <img src="/images/facebook.png" alt="Facebook" className="w-6 h-6" />
            <img src="/images/twitter.png" alt="Twitter" className="w-6 h-6" />
          </div>
        </div>

        {/* Інформація для покупців */}
        <div>
          <h3 className="font-semibold mb-3">TIPS FOR BUYER</h3>
          <ul className="space-y-2">
            <li>What is my size?</li>
            <li>Panty shapes</li>
            <li>Bra shapes</li>
            <li>Laundry care</li>
            <li>Help desk</li>
          </ul>
        </div>

        {/* Каталог */}
        <div>
          <h3 className="font-semibold mb-3">CATALOGUE</h3>
          <ul className="space-y-2">
            <li>Bras</li>
            <li>Panties</li>
            <li>Swimwear</li>
            <li>Sleepwear</li>
            <li>Home linen</li>
          </ul>
        </div>

        {/* Інформація */}
        <div>
          <h3 className="font-semibold mb-3">INFORMATION</h3>
          <ul className="space-y-2">
            <li>About us</li>
            <li>Contacts</li>
            <li>Order Status</li>
            <li>Privacy policy</li>
            <li>Terms of use</li>
          </ul>
        </div>

        {/* Підписка на новини */}
        <div className="mt-8 md:mt-0">
          <h3 className="font-semibold mb-3">SUBSCRIBE TO NEWS</h3>
          <p className="text-sm mb-4">Subscribe to receive news about trends, collections, and new promotions.</p>
          <form className="flex flex-col space-y-2">
            <input type="email" placeholder="Enter your e-mail" className="px-4 py-2 rounded text-black" />
            <button className="bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-300">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      <div className="text-center mt-8">
        <p>© 2024 Lingerie. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
