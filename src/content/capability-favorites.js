const favoritePrefix = 'kgcure-review-favorite:';
const legacyFavoriteKey = 'kgcure-favorites';

export function readCapabilityFavorites() {
  const ids = new Set();
  try {
    const legacy = JSON.parse(localStorage.getItem(legacyFavoriteKey) || '[]');
    if (Array.isArray(legacy)) {
      legacy.forEach(id => { if (typeof id === 'string') ids.add(id); });
    }
  } catch {}

  try {
    for (const key of Object.keys(localStorage)) {
      if (!key.startsWith(favoritePrefix)) continue;
      const id = key.slice(favoritePrefix.length);
      if (localStorage.getItem(key) === '1') ids.add(id);
      else ids.delete(id);
    }
  } catch {}
  return ids;
}

export function writeCapabilityFavorite(id, saved) {
  // Keep explicit removals so old array entries do not reappear after a reload.
  localStorage.setItem(favoritePrefix + id, saved ? '1' : '0');
}

export function isCapabilityFavoriteStorageEvent(event) {
  return event.key === null || event.key === legacyFavoriteKey || event.key.startsWith(favoritePrefix);
}
