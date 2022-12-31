const parse = (item, init) => {
  try {
    return item ? JSON.parse(item) : init;
  } catch (err) {
    return item || init;
  }
};

const stringify = (item) => {
  try {
    return JSON.stringify(item);
  } catch (err) {
    return '';
  }
};

export const LocalStorage = {
  getItem: (key, init) => {
    try {
      const item = localStorage.getItem(key);
      return parse(item, init);
    } catch (error) {
      console.warn(error);
    }
  },

  setItem: (key, item) => {
    try {
      return localStorage.setItem(key, stringify(item));
    } catch (error) {
      console.warn(error);
    }
  },

  removeItem: (key) => {
    try {
      return localStorage.removeItem(key);
    } catch (error) {
      console.warn(error);
    }
  },

  /**
   * @param {"windowStorage" | "localStorage"} storageType
   */
  clear: (storageType) => {
    try {
      return localStorage.clear();
    } catch (error) {
      console.warn(error);
    }
  },
};

export const SessionStorage = {
  getItem: (key, init) => {
    try {
      const item = sessionStorage.getItem(key);
      return parse(item, init);
    } catch (error) {
      console.warn(error);
    }
  },

  setItem: (key, item) => {
    try {
      return sessionStorage.setItem(key, stringify(item));
    } catch (error) {
      console.warn(error);
    }
  },

  removeItem: (key) => {
    try {
      return sessionStorage.removeItem(key);
    } catch (error) {
      console.warn(error);
    }
  },

  clear: () => {
    try {
      return sessionStorage.clear();
    } catch (error) {
      console.warn(error);
    }
  },
};
