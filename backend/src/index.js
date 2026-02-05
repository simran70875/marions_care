const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("short"));

// DB connect
mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Server listening on ${process.env.PORT}`);
  });
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

console.log('Running from directory:', __dirname);

// Static assets
app.use('/static', express.static(path.join(__dirname, '../public')));

// auth login routes
try {
  app.use('/api/auth', require('./routes/auth.routes'));
} catch (err) {
  console.error('❌ Failed to load auth.routes:', err.message);
}

// admin routes
try {
  app.use('/api/admin', require('./routes/admin.routes'));
} catch (err) {
  console.error('❌ Failed to load admin.routes:', err.message);
}

// carer routes
try {
  app.use('/api/carer', require('./routes/carer.routes'));
} catch (err) {
  console.error('❌ Failed to load carer.routes:', err.message);
}

// customer routes
try {
  app.use('/api/customer', require('./routes/customer.routes'));
} catch (err) {
  console.error('❌ Failed to load customer.routes:', err.message);
}

// customer/carer shifts route for admin
try {
  app.use('/api/shifts', require('./routes/shift.routes'));
} catch (err) {
  console.error('❌ Failed to load shifts.routes:', err.message);
}

// customer shifts route for just customer
try {
  app.use('/customer/shifts', require('./routes/customer.shift.route'));
} catch (err) {
  console.error('❌ Failed to load shifts.routes:', err.message);
}


// Serve frontend and admin (Vite build)
const frontendPath = path.join(__dirname, '../frontend/dist');
const adminPath = path.join(__dirname, '../admin/dist');

// Serve static files
app.use('/', express.static(frontendPath));
app.use('/admin', express.static(adminPath));

// Redirect `/admin` to `/admin/` to avoid path issues
app.get('/admin', (req, res) => {
  res.redirect('/admin/');
});

// Fallback for admin SPA
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(adminPath, 'index.html'));
});

// Fallback for frontend SPA
app.get(/^\/(?!admin).*$/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});
