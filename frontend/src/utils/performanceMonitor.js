export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      pageLoads: [],
      apiCalls: [],
      errors: []
    };
  }
  
  // Track page load performance
  trackPageLoad() {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
      
      this.metrics.pageLoads.push({
        url: window.location.pathname,
        loadTime,
        domReady,
        timestamp: new Date().toISOString()
      });
      
      // Log slow page loads (> 3000ms)
      if (loadTime > 3000) {
        console.warn(`Slow page load detected: ${window.location.pathname} - ${loadTime}ms`);
      }
    }
  }
  
  // Track API call performance
  trackAPICall(endpoint, duration, status) {
    this.metrics.apiCalls.push({
      endpoint,
      duration,
      status,
      timestamp: new Date().toISOString()
    });
    
    // Log slow API calls (> 1000ms)
    if (duration > 1000) {
      console.warn(`Slow API call detected: ${endpoint} - ${duration}ms`);
    }
  }
  
  // Track errors
  trackError(error, context) {
    this.metrics.errors.push({
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    });
  }
  
  // Get performance summary
  getSummary() {
    return {
      pageLoads: {
        count: this.metrics.pageLoads.length,
        avgLoadTime: this.calculateAverage(this.metrics.pageLoads, 'loadTime'),
        avgDomReady: this.calculateAverage(this.metrics.pageLoads, 'domReady')
      },
      apiCalls: {
        count: this.metrics.apiCalls.length,
        avgDuration: this.calculateAverage(this.metrics.apiCalls, 'duration'),
        successRate: this.calculateSuccessRate()
      },
      errors: {
        count: this.metrics.errors.length
      }
    };
  }
  
  calculateAverage(array, field) {
    if (array.length === 0) return 0;
    const sum = array.reduce((acc, item) => acc + item[field], 0);
    return Math.round(sum / array.length);
  }
  
  calculateSuccessRate() {
    if (this.metrics.apiCalls.length === 0) return 100;
    const successful = this.metrics.apiCalls.filter(call => call.status >= 200 && call.status < 300).length;
    return Math.round((successful / this.metrics.apiCalls.length) * 100);
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Track page loads
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    performanceMonitor.trackPageLoad();
  });
}
