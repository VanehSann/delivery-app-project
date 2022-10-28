const setIntoLocalStorage = (key, value) => localStorage.setItem(key, value);

const getFromLocalStorage = (key) => localStorage.getItem(key);

module.exports = {
  setIntoLocalStorage,
  getFromLocalStorage,
};
