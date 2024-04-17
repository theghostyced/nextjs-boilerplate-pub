/**
 * System information used to configure builds
 * @namespace
 * @property {string} environment - Name of the current build environment
 */
interface NODE_ENV_OPTIONS {
  production: string;
  staging: string;
  qa: string;
  development: string;
}

const system = {
  environment: (process.env.NEXT_ENV || process.env.NEXT_PUBLIC_ENV) as keyof NODE_ENV_OPTIONS,
};

/**
 * Is this an environment that shoudl include preview content
 */
export const USE_CONTENTFUL_PREVIEW =
  system.environment == 'development' || system.environment == 'qa';

/**
 * An object that lists specific Contentful entries the site usdes by ID
 * rather than dynamically creating at build time, e.g. home page, stored
 * in the form `key: [entryId, slug, staticPath]`.
 * Any slugs listed here will be ignored by the standard logic to get
 * pages by slug.
 */
type ContentfulStaticEntriesType = {
  homepage: string[];
  siteSettings: (string | null)[];
  postListingSettings: (string | null)[];
  fourohfour: (string | null)[];
};

export const ContentfulStaticEntries: ContentfulStaticEntriesType = {
  homepage: ['77vH0ikVEZGukDc1Zgkceb', 'homepage', '/'],
  siteSettings: ['7jBygodTjLDifgbN9MRRS0', null, null],
  fourohfour: ['1dOTA7KkxR57MmxNL9Hqm1', '404', null],
  postListingSettings: ['4yEVh291qcGow3HVtC4PzH', null, null],
};
