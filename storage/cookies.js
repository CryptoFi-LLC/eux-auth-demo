/**
 * @desc Async to provide a common implementation for all storage types.
 */

export const storageType = "cookies";

export async function getStorageValue(name) {
  return new Promise((resolve) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      resolve(parts.pop().split(";").shift());
    } else {
      resolve(null);
    }
  });
}

export async function clearStorageValue(name) {
  return new Promise((resolve) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    resolve();
  });
}

export async function setStorageValue(name, value) {
  return new Promise((resolve) => {
    document.cookie = `${name}=${value}; path=/; max-age=3600`;
    resolve();
  });
}
