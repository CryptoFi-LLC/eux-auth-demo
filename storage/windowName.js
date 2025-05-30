/**
 * @desc Stores a single value in the browser's window.name property.
 * Async implementation to match other storage modules.
 */

export const storageType = "windowName";

export async function getStorageValue() {
  return new Promise((resolve) => {
    resolve(window.name);
  });
}

export async function clearStorageValue() {
  return new Promise((resolve) => {
    window.name = '';
    resolve();
  });
}

export async function setStorageValue(_, value) {
  return new Promise((resolve) => {
    window.name = value;
    resolve();
  });
}
