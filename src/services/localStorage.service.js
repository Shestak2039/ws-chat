export function localStorageSet(key, content) {
  localStorage.setItem(key, content);
}

export function localStorageGet(key) {
  return localStorage.getItem(key);
}

export function localStorageDelete(key) {
  localStorage.removeItem(key);
}
