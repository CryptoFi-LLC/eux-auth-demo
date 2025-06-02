/**
 * @desc Async to provide a common implementation for all storage types.
 */

export const storageType = "localStorage";

export async function getStorageValue(name) {
  return new Promise((resolve) => {
    const value = localStorage.getItem(name);
    resolve(value);
  });
}

export async function clearStorageValue(name) {
  return new Promise((resolve) => {
    localStorage.removeItem(name);
    resolve();
  });
}

export async function setStorageValue(name, value) {
  return new Promise((resolve) => {
    localStorage.setItem(name, value);
    resolve();
  });
}
