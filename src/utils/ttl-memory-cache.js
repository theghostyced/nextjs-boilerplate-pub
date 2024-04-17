/* eslint-disable no-undef */

const TTLCache = require('@isaacs/ttlcache');

// 180s cache TTL, max TTL allowed in override is 900s
const cache = new TTLCache({ttl: 180000, max: 900000});

export const buildTTLMemoryKey = (functionName, ...functionParams) => {
  return `${functionName.name.toString()}-${JSON.stringify([...functionParams])}`;
};

/**
 * Check cache for data
 * Fallback on data fetching function
 * @param {string} key
 * @param {Function} fallback
 * @return {Any} cached result of fallback
 */
export default async function ttlMemoryCache(key, fallback) {
  if (cache.has(key)) {
    console.log(`TTL Cache: returning ${key}`);
    return cache.get(key);
  }

  const result = await fallback();
  console.log(`TTL Cache: saving ${key}`);
  cache.set(key, result);

  return result;
}
