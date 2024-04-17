// FIXME: THIS FILE MIGHT NOT LONGER BE NEEDED AND CAN BE DELETED. CHECK BACK AFTER REFACTORING.
// IF NO ISSUES WITH THE NEW IMPLEMENTATION, WE CAN DELETE THIS FILE.
import stringify from 'safe-stable-stringify';

import {ContentfulStaticEntries} from '@/utils/constants';
import buildUrl from '@/utils/buildUrl';

export const parseContentfulEntry = <IEntryType>(entry: IEntryType): IEntryType => {
  /**
   * The replacer function can be used to update the JSON objects before
   * the circular references are used. In this particular case, we use
   * it to ensure the `url` field of `link` objects are always populated
   * because the `page` may be a circular reference and thereby removed.
   *
   * We use an alternate implementation of `JSON.stringify` that better
   * handles circular references, but the `replacer` argument comes from
   * the standard spec, so see the MDN docs for `JSON.stringify` for
   * more info on how replacer works.
   *
   * @param {string} key
   * @param {string|object} value
   * @returns {JSON}
   */
  const replacer = (key: string, value: any) => {
    if (value?.sys?.contentType?.sys?.id === 'link') {
      // Ensure the URL is always filled out for any links, so if the
      // linked-to page is omitted as a circular reference, the link
      // can still be generated.
      const parsedLink = parseComponentLink(value);
      value.fields.url = parsedLink.url;
      // there is no longer a need to keep the page, as the
      // URL will always override it (and it may be removed as a
      // circular reference anyway)
      delete value.fields.page;
    }
    return value;
  };
  return JSON.parse(stringify(entry, replacer)!);
};

/**
 * Parse a component link into an object with keys `text` and `url`.
 * If the incoming URL is explicitly set, it is used. Otherwise, the URL
 * will be set to the path defined by the slug in the linked page.
 * If the passed in entry has neither a URL nor a reference to a page,
 * the `url` is left unset.
 *
 * @param {string} link
 * @returns {string}
 */
export const parseComponentLink = (link: any) => {
  const {text, page, url: externalPage} = link.fields;
  const result = {text} as {text: string; url: string};

  if (externalPage) {
    result['url'] = externalPage;
  } else if (page?.fields?.slug) {
    // Because some pages have hardcoded slugs, for example, the homepage is always `/`
    // regardless of the entry's slug, we must first check for a corresponding entry
    // and slug in `ContentfulStaticEntries` using the provided `page.sys.id`.
    // If no match is found, we can fallback to the provided `page.fields.slug`, if any.
    const staticSlugs = Object.entries(ContentfulStaticEntries).reduce((map, entry) => {
      // eslint-disable-next-line no-unused-vars
      const [name, [id, entrySlug, staticSlug]] = entry;

      // Some static entries, e.g. Site - Settings, do not have corresponding slugs.
      if (staticSlug != null) return map.set(id, staticSlug);
      return map;
    }, new Map());

    result['url'] = page?.sys?.id ? staticSlugs.get(page.sys.id) || buildUrl(link) : buildUrl(link);
  }
  return result;
};
