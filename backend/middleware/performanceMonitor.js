const performanceMonitor = (req, res, next) => {
  const start = process.hrtime();
  
  res.on('finish', () => {
    const elapsed = process.hrtime(start);
    const elapsedMs = elapsed[0] * 1000 + elapsed[1] / 1000000;
    
    // Log slow requests (> 1000ms)
    if (elapsedMs > 1000) {
      console.warn(`Slow request detected: ${req.method} ${req.originalUrl} - ${elapsedMs.toFixed(2)}ms`);
    }
    
    // Add response time header
    res.set('X-Response-Time', `${elapsedMs.toFixed(2)}ms`);
  });
  
  next();
};

module.exports = performanceMonitor;
