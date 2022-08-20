export const getProductsFromLS = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return [];
  }
};

export const setProductsToLS = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};
