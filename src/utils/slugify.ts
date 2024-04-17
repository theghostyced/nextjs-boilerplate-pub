import slugify from "@sindresorhus/slugify";

// Slugs are stored outside the function so the values persist throughout the
// lifetime of the script run.
const slugs: any = {};

/**
 * Slugify a string, storing the resulting value for future lookup during the
 * same build. Increases overall performance by re-using existing slugs rather
 * than slugifying the same string multiple times.
 *
 * @param {string} string
 * @param {Function} [slugifyFn=slugify] - specify a custom slugify function (primarily used for testing)
 * @return {string}
 */
const slugifyString =  (str: string, slugifyFn = slugify) => {
  if (typeof str !== 'string') {
    // Don't attempt to slugify a non-string value
    return str;
  }

  if (!slugs[str]) {
    // If we haven't already slugified this string, do so and then store it for
    // possible future re-use.
    slugs[str] = slugifyFn(str);
  }

  return slugs[str];
};

export default slugifyString;