const express = require('express');
const cors = require('cors');
const proxyRoutes = require('./routes/proxyRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Attach all proxy routes
app.use('/api', proxyRoutes);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
