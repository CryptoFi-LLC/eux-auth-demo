/**
 * @desc Stores a single value in the browser's window.name property.
 */

export const storageType = "windowName";

export function getStorageValue() {
  return window.name;
}

export function clearStorageValue() {
  window.name = '';
}

export function setStorageValue(_, value) {
  window.name = value;
}
