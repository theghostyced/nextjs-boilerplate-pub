import {documentToPlainTextString} from '@contentful/rich-text-plain-text-renderer';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import type {Document} from '@contentful/rich-text-types';
import {TagLink} from 'contentful';

import {getTags} from '@/lib/api';
import {IPost} from '@/types/contentful';
import buildReactRoot from '@/utils/buildReactRoot';
import {richTextParse} from '@/utils/richTextParser';
import slugifyString from '@/utils/slugify';
import stripTags from '@/utils/stripTags';

/**
 *
 * @param content - The content to calculate the reading time for
 * @param stringFormat - The format of the string to return
 * @returns {string} - The reading time in the specified format
 */
export const calculateReadingTime = (postContent: Document, stringFormat = 'short') => {
  if (!postContent) return;

  const wordsPerMinute = 300;
  const plainText = documentToPlainTextString(postContent);
  const textLength = stripTags(plainText)
    .split(/\s/)
    .filter((word) => word).length;
  let readingTime = Math.ceil(textLength / wordsPerMinute);

  if (stringFormat === 'long') {
    return readingTime > 1 ? `${readingTime} minutes` : '1 minute';
  } else {
    return readingTime > 1 ? `${readingTime} min` : '1 min';
  }
};

/**
 * Get the names of the tags from their IDs
 * @param tags
 * @returns  {Promise<{name: string, id: string, slug: string}[]>} - The tag names
 */
export const getTagNames = async (tags: TagLink[]) => {
  const contentfulTags = await getTags();
  let allTags: {[key: string]: string} = {};

  // Create a map of all tags for easy access
  contentfulTags.forEach((tag: any) => {
    allTags[tag.id] = tag.name;
  });

  // Map the tag IDs to their names and return the result
  return tags
    .map((tag) => {
      const tagName = allTags[tag.sys.id];

      if (tagName) {
        return {
          name: tagName,
          id: tag.sys.id,
          slug: slugifyString(tagName),
        };
      }
    })
    .filter((tag) => tag);
};

// export const buildTOC = (postContent: Document) => {
//   const headings = postContent.content
//     .filter((node) => (node.nodeType === 'heading-2' || node.nodeType === 'heading-3'))
//     .map((node) => ({item: node, type: node.nodeType}));

//   const toc = headings.map((heading: any) => ({
//     item: documentToReactComponents(heading.item, richTextParse),
//     type: heading.type,
//   }))
//   .map((heading: any) => {
//     if (!heading.item) return;
//     const root = buildReactRoot(heading.item);
//     const headers = root.querySelectorAll('h2, h3');
//     console.log(headers)

//     if (headers) {
//       headers.forEach((header: any) => {
//         // set excludeHeader from Table of Contents variable, defaults to false
//         let excludeHeader = false;

//         console.log(header);
//         const nestedLinkEl = header.querySelector('a');
//         const headerText = nestedLinkEl ? nestedLinkEl.textContent : header.textContent;

//         // if '[hide-toc]' is in the header, don't include it in
//         // table of contents, and remove from output
//         if (headerText.includes('[toc-hide]')) {
//           header.remove();
//           excludeHeader = true;
//         }

//         if (!excludeHeader) {
//         // Remove any `<a>` text around header if it exists
//           const transformedText = headerText.replace(/<a\b[^>]*>/gm, '').replace(/<\/a>/gm, '');

//           // replace current HTML with slugified link
//           header.tagName = 'p';
//           header.innerHTML = `<a class="toc__link" href="#${slugifyString(transformedText)}">${transformedText}</a>`;
//         }
//       })
//     };
//   })

//   return toc;
// }

export const getFilterTagNames = async () => {
  const tags = await getTags();
  let allTags = {} as {[key: string]: string};

  tags.forEach((tag: any) => {
    allTags[tag.id] = tag.name;
  });

  return allTags;
};
