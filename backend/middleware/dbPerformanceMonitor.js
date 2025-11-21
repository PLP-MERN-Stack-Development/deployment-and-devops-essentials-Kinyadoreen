const mongoose = require('mongoose');
const logger = require('../config/logger');

class DBPerformanceMonitor {
  constructor() {
    this.queryTimes = [];
    this.slowQueryThreshold = 100; // ms
    
    // Monitor all queries
    mongoose.set('debug', (collectionName, method, query, doc, options) => {
      const queryInfo = {
        collection: collectionName,
        method,
        query: JSON.stringify(query),
        timestamp: new Date()
      };
      
      this.queryTimes.push(queryInfo);
    });
  }
  
  trackQuery(operation) {
    return async (req, res, next) => {
      const start = Date.now();
      
      res.on('finish', () => {
        const duration = Date.now() - start;
        
        if (duration > this.slowQueryThreshold) {
          logger.warn(`Slow database query detected: ${operation} - ${duration}ms`);
        }
      });
      
      next();
    };
  }
  
  getStats() {
    return {
      totalQueries: this.queryTimes.length,
      slowQueries: this.queryTimes.filter(q => 
        new Date() - q.timestamp > this.slowQueryThreshold
      ).length
    };
  }
}

module.exports = new DBPerformanceMonitor();