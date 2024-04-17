import ContentfulService from './contentful';
import {Document} from '@contentful/rich-text-types';
import sortBy from 'lodash.sortby';
import 'server-only';

import {getTagNames} from '@/layouts/posts/utils';
import {
  IPage,
  IPageFields,
  IPageSimple,
  IPageSimpleFields,
  IPost,
  IPostFields,
  IPostListingSettings,
  ISettings,
  ISettingsFields,
} from '@/types/contentful';
import {ContentfulStaticEntries} from '@/utils/constants';
import slugifyString from '@/utils/slugify';
import {consoleAndReturnNull} from '@/utils/telemetry';

export const getPageEntries = async () => {
  const allPages = await ContentfulService.getEntriesByType<IPageFields>('page');

  if (!allPages) return consoleAndReturnNull('Could not fetch all page entries');

  return allPages as IPage[];
};

export const getPosts = async (
  limit?: number,
  filter?: {[key: string]: string},
  select?: string,
) => {
  const posts = await ContentfulService.getEntriesByType<IPostFields>('post', {
    select: select ? `fields.category,fields.publishedOn,fields.type,${select}` : 'fields.category,fields.publishedOn,fields.type',
    limit,
    filter,
  });
  if (!posts) return null;

  // Sorting the posts by date
  return sortBy(posts, ['fields.publishedOn']).reverse() as IPost[];
};

export const getPageSimpleEntries = async () => {
  const allPages = await ContentfulService.getEntriesByType<IPageSimpleFields>('pageSimple');

  if (!allPages) return consoleAndReturnNull('Could not fetch all page entries');

  return allPages as IPageSimple[];
};

export const getPageEntryBySlug = async (slug: string) => {
  let page = await ContentfulService.getEntryBySlug<IPageFields>('page', slug);

  if (!page) {
    consoleAndReturnNull(`Could not fetch the page entry with slug: ${slug}. Trying simple page`);
    const pageSimple = await ContentfulService.getEntryBySlug<IPageSimpleFields>(
      'pageSimple',
      slug,
    );

    if (!pageSimple) {
      return consoleAndReturnNull(`Could not fetch the page simple entry with slug: ${slug}`);
    }

    page = pageSimple;
  }

  return page as IPage | IPageSimple;
};

export const getPostEntryBySlug = async (slug: string) => {
  let post = await ContentfulService.getEntryBySlug<IPageFields>('post', slug);

  if (!post) {
    consoleAndReturnNull(`Could not fetch the post entry with slug: ${slug}.`);
  }

  return post as IPost;
};

export const getSiteSettings = async () => {
  const settingsId = ContentfulStaticEntries.siteSettings[0]!;
  const settings = await ContentfulService.getEntryById<ISettingsFields>(settingsId);

  if (!settings) return consoleAndReturnNull("Couldn't retrieve the site settings entry");
  return settings as ISettings;
};

export const getHomepageEntry = async () => {
  const homepageContentfulId = ContentfulStaticEntries.homepage[0];
  const homepageData = await ContentfulService.getEntryById(homepageContentfulId);

  if (!homepageData) return consoleAndReturnNull('Could not fetch homepage entry');
  return homepageData as IPage;
};

export const getTags = async () => {
  return await ContentfulService.getTags();
};

export const getPostListingSettings = async (type?: IPostFields['type']) => {
  const postSettingId = ContentfulStaticEntries.postListingSettings[0]!;
  const contentfulPostListingSettings =
    await ContentfulService.getEntryById<IPostListingSettings>(postSettingId);

  if (!contentfulPostListingSettings)
    return consoleAndReturnNull("Couldn't retrieve the post listing settings entry");

  let postListingSettings = {primaryNavigation: [{url: `/${type}/all`, label: 'All'}]} as {
    hero: {title: string; body: Document};
    primaryNavigation: {label: string; url: string}[];
  };
  postListingSettings.hero = {
    title: contentfulPostListingSettings.fields.heroTitle || '',
    body: contentfulPostListingSettings.fields.heroBody || '',
  };
  contentfulPostListingSettings.fields.primaryNavigationItems.forEach((item: string) =>
    postListingSettings.primaryNavigation.push({
      label: item,
      url: `/${type}/${slugifyString(item)}`,
    }),
  );

  return postListingSettings;
};

export interface IPostListingPosts extends IPost {
  tags: string[];
}
export const getPostListingPostsByType = async (type: IPostFields['type'], limit?: number) => {
  const allPostsByType = await getPosts(
    limit,
    {'fields.type': type ?? ''},
    'fields.thumbnailImage,fields.title,fields.thumbnailText,sys.contentType,fields.metadata,fields.publishedOn,metadata.tags',
  );

  if (!allPostsByType) return consoleAndReturnNull('Could not fetch all posts by type');
  let posts = {'all': []} as any;

  // Transform the array of posts into an object with the slugified category as the key
  allPostsByType.forEach(async (post) => {
    const category = slugifyString(post.fields.category || '');
    const tags = (await getTagNames(post.metadata.tags)).map((tag) =>
      slugifyString(tag?.name || ''),
    );

    if (category) {
      if (!posts[category]) {
        posts[category] = [];
      }
      posts[category].push({tags: tags, ...post});
    }

    posts['all'].push({...post, tags});
  });

  return posts;
};

export const getFourOhFourEntry = async () => {
  const fourohfourId = ContentfulStaticEntries.fourohfour[0]!;
  const fourohfour = await ContentfulService.getEntryById<IPage>(fourohfourId);

  if (!fourohfour) return consoleAndReturnNull("Couldn't retrieve the site fourohfour entry");
  return fourohfour as IPage;
};
