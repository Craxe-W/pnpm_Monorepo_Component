/**
 * localStoreage
 */
export const LS = {
  set(key: any, value: any) {
    if (this.get(key) !== null) {
      this.remove(key);
    }
    window.localStorage.setItem(key, value);
  },
  get(key: any) {
    return window.localStorage.getItem(key);
  },
  remove(key: any) {
    window.localStorage.removeItem(key);
  },
  clear() {
    window.localStorage.clear();
  },
  getJson(key: any) {
    return JSON.parse(this.get(key)!);
  },
  setJson(key: any, value: any) {
    this.set(key, JSON.stringify(value));
  },
};

/**
 * sessionStoreage
 */
export const SS = {
  set(key: any, value: any) {
    if (this.get(key) !== null) {
      this.remove(key);
    }
    window.sessionStorage.setItem(key, value);
  },
  get(key: any) {
    return window.sessionStorage.getItem(key);
  },
  remove(key: any) {
    window.sessionStorage.removeItem(key);
  },
  clear() {
    window.sessionStorage.clear();
  },
  getJson(key: any) {
    return JSON.parse(this.get(key)!);
  },
  setJson(key: any, value: any) {
    this.set(key, JSON.stringify(value));
  },
};
