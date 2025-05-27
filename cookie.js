const storageType = "cookies"; 

function getStorageValue(name) {
  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  } catch (error) {
    console.error('Error reading from cookie:', error);
    return null;
  }
}

function clearStorageValue(name) {
  try {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  } catch (error) {
    console.error('Error clearing cookie:', error);
  }
}

function setStorageValue(name, value) {
  try {
    document.cookie = `${name}=${value}; path=/; max-age=3600`;
  } catch (error) {
    console.error('Error writing to cookie:', error);
  }
}
