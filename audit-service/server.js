const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const auditRoutes = require('./routes/auditRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/audit', auditRoutes);

const PORT = process.env.PORT || 5006;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Audit service connected to MongoDB');
  app.listen(PORT, () => console.log(`Audit service running on port ${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));
