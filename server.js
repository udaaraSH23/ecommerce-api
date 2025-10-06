const express = require('express');
const sequelize = require('./src/config/db');
const productRoutes = require('./src/routes/productRoutes');

const app = express();
app.use(express.json());

// routes
app.use('/api/products', productRoutes);

// sync DB
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
