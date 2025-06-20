const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const agreementRoutes = require('./routes/agreementRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/agreements', agreementRoutes);

const PORT = process.env.PORT || 5004;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Agreement service connected to MongoDB');
  app.listen(PORT, () => console.log(`Agreement service running on port ${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));
