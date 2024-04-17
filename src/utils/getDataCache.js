/* eslint-disable no-undef */

const path = require('path');
const flatCache = require('flat-cache');
const cacheFolder = path.resolve('./_cache');
const {isInDraftMode} = require('./draftMode');
// const {captureException} = require('@sentry/nextjs');

/**
 * Check cache for data
 * Fallback on data fetching function
 * @param {String} filename - filename to save this cache
 * @param {Boolean} isPreviewMode - boolean to show if we should cache the data or not
 * @param {Function} fallback
 * @return {Obj} json object
 */
export default async function getDataCache(filename, fallback) {
  let cache = '';

  // load cache
  cache = flatCache.load(`${path.basename(filename, path.extname(filename))}.json`, cacheFolder);
  const cachedItems = cache.getKey('items');
  const isDraftMode = await isInDraftMode();

  // if we have a cache, return cached data
  if (cachedItems && !isDraftMode) {
    // TODO: Check if expired and then delete cached data if it has
    // console.log(`${path.basename(filename, path.extname(filename))} data from cache`);
    return cachedItems;
  }

  // if we don't have a cache, make queries
  const allItems = await fallback();

  // set and save cache
  cache.setKey('items', allItems);
  try {
    cache.save(true);
  } catch (e) {
    // captureException(e);
    console.log(e);
  }

  // return API data
  return allItems;
}
