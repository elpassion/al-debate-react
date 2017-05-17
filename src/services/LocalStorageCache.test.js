import LocalStorageCache from './LocalStorageCache';

describe('LocalStorageCache', () => {
  const key   = 'key';
  const value = 'cached value';

  it('sets element in cache', () => {
    const lsCache = new LocalStorageCache();
    lsCache.set(key, value);
    expect(lsCache.get(key)).toBe(value);
  });
});
