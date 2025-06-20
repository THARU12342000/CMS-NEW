const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const services = require('../config/services');

const router = express.Router();

// Customer Service
router.use('/customers', createProxyMiddleware({
  target: services.customerService,
  changeOrigin: true,
}));

// Product Catalog
router.use('/products', createProxyMiddleware({
  target: services.productCatalogService,
  changeOrigin: true,
}));

// Orders
router.use('/orders', createProxyMiddleware({
  target: services.orderService,
  changeOrigin: true,
}));

// Agreements
router.use('/agreements', createProxyMiddleware({
  target: services.agreementService,
  changeOrigin: true,
}));

// Privacy
router.use('/privacy', createProxyMiddleware({
  target: services.privacyService,
  changeOrigin: true,
}));

// Audit Logs (Optional)
router.use('/audit', createProxyMiddleware({
  target: services.auditService,
  changeOrigin: true,
}));

module.exports = router;
