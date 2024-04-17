// @ts-nocheck
import {Inline} from '@contentful/rich-text-types/dist/types';
import {Entry} from 'contentful';

import {metadata} from '@/lib/metadata';
import slugify from '@/utils/slugify';

// import router from 'next/navigation';

const buildUrl = (ref: string | Entry | Inline, noBase?: boolean) => {
  if (!ref) {
    return '';
  }

  // Set the Base URL
  let url = metadata?.baseurl && !noBase ? `${metadata.baseurl}/` : '/';

  // Set slug and contentType based on ref data structure
  let data;
  let contentType;
  let slug;

  if (ref.fields?.page?.fields) {
    // A Contentful reference field
    data = ref.fields.page;
  } else if (ref.fields?.slug) {
    // A Contentful Page or Post Object
    data = ref;
  } else if (ref.data?.target?.fields) {
    // A entry link within a Contentful richText field
    data = ref.data?.target;
  }

  if (data) {
    contentType = data.sys.contentType.sys.id;
    slug = data.fields.slug;
  } else if (ref.slug) {
    // A hardcoded object (probably from inside a macro)
    contentType = ref.contentType;
    slug = ref.slug;
  }

  // If a Page in Contentful
  if (slug && (contentType === 'page' || contentType === 'pageSimple')) {
    if (slug == '404') {
      url += '404.html';
    } else if (slug != 'homepage') {
      url += `${slug}`;
    }

    return url;
  }

  // If a Post in Contentful
  if (slug && contentType === 'post') {
    let postType;
    let postCat;
    let postDate;

    if (data && data.fields) {
      postType = data.fields.type;
      postCat = data.fields.category;
      // postDate = data.fields.publishedOn // YYYY-MM-DD
      //   .split('-')
      //   .slice(0, 2)
      //   .join('/');
    } else if (ref && ref.fields) {
      postType = ref.fields.type;
      postCat = ref.fields.category;
    } else if (ref) {
      postType = ref.type;
      postCat = ref.category;
    }

    // an example of custom type url segments
    // if (postType === 'blog') {
    //   url += 'articles/';
    // } else if (postType === 'video') {
    //   url += 'videos/';
    // } else if (postType) {
    //   url += `${postType}/`;
    // }
    if (postType) {
      url += `${postType}/`;
    }

    if (postCat) {
      url += `${slugify(postCat)}/`;
    }

    // if (postDate) {
    //   url += `${postDate}/`;
    // }

    url += `${slug}`;

    return `${url}`;
  }

  // If a string in the url field instead of a Contentful contentType
  if (ref.fields?.url) {
    return ref.fields.url;
  }

  if (ref.url) {
    return ref.url;
  }

  // Page with rich text that links to the current page
  if (ref.data?.target === '[Circular]') {
    // return router.asPath;
  }

  // Printed in `yarn debug:errors` if content is missing data
  console.error(`This Link Content is missing data: ${ref.sys.id}`);

  return '';
};

export default buildUrl;
