const storageType = "localStorage";

function getStorageValue(name) {
  try {
    return localStorage.getItem(name);
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
}

function clearStorageValue(name) {
  try {
    localStorage.removeItem(name);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

function setStorageValue(name, value) {
  try {
    localStorage.setItem(name, value);
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
}
