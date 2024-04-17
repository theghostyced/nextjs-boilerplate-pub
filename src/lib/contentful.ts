import {createClient} from 'contentful';
import 'server-only';

import {USE_CONTENTFUL_PREVIEW} from '@/utils/constants';
import {isInDraftMode} from '@/utils/draftMode';
import getDataCache from '@/utils/getDataCache';
import {consoleAndTrack} from '@/utils/telemetry';
import ttlMemoryCache, {buildTTLMemoryKey} from '@/utils/ttl-memory-cache';

/*
 * We tell TypeScript that those environment variables are always defined.
 * https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
 */
declare global {
  // eslint-disable-next-line
  namespace NodeJS {
    // eslint-disable-next-line
    interface ProcessEnv {
      CONTENTFUL_SPACE_ID: string;
      CONTENTFUL_TOKEN: string;
      CONTENTFUL_PREVIEW_TOKEN: string;
    }
  }
}

class ContentfulService {
  static getContentfulClient(isInDraftMode: boolean) {
    const space = process.env.CONTENTFUL_SPACE_ID;
    const accessToken =
      USE_CONTENTFUL_PREVIEW || isInDraftMode
        ? process.env.CONTENTFUL_PREVIEW_TOKEN
        : process.env.CONTENTFUL_TOKEN;
    const host =
      USE_CONTENTFUL_PREVIEW || isInDraftMode
        ? process.env.CONTENTFUL_HOST_PREVIEW
        : process.env.CONTENTFUL_HOST;

    const client = createClient({
      space,
      accessToken,
      host,
    });

    return client;
  }

  static async _getEntriesByType<T>(
    type: string,
    {
      order = 'sys.createdAt',
      limit = 100,
      select = '',
      filter = {},
    }: {order?: string; limit?: number; select?: string; filter?: {[key: string]: string}} = {},
    isDraftMode: boolean = false,
  ) {
    let entries: any = [];
    let makeNewQuery = true;
    let recordsToSkip = 0;
    const recordsPerQuery = limit;

    while (makeNewQuery) {
      const parameters = {
        content_type: type,
        include: 1,
        limit: limit,
        order: order,
        skip: recordsToSkip,
        select: `sys.id,fields.slug${select.length > 0 ? `,${select}` : ''}`,
        ...filter,
      };

      await this.getContentfulClient(isDraftMode)
        .getEntries<T>({...parameters})
        .then((response) => {
          // get the response as a safe object
          const safeEntry = JSON.parse(response.stringifySafe());
          // update entries array with the data from the response
          entries = entries.concat(safeEntry.items);

          // prepare for next query
          recordsToSkip += recordsPerQuery;

          // check if we are getting back less than the records we fetch per query
          // if yes, stop querying
          if (response.items.length < recordsPerQuery) {
            makeNewQuery = false;
          }
        })
        .catch((error) => {
          console.error(type);
          console.error(error);

          makeNewQuery = false;
        });

      if (limit !== null && entries.length >= limit) {
        break;
      }
    }

    return entries;
  }

  static async getEntriesByType<T>(
    type: string,
    params: {
      order?: string;
      limit?: number;
      select?: string;
      filter?: {[key: string]: string};
    } = {},
  ) {
    const isDraftMode = await isInDraftMode();
    const ttlKey = buildTTLMemoryKey(this.getEntriesByType, {type, isDraftMode});

    return await ttlMemoryCache(ttlKey, async () => {
      if (isDraftMode) {
        return await this._getEntriesByType<T>(type, params, isDraftMode);
      }

      return await getDataCache(type, async () => {
        return await this._getEntriesByType<T>(type, params, isDraftMode);
      });
    });
  }

  static async _getEntryById<T>(id: string, isInDraftMode: boolean = false) {
    consoleAndTrack(`Getting Entry: ${id}`);
    const entry = await this.getContentfulClient(isInDraftMode).getEntry<T>(id, {
      'include': 3,
    });

    return entry.toPlainObject();
  }

  static async getEntryById<T>(id: string) {
    const isDraftMode = await isInDraftMode();
    const ttlKey = buildTTLMemoryKey(this.getEntryById, {id, isDraftMode});

    return await ttlMemoryCache(ttlKey, async () => {
      if (isDraftMode) return await this._getEntryById<T>(id, isDraftMode);

      return await getDataCache(id, async () => {
        return await this._getEntryById<T>(id, isDraftMode);
      });
    });
  }

  static async _getEntryBySlug<T>(type: string, slug: string, isInDraftMode: boolean = false) {
    const entry = await this.getContentfulClient(isInDraftMode).getEntries<T>({
      'content_type': type,
      'fields.slug': slug,
      'include': 3,
    });
    const safeEntry = JSON.parse(entry.stringifySafe());

    return safeEntry.items[0];
  }

  static async getEntryBySlug<T>(type: string, slug: string) {
    const isDraftMode = await isInDraftMode();
    const ttlKey = buildTTLMemoryKey(this.getEntriesByType, {type, slug, isDraftMode});

    return await ttlMemoryCache(ttlKey, async () => {
      if (isDraftMode) return await this._getEntryBySlug(type, slug, isDraftMode);

      return await getDataCache(slug, async () => {
        return await this._getEntryBySlug<T>(type, slug, isDraftMode);
      });
    });
  }

  static async _getTags(isInDraftMode: boolean = false) {
    const response = await this.getContentfulClient(isInDraftMode).getTags();
    const tags = response.items.map((tag) => ({id: tag.sys.id, name: tag.name}));

    return tags;
  }

  static async getTags() {
    const isDraftMode = await isInDraftMode();
    const ttlKey = buildTTLMemoryKey(this.getTags, {isDraftMode});

    return await ttlMemoryCache(ttlKey, async () => {
      if (isDraftMode) {
        return await this._getTags(isDraftMode);
      }

      return await getDataCache('tags', async () => {
        return await this._getTags(isDraftMode);
      });
    });
  }
}

export default ContentfulService;
