// @ts-check
import { IPost } from "@/types/contentful";

/**
 *
 * @param {Object} entries
 * @return {Object} - entries sorted by date, starting at most recent
 */
const sortPostByDate = <T>(entries: IPost[]): T => {
  // Sort by object values
  const arr = Object.values(entries).sort((a: IPost, b: IPost) => {
    if (!(a.fields.publishedOn && b.fields.publishedOn)) {
      return;
    }

    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.fields.publishedOn) - new Date(a.fields.publishedOn);
  });

  return arr as T;
};

export default sortPostByDate;
