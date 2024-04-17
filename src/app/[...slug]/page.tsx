import {notFound} from 'next/navigation';

import Page from '@/layouts/Page';
import PageSimple from '@/layouts/PageSimple';
import {getPageEntries, getPageEntryBySlug, getPageSimpleEntries, getSiteSettings} from '@/lib/api';
import {getPostListingPostsByType} from '@/lib/api';
import {buildMetadata} from '@/lib/metadata';
import {IPage, IPageSimple} from '@/types/contentful';

export const generateStaticParams = async () => {
  const pages = await getPageEntries();
  const simplePages = await getPageSimpleEntries();
  const allPages = pages!.concat(simplePages);

  const slugs = allPages!.map((page: IPage | IPageSimple) => {
    return {
      slug: [page.fields.slug],
    };
  });

  return slugs;
};

export default async function DynamicPage({params}: {params: {slug: string}}) {
  const posts = await getPostListingPostsByType();
  const page = await getPageEntryBySlug(params.slug[0]);
  const settings = await getSiteSettings();

  if (!page) return notFound();

  if (!page || !settings) return;
  const pageType = page.sys.contentType.sys.id;
  const isPageSimple = pageType === 'pageSimple';

  if (isPageSimple) {
    return <PageSimple page={page as IPageSimple} settings={settings} />;
  } else {
    return <Page page={page as IPage} settings={settings} posts={posts} />;
  }
}

type Props = {
  params: {slug: string[]};
};

export async function generateMetadata({params}: Props) {
  const settings = await getSiteSettings();
  const pageData = await getPageEntryBySlug(params.slug[0]);
  return await buildMetadata({siteSettings: settings!, pageData: pageData!});
}
