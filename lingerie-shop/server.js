const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Дані для категорій
const categories = [
  { id: 1, name: 'New' },
  { id: 2, name: 'Sale' },
  { id: 3, name: 'Bras' },
  { id: 4, name: 'Panties' },
  { id: 5, name: 'Lingerie' },
  { id: 6, name: 'Sets' },
  { id: 7, name: 'Swimwear' },
  { id: 8, name: 'Sleepwear' },
  { id: 9, name: 'Home Linen' },
  { id: 10, name: 'Individual Tailoring' }
];

// Дані для продуктів
const products = [
  { id: 1, name: 'Silk Bra', price: 50, imageUrl: 'https://via.placeholder.com/150', category: 'Bras' },
  { id: 2, name: 'Lace Panties', price: 20, imageUrl: 'https://via.placeholder.com/150', category: 'Panties' },
  { id: 3, name: 'Lingerie Set', price: 75, imageUrl: 'https://via.placeholder.com/150', category: 'Lingerie' },
  // Додай більше продуктів за бажанням
];

// Ендпоінт для отримання категорій
app.get('/api/v1/categories', (req, res) => {
  res.json(categories);
});

// Ендпоінт для отримання товарів конкретної категорії
app.get('/api/v1/category', (req, res) => {
  const category = req.query.name;
  const filteredProducts = products.filter(product => product.category === category);
  res.json(filteredProducts);
});

// Ендпоінт для отримання всіх продуктів
app.get('/api/v1/products', (req, res) => {
  res.json(products);
});

// Ендпоінт для отримання акційних товарів (наприклад, з фільтром)
app.get('/api/v1/sales', (req, res) => {
  const salesProducts = products.slice(0, 2); // Перші два продукти як акційні
  res.json(salesProducts);
});

// Ендпоінт для отримання конкретного продукту
app.get('/api/v1/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Ендпоінт для кошика
const cart = [];

app.get('/api/v1/cart', (req, res) => {
  res.json(cart);
});

app.post('/api/v1/cart/add', (req, res) => {
  const { productId, quantity } = req.body;
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push({ product, quantity });
    res.json({ message: 'Product added to cart', cart });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Авторизація (проста реєстрація/логін)
let users = [];

app.post('/api/v1/auth/register', (req, res) => {
  const { email, password } = req.body;
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ email, password });
  res.json({ message: 'User registered successfully' });
});

app.post('/api/v1/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    res.json({ message: 'Login successful', token: 'dummy-jwt-token' });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// Пошук товарів
app.get('/api/v1/search', (req, res) => {
  const query = req.query.query.toLowerCase();
  const searchResults = products.filter(product =>
    product.name.toLowerCase().includes(query)
  );
  res.json(searchResults);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});
