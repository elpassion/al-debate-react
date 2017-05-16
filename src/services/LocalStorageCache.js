export default class LocalStorageCache {
  constructor() {
    this.storage = localStorage;
  }

  set(key, value) {
    this.storage.setItem(key, value);
  }

  get(key) {
    return this.storage.getItem(key);
  }
}
