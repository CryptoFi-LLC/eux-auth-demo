export const storageType = "localStorage";

export function getStorageValue(name) {
  try {
    return localStorage.getItem(name);
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
}

export function clearStorageValue(name) {
  try {
    localStorage.removeItem(name);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

export function setStorageValue(name, value) {
  try {
    localStorage.setItem(name, value);
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
}
