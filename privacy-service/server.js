const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const privacyRoutes = require('./routes/privacyRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/privacy', privacyRoutes);

const PORT = process.env.PORT || 5005;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Privacy service connected to MongoDB');
  app.listen(PORT, () => console.log(`Privacy service running on port ${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));
