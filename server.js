const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable Gzip compression
app.use(compression({ level: 9 })); // Maximum compression level

// Middleware to set cache headers for static assets
app.use((req, res, next) => {
  // Skip cache headers for HTML files
  if (req.path.endsWith('.html') || req.path === '/') {
    return next();
  }
  
  // Set aggressive caching for static assets
  const maxAge = {
    // Cache images for 1 year
    '.png': 31536000,
    '.jpg': 31536000,
    '.jpeg': 31536000,
    '.gif': 31536000,
    '.webp': 31536000,
    '.avif': 31536000,
    '.svg': 31536000,
    '.ico': 31536000,
    // Cache CSS and JS for 1 week (since they might change more often)
    '.css': 604800,
    '.js': 604800,
    // Cache fonts for 1 year
    '.woff': 31536000,
    '.woff2': 31536000,
    '.ttf': 31536000,
    '.eot': 31536000,
    // Default cache time: 1 day
    'default': 86400
  };
  
  const ext = path.extname(req.path);
  const cacheTime = maxAge[ext] || maxAge.default;
  
  // Set cache headers
  res.setHeader('Cache-Control', `public, max-age=${cacheTime}, immutable`);
  next();
});

// Serve static files
app.use(express.static(__dirname, {
  etag: true, // Enable ETags for conditional requests
  lastModified: true // Enable Last-Modified for conditional requests
}));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});