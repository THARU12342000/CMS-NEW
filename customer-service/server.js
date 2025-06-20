const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const customerRoutes = require('./routes/customerRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Customer service connected to MongoDB');
  app.listen(PORT, () => console.log(`Customer service running on port ${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));
