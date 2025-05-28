export const storageType = "localStorage";

export function getStorageValue(name) {
  return localStorage.getItem(name);
}

export function clearStorageValue(name) {
  localStorage.removeItem(name);
}

export function setStorageValue(name, value) {
  localStorage.setItem(name, value);
}
