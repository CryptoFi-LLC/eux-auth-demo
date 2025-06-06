export const storageType = "cacheStorage";

async function openCache() {
  return await caches.open("app-data-cache");
}

// Store values as Response objects with text content
export async function setStorageValue(name, value) {
  const cache = await openCache();
  const response = new Response(value);

  await cache.put(name, response);
}

export async function getStorageValue(name) {
  const cache = await openCache();
  const response = await cache.match(name);

  if (!response) return null;
  return await response.text();
}

export async function clearStorageValue(name) {
  const cache = await openCache();
  await cache.delete(name);
}
