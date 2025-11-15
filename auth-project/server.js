require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const users = [
  { id: 1, email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { id: 2, email: 'user@example.com', password: 'user123', role: 'user' }
];

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Middleware для перевірки ролей
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden - insufficient permissions' });
    }
    next();
  };
};

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { 
      sub: user.id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  res.json({
    access_token: token,
    token_type: 'Bearer',
    expires_in: 900
  });
});

app.get('/profile', requireAuth, (req, res) => {
  res.json({
    user_id: req.user.sub,
    role: req.user.role,
    message: 'This is protected profile data'
  });
});


app.delete('/users/:id', requireAuth, checkRole(['admin']), (req, res) => {
  res.json({
    message: `User ${req.params.id} deleted (demo)`,
    deleted_by: req.user.sub
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Available endpoints:');
  console.log('POST /login - Login to get JWT token');
  console.log('GET /profile - Get user profile (requires auth)');
  console.log('DELETE /users/:id - Delete user (admin only)');
});