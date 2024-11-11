interface CacheItem<T> {
  value: T;
  expiry: number;
}

class BrowserCache {
  private cache: Map<string, CacheItem<any>>;
  private defaultTTL: number;

  constructor(ttlSeconds: number = 3600) {
    this.cache = new Map();
    this.defaultTTL = ttlSeconds;
  }

  set<T>(key: string, value: T, ttl: number = this.defaultTTL): void {
    const expiry = Date.now() + ttl * 1000;
    this.cache.set(key, { value, expiry });
  }

  get<T>(key: string): T | undefined {
    const item = this.cache.get(key);

    if (!item) return undefined;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return undefined;
    }

    return item.value as T;
  }

  // Añadimos el método debug
  debug(): void {
    console.log(
      "Cache contents:",
      Array.from(this.cache.entries()).map(([key, item]) => ({
        key,
        value: item.value,
        expiry: new Date(item.expiry).toLocaleString(),
      }))
    );
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

export default new BrowserCache();
