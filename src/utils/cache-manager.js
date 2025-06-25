// ===========================================
// src/utils/cache-manager.js
// Search result caching with intelligent invalidation
// ===========================================

class CacheManager {
    constructor() {
      this.cache = new Map();
      this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
      this.maxCacheSize = 100;
      this.hitCount = 0;
      this.missCount = 0;
    }
  
    generateKey(type, params) {
      const sortedParams = Object.keys(params)
        .sort()
        .reduce((result, key) => {
          result[key] = params[key];
          return result;
        }, {});
      
      return `${type}:${JSON.stringify(sortedParams)}`;
    }
  
    set(type, params, data) {
      const key = this.generateKey(type, params);
      
      // Cleanup old entries if cache is full
      if (this.cache.size >= this.maxCacheSize) {
        this.cleanup();
      }
      
      this.cache.set(key, {
        data,
        timestamp: Date.now(),
        accessCount: 0
      });
      
      console.log(`📦 Cached: ${key}`);
    }
  
    get(type, params) {
      const key = this.generateKey(type, params);
      const cached = this.cache.get(key);
      
      if (!cached) {
        this.missCount++;
        return null;
      }
      
      // Check if expired
      if (Date.now() - cached.timestamp > this.cacheTimeout) {
        this.cache.delete(key);
        this.missCount++;
        return null;
      }
      
      // Update access statistics
      cached.accessCount++;
      this.hitCount++;
      
      console.log(`🎯 Cache hit: ${key}`);
      return cached.data;
    }
  
    has(type, params) {
      const key = this.generateKey(type, params);
      const cached = this.cache.get(key);
      
      if (!cached) return false;
      
      // Check if expired
      if (Date.now() - cached.timestamp > this.cacheTimeout) {
        this.cache.delete(key);
        return false;
      }
      
      return true;
    }
  
    invalidate(type, params = null) {
      if (params) {
        // Invalidate specific entry
        const key = this.generateKey(type, params);
        this.cache.delete(key);
        console.log(`🗑️ Invalidated: ${key}`);
      } else {
        // Invalidate all entries of type
        const keysToDelete = [];
        for (const key of this.cache.keys()) {
          if (key.startsWith(`${type}:`)) {
            keysToDelete.push(key);
          }
        }
        
        keysToDelete.forEach(key => this.cache.delete(key));
        console.log(`🗑️ Invalidated ${keysToDelete.length} entries of type: ${type}`);
      }
    }
  
    cleanup() {
      // Remove expired entries
      const now = Date.now();
      const keysToDelete = [];
      
      for (const [key, value] of this.cache.entries()) {
        if (now - value.timestamp > this.cacheTimeout) {
          keysToDelete.push(key);
        }
      }
      
      // If still too many, remove least accessed
      if (this.cache.size - keysToDelete.length >= this.maxCacheSize) {
        const entries = Array.from(this.cache.entries());
        entries.sort((a, b) => a[1].accessCount - b[1].accessCount);
        
        const toRemove = this.cache.size - this.maxCacheSize + 10; // Remove extra for buffer
        for (let i = 0; i < toRemove && i < entries.length; i++) {
          keysToDelete.push(entries[i][0]);
        }
      }
      
      keysToDelete.forEach(key => this.cache.delete(key));
      
      if (keysToDelete.length > 0) {
        console.log(`🧹 Cleaned up ${keysToDelete.length} cache entries`);
      }
    }
  
    clear() {
      this.cache.clear();
      this.hitCount = 0;
      this.missCount = 0;
      console.log('🗑️ Cache cleared');
    }
  
    getStats() {
      return {
        size: this.cache.size,
        hitRate: this.hitCount / (this.hitCount + this.missCount) || 0,
        hits: this.hitCount,
        misses: this.missCount
      };
    }
  }