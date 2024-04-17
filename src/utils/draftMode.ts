import {USE_CONTENTFUL_PREVIEW} from './constants';

import {metadata} from '@/lib/metadata';
import {system} from '@/lib/system';

/**
 * This function checks if the application is in draft mode.
 * It fetches the draft mode status from an API endpoint, which is determined by the system environment.
 * If the fetch operation fails, it defaults to returning false (not in draft mode).
 *
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the application is in draft mode.
 */
export const isInDraftMode = async () => {
  return Boolean(process.env.USE_CONTENTFUL_PREVIEW || USE_CONTENTFUL_PREVIEW);
};
